const rp = require('request-promise');
const cheerio = require('cheerio');
const { params } = require('app-libs');

module.exports = (req, res) => {
    const { q = '', p = 1 } = req.query;

    rp.get({
        uri: `https://www.dogedoge.com/results?q=site%3Av2ex.com+${encodeURIComponent(q)}&p=${p}`,
        headers: {
            'User-Agent': params.ua.pc,
        },
    })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const data = [];

            $('#links > .result').each(function() {
                const $elem = $(this);
                const $link = $elem.find('a.result__a');

                const post = {
                    title: $link
                        .text()
                        .replace(/ - V2EX$/, '')
                        .trim(),
                    url: $elem.find('.result__url__domain').text().trim().replace(/^https:\/\/www\.v2ex\.com/, ''),
                    desc: $elem
                        .find('.result__snippet')
                        .text()
                        .trim(),
                };
                data.push(post);
            });

            res.json({
                success: true,
                data,
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: `v2ex ${q} search 失败`,
            });
        });
};
