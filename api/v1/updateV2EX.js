'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const moment = require('moment');
    const sendMail = require('../lib/mail');

    const dbName = 'V2EXHot';

    // 早上8点15分前发邮件
    const today = new Date();
    const needSendMail = today.getHours() === 8 && today.getMinutes() <= 15;

    if (needSendMail && process.env.LEANCLOUD_APP_ENV !== 'development') {
        const query = new AV.Query(dbName);
        const yesterday = new Date(`${moment().add(-1, 'days').format('YYYY-MM-DD 00:00:00')}`);

        query.greaterThanOrEqualTo('updatedAt', yesterday);
        query.limit(1000);
        query.find().then((result) => {
            let mailContent = '';

            result.forEach((item) => {
                mailContent += `
                    <div style="margin-bottom: 50px">
                        <a href="${item.get('url')}">
                            <h4>${item.get('title')}</h4>
                        </a>
                        <p>
                            ${item.get('content')}
                        </p>
                    </div>
                `;
            });

            sendMail({
                title: 'v2 昨日热议主题',
                mailContent: mailContent
            });
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            res.end();
        });
    } else {
        const getDbData = () => {
            const query = new AV.Query(dbName);

            query.ascending('updatedAt');
            query.limit(500);
            return query.find();
        };

        const getV2EXData = () => {
            return rp.get({
                json: true,
                uri: 'https://www.v2ex.com/api/topics/hot.json',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
                },
            });
        };

        Promise.all([getDbData(), getV2EXData()]).then((results) => {
            const [ dbData, v2exData ] = results;

            const newData = v2exData.filter((item) => {
                for (let i = 0; i < dbData.length; i++) {
                    if (item.id === dbData[i].get('postId')) {
                        return false;
                    }
                }

                return true;
            });


            if (newData.length > 0) {
                const V2EXHot = AV.Object.extend(dbName);
                const v2HotObjects = newData.map((item) => {
                    const v2Hot = new V2EXHot();
                    v2Hot.set('postId', item.id);
                    v2Hot.set('url', item.url);
                    v2Hot.set('title', item.title);
                    v2Hot.set('content', item.content);

                    return v2Hot;
                });

                AV.Object.saveAll(v2HotObjects).then((results) => {

                }).catch((err) => {
                    console.log(err);
                });
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            res.end();
        });
    }
};