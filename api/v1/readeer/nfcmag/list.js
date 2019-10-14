'use strict';

module.exports = async (req, res) => {
    const { page = 1 } = req.query;
    const { params, http } = require('app-libs');
    const cheerio = require('cheerio');
    let data = [];
    let success = true;

    try {
        const htmlString = await http.get({
            uri: `https://www.nfcmag.com/magazine/page/${page}.html`,
            headers: {
                'User-Agent': params.ua.pc,
            },
        });
        const $ = cheerio.load(htmlString);
        data = $('.magazine-items')
            .map(function() {
                const $elem = $(this);
                const $link = $elem.find('h6 > a');
                const title = $link.attr('title');
                const url = 'https://www.nfcmag.com' + $link.attr('href');
                const cover = $elem
                    .find('.cover img')
                    .attr('src')
                    .replace('w_150', 'w_300');
                return {
                    title,
                    url,
                    cover,
                };
            })
            .get();
    } catch (err) {
        console.error(err);
        data = [];
        success = false;
    }

    res.json({
        success,
        data,
    });
};
