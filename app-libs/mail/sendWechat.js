'use strict';

module.exports = async ({ title = '', content = '' }) => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');

    const scToken = process.env.scToken;
    let markdownContent = '';

    const cheerioId = 'J-cheerio-wrap';
    const $ = cheerio.load(`<div id='${cheerioId}'>${content}</div>`);
    $(`#${cheerioId}`).children().each(function () {
        const $elem = $(this);

        const url = $elem.find('a').attr('href');
        const title = $elem.find('a').text();

        markdownContent += `- [${title}](${url})
`;

        const $img = $elem.find('img');

        if ($img.length > 0) {
            const imgUrl = $img.attr('src');
            markdownContent += `![](${imgUrl})
`;
        }
    });

    try {
        const result = await rp.post({
            uri: `https://sc.ftqq.com/${scToken}.send`,
            form: {
                text: title,
                desp: markdownContent
            }
        });
        console.log(result);

        return {
            success: true
        };
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};