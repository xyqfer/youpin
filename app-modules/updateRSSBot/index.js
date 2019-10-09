'use strict';

module.exports = async () => {
  const getRSSData = require('./getRSSData');
  const { db, http, } = require('app-libs');
  const { cache } = db;

  try {
    const dbName = 'RSSDATA';
    const filterKey = 'link';

    const initCache = () => {
      await cache.init({
        dbName,
        query: {
          descending: ['createdAt'],
          select: [filterKey],
        },
        limit: 10 * 1000,
      });
    };

    const [, rssData] = await Promise.all([
      initCache(),
      getRSSData(),
    ]);
    const newData = await cache.findAndSet({
      dbName,
      source: rssData,
      key: filterKey,
    });

    if (newData.length > 0) {
      const message = newData.reduce((acc, { title, link }, index) => {
        const isLast = index === newData.length - 1;
        acc += `${title.trim()} ${link}${isLast ? '' : '\n\n'}`;
        return acc;
      }, 'RSSBOT 有更新:\n\n');
      http.post({
        uri: process.env.qqboturl,
        json: true,
        body: {
          'group_id': parseInt(process.env.qqbotgroupid),
          'message': message,
        },
      });
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