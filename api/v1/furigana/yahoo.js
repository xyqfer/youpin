const { http } = require('app-libs');
const cheerio = require('cheerio');
const fs = require('fs');
const jisx0208 = fs.readFileSync('./jis-x-0208-utf8.txt');

module.exports = async (content = '') => {
    let jisxStr = '';
    for (let i = 0; i < content.length; i++) {
        const str = content[i];
        if (jisx0208.includes(str)) {
            jisxStr += str;
        }
    }

    const data = await http.post({
        uri: 'https://jlp.yahooapis.jp/FuriganaService/V1/furigana',
        headers: {
            'User-Agent': `Yahoo AppID:  ${process.env.YAHOO_APP_ID}`,
        },
        form: {
            sentence: jisxStr,
            grade: 1,
        },
    });

    const $ = cheerio.load(data, {
        xmlMode: true,
    });
    const result = [];
    $('Word').each(function() {
        const $item = $(this);
        const text = $item.find('Surface').text();
        const furigana = $item.find('Furigana').text();

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
