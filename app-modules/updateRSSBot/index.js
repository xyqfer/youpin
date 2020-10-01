'use strict';

const getRSSData = require('./getRSSData');
const { db, http } = require('app-libs');
const lark = require('app-libs/mail/sendLark');
const { cache } = db;

module.exports = async () => {
    try {
        const dbName = 'RSSDATA';
        const filterKey = 'link';

        const initCache = async () => {
            await cache.init({
                dbName,
                query: {
                    descending: ['createdAt'],
                    select: [filterKey],
                },
                count: 5 * 1000,
            });
        };

        const [, rssData] = await Promise.all([initCache(), getRSSData()]);

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
                    group_id: parseInt(process.env.qqbotgroupid),
                    message: message,
                },
            });

            const content = newData.reduce((acc, { title, link }) => {
              acc.push([
                {
                  'tag': 'text',
                  'text': title,
                }
              ]);
              acc.push([
                {
                  'tag': 'a',
                  'text': link,
                  'href': link
                }
              ]);
              acc.push([]);
              return acc;
            }, []);

            lark.sendPost(process.env.LARK_USER, {
              title: 'RSSBOT 有更新:',
              content,
            });
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
