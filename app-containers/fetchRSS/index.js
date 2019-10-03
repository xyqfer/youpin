'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const Parser = require('rss-parser');
const parser = new Parser();
const {
    getDbData,
} = require('app-libs/db');

const mapKey = (item) => {
  item.url = item.link;
  delete item.link;

  if (item.content) {
    item.summary = item.content;
    delete item.content;
  }

  return item;
};

module.exports = async ({ source, field = ['title', 'link'], map = mapKey }) => {
    const dbData = await getDbData({
        dbName: source,
        query: {
          ascending: ['createdAt'],
          select: ['url'],
        },
    });

    const data = await Promise.mapSeries(dbData, async ({ url, }) => {
        try {
          const feed = await parser.parseURL(url);
          const data = feed.items.map((item) => {
            return field.reduce((acc, key) => {
                acc[key] = item[key] || '';
                return acc;
            }, {});
          });
    
          return data;
        } catch (err) {
          console.error(err);
          console.error(url);
          return [];
        }
    });
    
    return _.uniqBy(_.flatten(data), 'link').map(map);
};