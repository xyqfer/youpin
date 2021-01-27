const cheerio = require('cheerio');
const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { id } = req.query;

    const response = await http.get({
        uri: `https://mappsv5.caixin.com/articlev5/${id.slice(-4)}/${id}.html?noImg=0&fontsize=1`,
    });

    const $ = cheerio.load(response);
    $('script').remove();
    $('.cx-app-content-main img').each(function() {
        $(this).attr('referrerpolicy', 'no-referrer');
    });

    res.render('caixin', {
        title: '',
        content: $('.cx-app-content-main').html(),
    });
};
