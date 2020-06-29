const url = require('url');
const rp = require('request-promise').defaults({
    jar: true,
});
const cheerio = require('cheerio');
const { params } = require('app-libs');

module.exports = async (req, res) => {
    const { q = '', p = 1 } = req.query;
    const headers = {
        'User-Agent': params.ua.pc,
    };

    try {
        await rp.get({
            uri: 'https://www.dogedoge.com',
            headers,
        });
    
        const htmlString = await rp.get({
            uri: `https://www.dogedoge.com/results?q=site%3Av2ex.com+${encodeURIComponent(q)}&p=${p}`,
            headers,
        });
    
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
                url: url.parse($elem.find('.result__url__domain').text().trim()).path,
                desc: $elem
                    .find('.result__snippet')
                    .text()
                    .trim(),
            };
    
            if (post.url) {
                data.push(post);
            }
        });
    
        res.json({
            success: true,
            data,
        });
    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            msg: `v2ex ${q} search 失败`,
        });
    }
};
