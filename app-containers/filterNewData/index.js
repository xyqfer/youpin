'use strict';

const _ = require('lodash');
const retry = require('async-retry');
const Parser = require('rss-parser');
const { getDbData } = require('app-libs/db');
const { params } = require('app-libs')
const parser = new Parser({
  headers: {
    'User-Agent': params.ua.pc
  },
});

const mapKey = (item) => {
    item.url = item.link;
    delete item.link;

    if (item.content) {
        item.summary = item.content;
        delete item.content;
    }

    return item;
};

module.exports = async ({ dbData, filterKey, rss: { source, appendTitle = false, field = ['title', 'link'], map = mapKey } }) => {
  console.error(`dbdata: ${dbData.length}, filterKey: ${filterKey}`);
  const rssList = await getDbData({
        dbName: source,
        query: {
            ascending: ['createdAt'],
            select: ['url'],
        },
    });

    let data = [];
    let count = 0;
    for (let { url } of rssList) {
      try {
        const feed = await retry(async () => await parser.parseURL(url), {
            retries: 2,
            minTimeout: 5000,
        });
        const feedData = feed.items.map((item) =>
            field.reduce((acc, key) => {
                const value = item[key] || '';

                if (key === 'title' && appendTitle) {
                    acc[key] = `[${feed.title}] - ` + value;
                } else {
                    acc[key] = value;
                }

                return acc;
            }, {})
        ).map(map);

        count += feedData.length;
        const newData = _.differenceBy(feedData, dbData, filterKey);
        if (newData.length > 0) {
          data = data.concat(newData);
        }
      } catch (err) {
          // console.error(err);
          console.error(url);
      }
    }

    console.error(`count: ${count}`);

    return _.uniqBy(data, filterKey);
};
