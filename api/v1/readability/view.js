const { readability, http } = require('app-libs');

module.exports = async (req, res) => {
    const { url, imgProxy = '1' } = req.query;
    const { title, content } = await readability(url, imgProxy);
    // const { title, content } = await http.get({
    //   uri: process.env.READER_VIEW_URL2 + encodeURIComponent(url),
    //   json: true,
    // });

    res.render('archive', {
        title,
        content,
    });
};
