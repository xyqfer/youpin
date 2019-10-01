'use strict';

const Promise = require('bluebird');
const cheerio = require('cheerio');
const getData = require('./getData');
const { db, http, params, } = require('app-libs');

module.exports = async () => {
  const dbName = 'NHKWebNews';

  try {
    const filterKey = 'link';
    let [dbData, newsData] = await Promise.all([
      db.getDbData({
        dbName,
        select: [filterKey]
      }),
      getData(),
    ]);
    
    let newData = newsData.filter(({ link }) => {
        return !dbData.includes(link);
    });
    newData = await Promise.filter(newData, async (item) => {
      const dbItem = await db.getDbData({
        dbName,
        limit: 1,
        query: {
          equalTo: [filterKey, item[filterKey]]
        },
        select: [filterKey],
      });

      return dbItem.length === 0;
    }, {
      concurrency: 1,
    });

    if (newData.length > 0) {
        newData = await Promise.mapSeries(newData, async (item) => {
            try {
                const htmlString = await http.get({
                    uri: `https://newswebeasy.github.io${item.link}`,
                    headers: {
                        'User-Agent': params.ua.pc,
                    },
                });
                const $ = cheerio.load(htmlString);
                const ARTICLE_CONTAINER = '.article_content';
                const wordList = $(`${ARTICLE_CONTAINER} ruby`).map(function() {
                    const $elem = $(this);
                    $elem.find('rt').removeAttr('class');
        
                    const furigana = $elem.find('rt').text().trim();
                    const text = $elem.text().replace(/\s*/g, '');
                    const kanji = text.slice(0, text.indexOf(furigana));
        
                    return {
                        text: kanji,
                        furigana,
                    };
                }).get();
        
                return {
                    htmlContent: $(ARTICLE_CONTAINER).html(),
                    wordList,
                    ...item,
                };
            } catch(err) {
                console.log(err);
                return null;
            }
        });

        newData = newData.filter((item) => {
            return !!item;
        });

        if (newData.length > 0) {
            db.saveDbData({
                dbName,
                data: newData,
            });
        }
    }

    return {
      success: true
    };
  } catch (err) {
    console.error(err);
    return {
      success: false
    };
  }
};