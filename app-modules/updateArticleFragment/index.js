'use strict';

module.exports = async () => {
    const { mail: sendMail, http, db } = require('app-libs');
    const cheerio = require('cheerio');

    try {
        const url = 'https://www.nytimes.com/2018/12/26/theater/hamilton-puerto-rico-lin-manuel-miranda.html';
        const day = 6;
        const dbName = 'ArticleFragment';
        const [articleInfo] = await db.getDbData({
            dbName,
            limit: 1,
            query: {
                equalTo: ['url', url],
            },
        });

        if (articleInfo && articleInfo.count < day) {
            const htmlString = await http.get({
                uri: url,
            });
            const $ = cheerio.load(htmlString);
            const $content = $('.StoryBodyCompanionColumn p');
            const length = $content.length;
            const perDay = Math.ceil(length / day);
            const { count, objectId } = articleInfo;
            const content =
                $content
                    .slice(count * perDay, (count + 1) * perDay)
                    .map((index, elem) => $(elem).text())
                    .get()
                    .reduce((content, item) => {
                        const words = item.split(' ').reduce((words, word) => {
                            words += `<div class="word J-word" data-word="${word}">${word}<span class="J-translate translate"></span></div>&nbsp;`;
                            return words;
                        }, '');
                        content += `<div class="p">${words}</div>`;
                        return content;
                    }, '') + `<div>${count + 1} / ${day}</div>`;
            const title = $('title').text();

            await sendMail({
                title: '要刷进度啦',
                render: 'archive2',
                device: 'device2',
                data: [
                    {
                        url,
                        title,
                        content,
                    },
                ],
                template: ({ url = '', title = '', content = '' }) => `
            <div style="margin-bottom: 50px">
                <a href="${url}" target="_blank">
                    <h4>${title}</h4>
                </a>
                ${content}
            </div>
        `,
            });

            db.updateDbData({
                dbName,
                id: objectId,
                data: {
                    url,
                    count: count + 1,
                },
            });
        }

        return {
            success: true,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
