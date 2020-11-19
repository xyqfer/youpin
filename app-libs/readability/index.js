const { Readability } = require('@mozilla/readability');
const JSDOM = require('jsdom').JSDOM;
const cheerio = require('cheerio');
const http = require('../http');

module.exports = async (url) => {
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

    $('.page').each(function() {
        $(this).removeAttr('class');
    });

    $('a').each(function() {
        $(this).addClass('external').attr('target', '_blank');
    });

    article.content = $('body').html();
    return article;
};
