const { Readability } = require('@mozilla/readability');
const JSDOM = require('jsdom').JSDOM;
const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { url } = req.query;
    const response = await http.get({
        uri: url,
    });

    const doc = new JSDOM(response, {
      url
    });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    res.render('archive', {
        title: article.title,
        content: article.content,
    });
};
