const { Readability } = require('@mozilla/readability');
const JSDOM = require('jsdom').JSDOM;
const cheerio = require('cheerio');
const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { url } = req.query;
    const response = await http.get({
        uri: url,
    });

    const doc = new JSDOM(response, {
      url
    });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    const $ = cheerio.load(article.content);
    $('img').each(function() {
        const $elem = $(this);
        const src = $elem.attr('src');

        if (src && !src.startsWith('data:')) {
            $elem.attr('src', process.env.IMAGE_PROXY + encodeURIComponent(src));
        }

        $elem.removeAttr('srcset');
        $elem.removeAttr('width');
        $elem.removeAttr('height');
        $elem.removeAttr('sizes');
    });

    res.render('archive', {
        title: article.title,
        content: $('body').html(),
    });
};
