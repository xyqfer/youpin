'use strict';

const moment = require('moment');
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
            const message = newData.reduce((acc, { title, link }) => {
                acc.push({
                  title: title.trim(),
                  url: link,
                })
                return acc;
            }, []);

            try {
              await http.post({
                  uri: process.env.qqboturl2,
                  json: true,
                  body: {
                      "sessionKey": process.env.qqbotsessionkey,
                      "data": message,
                  },
              });
            } catch(err) {
              console.error(err);
            }

            const content = newData.reduce((acc, { title, link }) => {
              acc.push([
                {
                  'tag': 'text',
                  'text': title.trim(),
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

            try {
              let res = await lark.sendPost(process.env.LARK_USER, {
                title: 'RSSBOT 有更新:',
                content,
              });
              console.log(res.body);

              const day = moment().day();
              const date = moment().date();
              const month = moment().month();

              if ((day !== 0 && day !== 6) || !(month === 9 && date >= 1 && date <= 7)) {
                res = await lark.sendBotMsg(process.env.LARK_BOT1, {
                  title: 'RSSBOT 有更新:',
                  content,
                });

                console.log(res.body);
              }
            } catch(err) {
              console.error(err);
              console.log(content);
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
