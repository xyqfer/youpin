const rp = require('request-promise');
const cheerio = require('cheerio');
const { params } = require('app-libs');
const convertContent = require('./utils/convertContent');

module.exports = (req, res) => {
    const { id } = req.params;
    const { p = 1 } = req.query;

    const cookie = `A2=${req.cookies.A2 || ''}`;
    rp.get({
        json: true,
        uri: `https://www.v2ex.com/t/${id}?p=${p}`,
        headers: {
            'User-Agent': params.ua.pc,
            Cookie: cookie,
        },
    })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const data = {
                topic: {},
                reply: [],
                total: 1,
            };

            const $container = $('#Main > .box');
            const $header = $container.eq(0);
            const $body = $container.eq(1);

            data.topic = {
                title: $header.find('.header > h1').text(),
                author: $header.find('.gray > a').text(),
                avatar: process.env.IMAGE_PROXY + encodeURIComponent($header.find('.avatar').attr('src')),
                createTime: $header
                    .find('.gray')
                    .text()
                    .split('·')[1]
                    .trim(),
                click: $header
                    .find('.gray')
                    .text()
                    .split('·')[2]
                    .trim(),
                node: {
                    name: $header
                        .find('.header > a')
                        .eq(1)
                        .text(),
                    url: $header
                        .find('.header > a')
                        .eq(1)
                        .attr('href'),
                },
                count: $body
                    .find('.cell')
                    .eq(0)
                    .find('.gray')
                    .text()
                    .split('|')[0]
                    .trim(),
                content: convertContent($header.find('.topic_content').html() || '').content,
                tag: [],
            };

            const $additions = $header.find('.subtle');

            if ($additions.length > 0) {
                data.topic.additions = [];

                $additions.each(function() {
                    const $addition = $(this);

                    const addition = {
                        content: convertContent($addition.find('.topic_content').html()).content,
                        title: $addition
                            .find('.fade')
                            .text()
                            .split('·')[0]
                            .trim(),
                    };

                    data.topic.additions.push(addition);
                });
            }

            let left = [];
            let right = [];
            $body.find('.cell').each(function() {
                const $item = $(this);
                const { at, content } = convertContent($item.find('.reply_content').html());

                if ($item.attr('id')) {
                    const replyItem = {
                        at,
                        content,
                        avatar: process.env.IMAGE_PROXY + encodeURIComponent($item.find('.avatar').attr('src')),
                        author: $item.find('.dark').text(),
                        floor: $item.find('.no').text(),
                    };

                    const $thankItem = $item.find('.small.fade');
                    if ($thankItem.length > 0) {
                        replyItem.thank = '❤️' + $thankItem.text().trim();
                        left.push(replyItem);
                    } else {
                      right.push(replyItem);
                    }
                }
            });
            left.sort((a, b) => {
              return parseInt(b.thank.replace('❤️', '')) - parseInt(a.thank.replace('❤️', ''));
            });
            data.reply = left.concat(right);

            const $pageInput = $('.page_input');

            if ($pageInput.length > 0) {
                data.total = +$pageInput.attr('max');
            }

            const $tag = $('.tag');
            if ($tag.length > 0) {
                $tag.each(function() {
                    const $item = $(this);

                    data.topic.tag.push({
                        url: $item.attr('href'),
                        name: $item.text().trim(),
                    });
                });
            }

            res.json({
                success: true,
                data,
            });
        })
        .catch(async (err) => {
            try {
              const data = {
                  topic: {},
                  reply: [],
                  total: 1,
              };
              const [ info ] = await rp.get({
                uri: `https://www.v2ex.com/api/topics/show.json?id=${id}`,
                json: true,
              });

              data.topic = {
                  title: info.title,
                  author: info.member.username,
                  avatar: process.env.IMAGE_PROXY + encodeURIComponent(info.member.avatar_normal),
                  createTime: '',
                  click: '',
                  node: {
                      name: info.node.title,
                      url: `/go/${info.node.name}`,
                  },
                  count: `${info.replies} 条回复  •  ${(new Date(info.created * 1000)).toUTCString()}`,
                  content: info.content_rendered,
                  tag: [],
              };

              const replyList = await rp.get({
                uri: `https://www.v2ex.com/api/replies/show.json?topic_id=${id}&page=${p}&page_size=100`,
                json: true,
              });

              replyList.forEach((item, index) => {
                const { at, content } = convertContent(item.content_rendered);
                const replyItem = {
                    at,
                    content,
                    avatar: process.env.IMAGE_PROXY + encodeURIComponent(item.member.avatar_normal),
                    author: item.member.username,
                    floor: `${index + 1}`,
                };

                data.reply.push(replyItem);
              });

              res.json({
                  success: true,
                  data,
              });
            } catch(err) {
              res.json({
                  success: false,
                  msg: `v2ex ${id} t 获取失败`,
              });
            }
        });
};
