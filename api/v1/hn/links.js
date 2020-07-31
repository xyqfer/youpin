const cheerio = require('cheerio');
const { http } = require('app-libs');

const getChild = (data, res) => {
    if (!data.children || data.children.length === 0) return;

    data.children.forEach((item) => {
        if (item.text) {
            const $ = cheerio.load(item.text);
            $('a').each(function() {
                const $link = $(this);

                res.push({
                    title: $link.text(),
                    url: $link.attr('href'),
                });
            });
        }

        getChild(item, res);
    });
};

module.exports = async (req, res) => {
    const { id } = req.query;

    try {
        let links = [];
        const itemInfo = await http.get({
            uri: `https://hn.algolia.com/api/v1/items/${id}`,
            json: true,
        });

        if (itemInfo.url) {
            links.push({
                title: itemInfo.title,
                url: itemInfo.url,
            });
        }

        getChild(itemInfo, links);

        res.json({
            success: true,
            data: {
                title: itemInfo.title,
                links,
            },
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            msg: `hn links ${id} 获取失败`,
        });
    }
};
