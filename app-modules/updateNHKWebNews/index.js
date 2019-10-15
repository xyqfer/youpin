'use strict';

const _ = require('lodash');
const getData = require('./getData');
const { db, crawler } = require('app-libs');

module.exports = async () => {
    const dbName = 'NHKWebNews';
    const filterKey = 'link';

    try {
        const nhkData = await getData();
        const containedInKeys = nhkData.map((item) => item[filterKey]);
        const containedData = await db.getData({
            dbName,
            query: {
                containedIn: [filterKey, containedInKeys],
            },
        });
        let newData = _.differenceBy(nhkData, containedData, filterKey);

        if (newData.length > 0) {
            newData = await Promise.mapSeries(newData, async (item) => {
                try {
                    const $ = await crawler(`https://newswebeasy.github.io${item.link}`);
                    const ARTICLE_CONTAINER = '.article_content';
                    const wordList = $(`${ARTICLE_CONTAINER} ruby`)
                        .map(function() {
                            const $elem = $(this);
                            $elem.find('rt').removeAttr('class');

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

                    return {
                        htmlContent: $(ARTICLE_CONTAINER).html(),
                        wordList,
                        ...item,
                    };
                } catch (err) {
                    console.log(err);
                    return null;
                }
            });

            newData = newData.filter((item) => !!item);

            if (newData.length > 0) {
                db.saveDbData({
                    dbName,
                    data: newData,
                });
            }
        }

        return {
            success: true,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
