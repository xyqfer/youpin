'use strict';
const cheerio = require('cheerio');
const { db, http, params, } = require('app-libs');

module.exports = async (req, res) => {
    const { id, } = req.params;
    const dbName = 'NHKEasyNews';

    try {
        const [ data ] = await db.getDbData({
            dbName,
            limit: 1,
            query: {
                equalTo: ['objectId', id],
            },
        });

        const $ = cheerio.load(data.content);
        const wordList = $('ruby').map(function() {
            const $elem = $(this);
            const furigana = $elem.find('rt').text().trim();
            const text = $elem.text().replace(/\s*/g, '');
            const kanji = text.slice(0, text.indexOf(furigana));

            return {
                text: kanji,
                furigana,
            };
        }).get();

        $('.dicWin').each(function() {
            $(this).removeAttr('href');
        });
        
        const htmlContentList = $('p')
            .map(function() {
                const html = $(this).html();

                if (html !== '') {
                    return html;
                }
            })
            .get()
            .filter((item) => {
                return !!item;
            });

        const dicData = await http.get({
            uri: data.easyUrl.replace('.html', '.out.dic'),
            headers: {
                'User-Agent': params.ua.pc,
            },
            json: true,
        });
        const dicList = Object.entries(dicData.reikai.entries).map(([ key, item ]) => {
            const { hyouki } = item[0];
            const furigana = $(`#id-${key}`).find('rt').eq(0).text().trim();
            const htmlTitle = `<ruby>${hyouki}<rt>${furigana}</rt></ruby>`;
            
            const defList = item.map(({ def }) => {
                return def;
            });
            
            return {
                htmlTitle,
                defList,
            };
        });

        res.json({
            success: true,
            data: {
                htmlContentList,
                wordList,
                dicList,
            },
        });
    } catch (err) {
        console.error(err);
        res.json({});
    }
};