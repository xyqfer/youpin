'use strict';

module.exports = async () => {
  const Promise = require('bluebird');
  const rp = require('request-promise');
  const getRSSData = require('./getRSSData');
  const { getDbData, saveDbData } = require('app-libs/db');

  const dbName = 'RSSDATA';

  try {
    let [dbData, rssData] = await Promise.all([
      getDbData({
        dbName,
      }),
      getRSSData()
    ]);
    dbData = dbData.map(({ link }) => {
      return link;
    });

    let newData = rssData.filter(({ link }) => {
      return !dbData.includes(link);
    });
    const filterKey = 'link';
    newData = await Promise.filter(newData, async (item) => {
      const dbItem = await getDbData({
        dbName,
        limit: 1,
        query: {
          equalTo: [filterKey, item[filterKey]]
        }
      });

      return dbItem.length === 0;
    }, {
      concurrency: 1
    });

    if (newData.length > 0) {
      saveDbData({
        dbName,
        data: newData,
      });

      const message = newData.reduce((acc, { title, link }, index) => {
        const isLast = index === newData.length - 1;
        acc += `${title.trim()} ${link}${isLast ? '' : '\n\n'}`;
        return acc;
      }, 'RSSBOT 有更新:\n\n');
      rp.post({
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