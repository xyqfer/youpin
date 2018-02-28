'use strict';

module.exports = () => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const moment = require('moment');
    const sendMail = require('../lib/mail');

    const dbName = 'CodePen';

    function getCodepenData() {
        const pageCount = 5;
        const pageCountList = [];

        for (let i = 1; i <= pageCount; i++) {
            pageCountList.push(i);
        }

        return Promise.mapSeries(pageCountList, (page) => {
            return rp.get({
                json: true,
                uri: `https://cpv2api.com/pens/picks?page=${page}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
                    'Accept-Language': 'en,zh-CN;q=0.9,zh;q=0.8,sk;q=0.7,ja;q=0.6,zh-TW;q=0.5'
                }
            }).then((result) => {
                return result.data.map((item) => {
                    return {
                        title: item.title,
                        desc: item.details,
                        url: item.link,
                        cover: item.images.small
                    };
                });
            }).catch((err) => {
                console.log(err);
            });
        }).then((results) => {
            return flatten(results);
        }).catch((err) => {
            console.log(err);
            return [];
        });
    }

    function getDbData() {
        let query = new AV.Query(dbName);

        query.descending('updatedAt');
        query.limit(1000);
        return query.find();
    }

    return Promise.all([getDbData(), getCodepenData()]).then((results) => {
        const [ dbData, codepenData ] = results;

        const newData = codepenData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (dbData[i].get('url') === item.url) {
                    return false;
                }
            }

            return true;
        });

        if (newData.length > 0 && process.env.LEANCLOUD_APP_ENV !== 'development') {
            const CodePen = AV.Object.extend(dbName);
            const codepenList = newData.map((item) => {
                const codepen = new CodePen();
                codepen.set('title', item.title);
                codepen.set('desc', item.desc);
                codepen.set('url', item.url);
                codepen.set('cover', item.cover);

                return codepen;
            });

            AV.Object.saveAll(codepenList).then((results) => {

            }).catch((err) => {
                console.log(err);
            });

            const mailContent = newData.map((item) => {
                return `
                    <div style="margin-bottom: 60px">
                        <a href="${item.url}">
                            <h4>${item.title}</h4>
                        </a>
                        <p>
                            ${item.desc}
                        </p>
                        <div>
                            <img src="${item.cover}" 
                                alt="">
                        </div>
                    </div>
                    <br><br>
                `;
            }).join('');

            sendMail({
                title: 'CodePen 有更新啦',
                mailContent
            });
        }
    }).catch((err) => {
        console.log(err);
    });
};