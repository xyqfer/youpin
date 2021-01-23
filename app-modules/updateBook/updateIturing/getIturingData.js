const flatten = require('lodash/flatten');
const { http } = require('app-libs');

module.exports = async ({ offsets = [1] }) => {
    try {
        const results = await Promise.mapSeries(offsets, async (page) => {
            try {
                const res = await http.get({
                    json: true,
                    uri: `https://api.ituring.com.cn/api/Book?sort=new&page=${page}&tab=book`,
                });

                return res.bookItems.map((item) => {
                  return {
                    title: item.name,
                    url: `${process.env.FUNC_URL}/ituring-book?id=${item.id}`,
                    cover: `https://file.ituring.com.cn/LargeCover/${item.coverKey}`,
                    desc: item.abstract
                  };
                });
            } catch (err) {
                console.error(err);
                return [];
            }
        });

        return flatten(results);
    } catch (err) {
        console.error(err);
        return [];
    }
};
