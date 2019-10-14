'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const { params, http } = require('app-libs');

    try {
        const htmlString = await http.get({
            uri: 'https://www.facebook.com/pg/dcard.tw/posts/',
            headers: {
                'User-Agent': params.ua.pc,
            },
        });
        const $ = cheerio.load(htmlString);
        return $('#pagelet_timeline_main_column').html();
    } catch (err) {
        console.error(err);
        return null;
    }
};
