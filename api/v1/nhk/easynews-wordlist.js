const cheerio = require('cheerio');
const { db } = require('app-libs');
const generateWordList = (content) => {
    const $ = cheerio.load(content);
    return $('ruby')
        .map(function() {
            const $elem = $(this);
            const furigana = $elem
                .find('rt')
                .text()
                .trim();
            const text = $elem.text().replace(/\s*/g, '');
            const kanji = text.slice(0, text.indexOf(furigana));

            return {
                text: kanji,
                furigana,
            };
        })
        .get();
};

module.exports = async (req, res) => {
    const { limit = 2 } = req.query;
    const dbName = 'NHKEasyNews';
    const dbCount = await db.getCount({ dbName });
    let i = 0;
    const result = [];

    /* eslint-disable no-await-in-loop */
    while (i < limit) {
        const skip = Math.floor(Math.random() * dbCount);
        const [item] = await db.getData({
            dbName,
            limit: 1,
            query: {
                skip: [skip],
                select: ['content'],
            },
        });
        const wordList = generateWordList(item.content);
        result.push({
            id: item.objectId,
            list: wordList,
        });
        i++;
    }

    res.json({
        success: true,
        data: {
            wordList: result,
        },
    });
};
