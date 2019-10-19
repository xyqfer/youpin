const { http } = require('app-libs');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    const { content } = req.body;

    const data = await http.post({
        uri: 'https://jlp.yahooapis.jp/MAService/V1/parse',
        headers: {
            'User-Agent': `Yahoo AppID:  ${process.env.YAHOO_APP_ID}`,
        },
        form: {
            sentence: content,
        },
    });

    const $ = cheerio.load(data, {
        xmlMode: true,
    });
    const result = [];
    $('ma_result word_list word').each(function() {
        const $item = $(this);
        const text = $item.find('surface').text();
        const pos = $item.find('pos').text();

        result.push({
            text,
            pos,
        });
    });

    res.json({
        success: true,
        data: {
            list: result,
        },
    });
};
