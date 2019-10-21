const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { url } = req.query;
    const { data } = await http.get({
        uri: `https://outlineapi.com/article?source_url=${encodeURIComponent(url)}`,
        headers: {
            Referer: 'https://outline.com/',
        },
        json: true,
    });

    res.render('archive', {
        title: data.title,
        content: data.html,
    });
};
