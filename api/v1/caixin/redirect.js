const cheerio = require('cheerio');
const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { url } = req.query;

    const response = await http.get({
        uri: url,
    });

    const $ = cheerio.load(response);
    const link = $('.openInApp').attr('href');
    const id = (new URL(link)).searchParams.get('id');
    
    res.redirct(`api/v1/caixin/article?id=${id}`);
};
