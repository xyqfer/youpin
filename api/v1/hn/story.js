const moment = require('moment');
const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { page = 1 } = req.query;

    try {
        const resp = await http.get({
          uri: `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`,
          json: true
        });
        const list = resp.hits.map((item) => {
          let link = item.url;
          if (!link) link = `https://news.ycombinator.com/item?id=${item.objectID}`;
          const site = (new URL(link)).host;

          return {
            id: item.objectID,
            link,
            site,
            title: item.title,
            author: item.author,
            time: moment(item.created_at).fromNow(),
            comments: item.points,
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
            msg: `hn story ${page} 获取失败`,
        });
    }
};
