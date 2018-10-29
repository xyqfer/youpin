'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const {
        params
    } = require('app-libs');

    const result = await rp.get({
        json: true,
        uri: 'https://api.zhihu.com/pins/hot_list?reverse_order=0',
        headers: {
            'User-Agent': params.ua.pc,
        }
    });

    return result.data.map(({ target }) => {
        const author = target.author.name;
        const title = `${author}：${target.excerpt_title}`;
        const url = `https://www.zhihu.com/pin/${target.id}`;
        const summary = target.content.reduce((description, item) => {
            switch (item.type) {
                case 'text':
                    description += `<div>${item.content}</div>`;
                    break;

                case 'image':
                    description += `<img referrerpolicy="no-referrer" src="${item.url.replace(/_.+\.jpg/g, '.jpg')}" />`;
                    break;

                case 'video':
                    description += `<video
                    controls="controls"
                    width="${item.playlist.hd.width}"
                    height="${item.playlist.hd.height}"
                    poster="${item.cover_info.thumbnail}"
                    src="${item.playlist.hd.play_url}"
                  >`;
                    break;

                case 'link':
                    description += `<div><a href="${item.url}">${item.title}</a><br><img referrerpolicy="no-referrer" src="${item.image_url}" /></div>`;
                    break;

                default:
                    description += '未知类型';
            }

            return description;
        }, `<a href="https://www.zhihu.com${target.author.url}">${author}</a>：`);

        return {
            url,
            title,
            summary,
        }
    });
};