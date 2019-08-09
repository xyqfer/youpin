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
    let result = [];
    $('Word').each(function() {
        const $item = $(this);
        let text = $item.find('Surface').text();
        let furigana = $item.find('Furigana').text();

        if ($item.find('SubWordList').length > 0) {
            $item.find('SubWordList > SubWord').each(function() {
                const $item = $(this);
                result.push({
                    text: $item.find('Surface').text(),
                    furigana: $item.find('Furigana').text(),
                });
            });
        } else {
            result.push({
                text,
                furigana,
            });
        }
    });

    return result;
};