const { crawler } = require('app-libs');

module.exports = async (req, res) => {
    const $ = await crawler('https://wewe.t9t.io/groups');
    const groups = $('.column')
        .map(function() {
            const $elem = $(this);

            const logo = $elem.find('.image img').attr('src');
            const $link = $elem.find('.content > a');
            const name = $link.text();
            const id = $link.attr('href').match(/^\/chat\/(.+)/)[1];
            const desc = $elem.find('.content > p').text();
            const comment = $elem
                .find('.chatcard-info-a')
                .eq(0)
                .text();
            const user = $elem
                .find('.chatcard-info-a')
                .eq(2)
                .text();

            return {
                logo,
                name,
                id,
                desc,
                comment,
                user,
            };
        })
        .get();

    res.json({
        success: true,
        data: {
            groups,
        },
    });
};
