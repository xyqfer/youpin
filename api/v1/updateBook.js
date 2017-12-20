'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const nodemailer = require('nodemailer');
    const cheerio = require('cheerio');
    const iconv = require('iconv-lite');
    const flatten = require('lodash/flatten');

    function updateChinaPubBook() {
        let dbName = 'ChinaPubBooks';

        function getAllDbData() {
            let query = new AV.Query(dbName);

            query.limit(1000);
            return query.find();
        }

        function getBookData() {
            return rp.get({
                uri: 'http://www.china-pub.com/xinshu/',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
                }
            }).then((htmlString) => {
                const $ = cheerio.load(htmlString);
                let targetUrlList = [];

                $('.nb_sec1').each(function () {
                    targetUrlList.push($(this).find('.nb_sec1_left h1 a').attr('href'));
                });

                return Promise.map(targetUrlList, (url) => {
                    return rp.get({
                        uri: url,
                        encoding : null,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
                        }
                    });
                });

            }).then((result) => {
                let bookList = [];

                result.forEach((htmlString) => {
                    const $ = cheerio.load(iconv.decode(htmlString, 'gb2312'));

                    $('.bookshow').each(function () {
                        bookList.push({
                            name: $(this).find('.bookName a').attr('title'),
                            url: $(this).find('.bookName a').attr('href')
                        });
                    });
                });

                return bookList;
            });
        }

        return Promise.all([
            getAllDbData(),
            getBookData()
        ]).then((data) => {
            let dbData = data[0];
            let booksData = data[1];

            return booksData.filter((book) => {
                let sameBook = dbData.filter((item) => {
                    return item.get('url') == book.url;
                });

                return sameBook.length == 0;
            });
        }).then((data) => {
            return Promise.mapSeries(data, (item) => {
                const BookStore = AV.Object.extend(dbName);
                let store = new BookStore();

                store.set('name', item.name);
                store.set('url', item.url);

                return store.save(null, {
                    useMasterKey: false
                }).then(function (post) {
                    return item;
                }, function (error) {
                    // 异常处理
                });
            });
        });
    }

    console.log('update_book');

    Promise.all([
        updateChinaPubBook()
    ]).then((data) => {
        console.log(data);
        res.end();
    });
};