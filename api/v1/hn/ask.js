const moment = require('moment');
const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { page = 1 } = req.query;

    try {
        const resp = await http.get({
          uri: `https://hn.algolia.com/api/v1/search_by_date?tags=ask_hn&page=${page}`,
          json: true
        });
        const list = resp.hits.map((item) => {
          return {
            id: item.objectID,
            link: `https://news.ycombinator.com/item?id=${item.objectID}`,
            site: 'news.ycombinator.com',
            title: item.title,
            author: item.author,
            time: moment(item.created_at).fromNow(),
          };
        });

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
            msg: `hn ask ${page} 获取失败`,
        });
    }
};
