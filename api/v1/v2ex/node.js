const rp = require('request-promise');
const cheerio = require('cheerio');
const url = require('url');
const moment = require('moment');
const { params } = require('app-libs');

module.exports = (req, res) => {
    const { name } = req.params;
    const { p = 1 } = req.query;

    const cookie = `A2=${req.cookies.A2 || ''}`;
    rp.get({
        uri: `https://www.v2ex.com/go/${name}?p=${p}`,
        headers: {
            'User-Agent': params.ua.pc,
            Cookie: cookie,
        },
    })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const data = {
                total: 1,
                node: {
                    count: +$('.node_info > .fr.f12 > strong').text(),
                    name: $('head > title')
                        .text()
                        .split('›')[1]
                        .trim(),
                },
                list: [],
            };

            $('#TopicsNode > .cell').each(function() {
                const $elem = $(this);

                $elem.find('table').each(function() {
                    const $table = $(this);

                    const id = url.parse(
                        $table
                            .find('.item_title > a')
                            .attr('href')
                            .replace(/^\/t\//, '')
                    ).path;

                    const chatData = {
                        id,
                        avatar: process.env.IMAGE_PROXY + encodeURIComponent($table.find('.avatar').attr('src')),
                        title: $table.find('.item_title > a').text(),
                        reply: $table.find('.count_livid').text() || 0,
                        time: (
                            $table
                                .find('.topic_info')
                                .text()
                                .split('•')[1] || ''
                        ).trim(),
                    };

                    data.list.push(chatData);
                });
            });

            const $pageInput = $('.page_input');

            if ($pageInput.length > 0) {
                data.total = +$pageInput.attr('max');
            }

            if (!data.node.count) {
              throw new Error('need login');
            } else {
              res.json({
                  success: true,
                  data,
              });
            }
        })
        .catch(async (err) => {
            try {
              moment.locale('zh-cn');
              const list = await rp.get({
                uri: `https://www.v2ex.com/api/topics/show.json?node_name=${name}`,
                json: true,
              });

              const data = {
                  total: list.length,
                  node: {
                      count: list[0].node.topics,
                      name: list[0].node.title,
                  },
                  list: list.map((item) => {
                    return {
                      id: item.id,
                      title: item.title,
                      avatar: process.env.IMAGE_PROXY + encodeURIComponent(item.member.avatar_normal),
                      reply: `${item.replies}`,
                      time: moment(item.created * 1000).fromNow(),
                    };
                  }),
              };

              res.json({
                  success: true,
                  data,
              });
            } catch(err) {
              res.json({
                  success: false,
                  msg: `v2ex ${name} node 获取失败`,
              });
            }
        });
};
