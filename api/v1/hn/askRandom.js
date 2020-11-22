const { crawler } = require('app-libs');

module.exports = async (req, res) => {
    const startYear = 2011;
    const currentYear = (new Date()).getFullYear();

    try {
        const year = startYear + Math[`${Math.random() > 0.5 ? 'ceil' : 'floor'}`]((currentYear - startYear) * Math.random());
        let $ = await crawler(`https://www.daemonology.net/hn-weekly-ask/${year}.html`);

        const $weekAsk = $('.content a');
        const weekIndex = Math.floor($weekAsk.length * Math.random());
        const link = 'https://www.daemonology.net/hn-weekly-ask/' + $weekAsk.eq(weekIndex).attr('href');

        $ = await crawler(link);
        const list = $('.storylink').map(function() {
          const $link = $(this).find('a');
          const link = $link.attr('href');
          if (!link) return null;

          const u = new URL(link);

          return {
            id: u.searchParams.get('id'),
            link,
            site: 'news.ycombinator.com',
            title: $link.text().trim(),
          };
        }).get().filter((item) => !!item);

        res.json({
            success: true,
            data: {
                list,
                hasNext: true,
            },
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            msg: 'hn ask random 获取失败',
        });
    }
};
