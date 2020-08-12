const cheerio = require('cheerio');
const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { slug } = req.query;

    const response = await http.get({
        uri: `https://theinitium.com/article/${slug}`,
        headers: {
            'user-agent': 'Mozilla / 5.0(Linux; Android 6.0.1; Nexus 5X Build / MMB29P) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 80.0.3987.92 Mobile Safari / 537.36(compatible; Googlebot / 2.1; +http://www.google.com/bot.html)',
            'accept-language': 'zh-hans;q=0.9',
        },
    });

    const $ = cheerio.load(response);
    $('.p-article img').each(function() {
        const $elem = $(this);
        const src = $elem.attr('src');

        if (!src.startsWith('data:')) {
            $elem.attr('src', process.env.IMAGE_PROXY + encodeURIComponent(src));
        }
    });

    $('.p-article .p-article__side-left').remove();
    $('.p-article .c-wall').remove();
    $('.p-article .p-article__side-right').remove();
    $('.p-article .c-tag-list').remove();
    $('.p-article figure.image').css('margin', '0');

    res.render('archive', {
        title: '',
        content: $('.p-article').html(),
    });
};
