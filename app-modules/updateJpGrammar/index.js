const _ = require('lodash');
const { db, crawler } = require('app-libs');

module.exports = async () => {
    const levelList = _.times(5, (time) => time + 1);
    const list = await Promise.mapSeries(levelList, async (level) => {
        let page = 1;
        const result = [];

        let $ = await crawler(`https://grammar.izaodao.com/grammar.php?action=list&op=ajaxMoreList&level=${level}&cat=&cha=&page=${page}`);
        /* eslint-disable no-await-in-loop */
        while ($('.list').length > 0) {
            $('.list').each(function() {
                const $elem = $(this);
                const grammar = $elem.find('a').text();
                const mean = $elem.find('.list_mean').text();
                const id = $elem.attr('onclick').match(/&id=(\d+?)&/)[1];

                result.push({
                    id,
                    grammar,
                    mean,
                });
            });

            page++;
            $ = await crawler(`https://grammar.izaodao.com/grammar.php?action=list&op=ajaxMoreList&level=${level}&cat=&cha=&page=${page}`);
        }

        return {
            level,
            data: result,
        };
    });

    await Promise.mapSeries(
        list,
        async ({ level, data }) =>
            await db.saveData({
                dbName: `JP_Grammar_${level}`,
                data,
            })
    );

    return {
        success: true,
    };
};
