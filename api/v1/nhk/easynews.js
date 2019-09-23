'use strict';
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    const { offset = 0, limit = 20, } = req.query;
    const { getDbData } = require('app-libs/db');
    const dbName = 'NHKEasyNews';

    try {
        let data = await getDbData({
            dbName,
            limit,
            query: {
                skip: [offset],
            },
        });

        data = data.map((item) => {
            const $ = cheerio.load(item.content);
            const words = $('ruby').map(function() {
                const $elem = $(this);
                const furigana = $elem.find('rt').text().trim();
                const text = $elem.text().replace(/\s*/g, '');
                const kanji = text.slice(0, text.indexOf(furigana));

                return {
                    kanji,
                    furigana,
                };
            }).get();

            item.words = words;
            item.cover = process.env.IMAGE_PROXY + item.cover;
            return item;
        });

        res.json(data);
    } catch (err) {
        console.error(err);
        res.json([]);
    }
};