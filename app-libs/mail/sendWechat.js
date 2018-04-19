'use strict';

module.exports = async ({ title = '', content = '' }) => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');

    const scToken = process.env.scToken;
    let markdownContent = '';

    const cheerioId = 'J-cheerio-wrap';
    const emojiReg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
    const $ = cheerio.load(`<div id='${cheerioId}'>${content}</div>`);

    $(`#${cheerioId}`).children().each(function () {
        const $elem = $(this);

        const url = $elem.find('a').attr('href');
        const title = $elem.find('a').text().replace(emojiReg, '');

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