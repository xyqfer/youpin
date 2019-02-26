'use strict';

module.exports = async () => {
  const Parser = require('rss-parser');
  const Promise = require('bluebird');
  const flatten = require('lodash/flatten');
  const { getDbData } = require('app-libs/db');
  let parser = new Parser();

  const dbData = await getDbData({
    dbName: 'RSSURL',
  });
  const urls = dbData.map(({ url }) => {
    return url;
  });

  const data = await Promise.mapSeries(urls, async (url) => {
    try {
      const feed = await parser.parseURL(url);

      return feed.items.slice(0, 5).map(({ title, link }) => {
        return {
          title,
          link,
        };
      });
    } catch (err) {
      console.error(err);
      console.error(url);
      return [];
    }
  });

  return flatten(data);
};