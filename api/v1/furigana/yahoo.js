const {
    http,
} = require('app-libs');
const cheerio = require('cheerio');

module.exports = async (content = '') => {
    const data = await http.post({
        uri: 'https://jlp.yahooapis.jp/FuriganaService/V1/furigana',
        headers: {
            'User-Agent': `Yahoo AppID:  ${process.env.YAHOO_APP_ID}`,
        },
        form: {
            sentence: content,
            grade: 1,
        },
    });

    const $ = cheerio.load(data, {
        xmlMode: true,
    });
    const result = $('Word').map(function() {
        const $item = $(this);

        return {
            text: $item.find('Surface').text(),
            furigana: $item.find('Furigana').text(),
        };
    }).get();

    return result;
};