'use strict';

module.exports = async () => {
    const { params, http } = require('app-libs');
    const cheerio = require('cheerio');

    try {
        const htmlString = await http.get({
            uri: 'http://duzhihu.cc/yesterday',
            headers: {
                'User-Agent': params.ua.pc,
            },
        });
        const $ = cheerio.load(htmlString);

        return $('.answer_item')
            .map((index, item) => {
                item = $(item);
                const title = item.find('h3 > a').text();
                const url = item.find('#answer_content > a').attr('href');
                const summary = item.find('#answer_content > a').text();

                return {
                    url,
                    title,
                    summary,
                };
            })
            .get();
    } catch (err) {
        console.error(err);
        return [];
    }
};
