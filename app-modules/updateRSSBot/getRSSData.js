'use strict';

module.exports = async () => {
    const Parser = require('rss-parser');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const { getDbData, updateDbData, saveDbData } = require('app-libs/db');
    const parser = new Parser();

    const dbName = 'RSSURL';
    const dbData = await getDbData({
        dbName,
        query: {
            ascending: ['createdAt'],
        },
    });
    const urls = dbData.map(({ url, isInit, objectId }) => ({
        url,
        isInit,
        objectId,
    }));

    const data = await Promise.mapSeries(urls, async ({ url, isInit, objectId }) => {
        try {
            const feed = await parser.parseURL(url);
            const data = feed.items.slice(0, 5).map(({ title, link }) => ({
                title,
                link,
                source: url,
            }));

            if (!isInit) {
                await saveDbData({
                    dbName: 'RSSDATA',
                    data,
                });
                await updateDbData({
                    dbName,
                    data: {
                        isInit: true,
                    },
                    id: objectId,
                });
            }

            return data;
        } catch (err) {
            console.error(err);
            console.error(url);
            return [];
        }
    });

    return uniqBy(flatten(data).filter(({ link }) => !!link), 'link');
};
