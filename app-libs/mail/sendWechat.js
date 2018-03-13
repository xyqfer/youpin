'use strict';

module.exports = async ({ title = '', content = '' }) => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');

    const scToken = process.env.scToken;
    let markdownContent = '';

    const $ = cheerio.load(content);
    $('a').each(function () {
        const url = $(this).attr('href');
        const title = $(this).text();

        markdownContent += `- [${title}](${url})
`;
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