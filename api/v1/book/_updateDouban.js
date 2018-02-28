'use strict';

module.exports = () => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const sendMail = require('../../lib/mail');

    const dbName = 'DoubanBook';

    const getDbData = () => {
        const query = new AV.Query(dbName);
        query.descending('updatedAt');
        query.limit(500);

        return query.find();
    };

    const getDoubanData = () => {
        return rp.get({
            uri: 'https://book.douban.com/latest?icn=index-latestbook-all',
            headers: {
                'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3343.0 Safari/537.3`
            }
        }).then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const bookList = [];

            $('#content ul > li').each(function () {
                const $book = $(this);

                bookList.push({
                    url: $book.find('.cover').attr('href'),
                    cover: $book.find('.cover > img').attr('src'),
                    name: $book.find('.detail-frame > h2').text().replace(/\n+/g, '').trim(),
                    desc: $book.find('.detail').text().replace(/\n+/g, '').trim(),
                    pubInfo: $book.find('.color-gray').text().replace(/\n+/g, '').trim()
                });
            });

            return bookList;
        }).catch((err) => {
            return [];
        });
    };

    return Promise.all([getDbData(), getDoubanData()]).then((results) => {
        const dbData = results[0];
        const doubanData = results[1];

        const newData = doubanData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item.url === dbData[i].get('url')) {
                    return false;
                }
            }

            return true;
        });

        if (newData.length > 0 && process.env.LEANCLOUD_APP_ENV !== 'development') {
            let mailContent = '';
            const DoubanBook = AV.Object.extend(dbName);

            const doubanBookObject = newData.map((item) => {
                const doubanBook = new DoubanBook();

                doubanBook.set('name', item.name);
                doubanBook.set('url', item.url);
                doubanBook.set('cover', item.cover);
                doubanBook.set('desc', item.desc);
                doubanBook.set('pubInfo', item.pubInfo);

                mailContent += `
                    <div style="margin-bottom: 60px">
                        <a href="${item.url}">
                            <h4>${item.name}</h4>
                        </a>
                        <p>
                            ${item.pubInfo}
                        </p>
                        <div>
                            ${item.desc}
                        </div>
                        <div>
                            <img src="${item.cover}" 
                                alt="">
                        </div>
                    </div>
                    <br><br>
                    `;

                return doubanBook;
            });

            AV.Object.saveAll(doubanBookObject).then((results) => {

            }).catch((err) => {
                console.log(err);
            });

            sendMail({
                title: '豆瓣有新书啦~',
                mailContent: mailContent
            });
        }

    }).catch((err) => {
        console.log(err);
    });
};