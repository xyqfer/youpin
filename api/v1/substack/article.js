const { crawler } = require('app-libs');

module.exports = async (req, res) => {
    const { url } = req.query;
    const $ = await crawler(url);

    $('.post img').each(function() {
        const $elem = $(this);
        const src = $elem.attr('src');

        if (!src.startsWith('data:')) {
            $elem.attr('src', process.env.IMAGE_PROXY + encodeURIComponent(src));
        }

        $elem.css('width', '100%');
    });

    $('.post table.post-meta').remove();

    res.render('archive', {
        title: '',
        content: $('.post').html(),
    });
};
