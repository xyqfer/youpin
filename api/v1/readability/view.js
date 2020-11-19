const { readability } = require('app-libs');

module.exports = async (req, res) => {
    const { url } = req.query;
    const { title, content } = await readability(url);

    res.render('archive', {
        title,
        content,
    });
};
