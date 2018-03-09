'use strict';

module.exports = () => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const sendMail = require('../../lib/mail');

    const dbName = 'ZhongxinBook';

    const getDbBook = () => {
        const query = new AV.Query(dbName);
        query.descending('updatedAt');
        query.limit(1000);

        return query.find();
    };

    const getZhongxinBook = () => {
        const pageCount = 3;
        const pageCountList = [];

        for (let i = 1; i <= pageCount; i++) {
            pageCountList.push(i);
        }

        return Promise.mapSeries(pageCountList, (page) => {
            return rp.get({
                uri: `https://h5.youzan.com/v2/showcase/tag?alias=lv78hovm&page=${page}`,
                headers: {
                    'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3343.0 Safari/537.3`
                }
            }).then((htmlString) => {
                try {
                    const bookDetail = JSON.parse(htmlString.match(/var _showcase_components = (.+)} else {/)[1].trim().slice(0, -1));
                    return bookDetail[1].goods;
                } catch (e) {
                    return [];
                }
            })
        }).then((results) => {
            return flatten(results);
        });
    };

    return Promise.all([getDbBook(), getZhongxinBook()]).then((results) => {
        const [ dbBook, zhongxinBook ] = results;

        const newData = zhongxinBook.filter((item) => {
            for (let i = 0; i < dbBook.length; i++) {
                if (item.id === dbBook[i].get('bookId')) {
                    return false;
                }
            }

            return true;
        });

        if (newData.length > 0 && process.env.LEANCLOUD_APP_ENV !== 'development') {
            let mailContent = '';
            const ZhongxinBook = AV.Object.extend(dbName);

            const zxBookObject = newData.map((item) => {
                const zxBook = new ZhongxinBook();

                zxBook.set('name', item.title);
                zxBook.set('url', item.url);
                zxBook.set('cover', item.image_url);
                zxBook.set('bookId', item.id);

                mailContent += `
                    <div style="margin-bottom: 60px">
                        <a href="${item.url}">
                            <h4>${item.title}</h4>
                        </a>
                        <div>
                            <img src="${item.image_url}" 
                                alt="">
                        </div>
                    </div>
                    <br><br>
                    `;

                return zxBook;
            });

            AV.Object.saveAll(zxBookObject).then((results) => {

            }).catch((err) => {
                console.log(err);
            });

            sendMail({
                title: '中信有新书啦~',
                mailContent: mailContent
            });
        }
    }).catch((err) => {
        console.log(err);
    });
};