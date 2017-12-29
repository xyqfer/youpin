'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const iconv = require('iconv-lite');
    const flatten = require('lodash/flatten');

    class Book {
        constructor() {
            console.log('updateBook');

            this.dbName = 'ChinaPubBooks';
            this.dbData = [];
            this.bookData = [];
            this.newData = [];
            this.ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) ' +
                'AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60';
        }

        async start() {
            this.dbData = await this.getDbData();
            this.bookData = await this.getBookData();
            await this.filterData();
            await this.updateData();
        }

        getDbData() {
            let query = new AV.Query(this.dbName);

            query.limit(1000);
            return query.find();
        }

        getBookData() {
            return rp.get({
                uri: 'http://www.china-pub.com/xinshu/',
                headers: {
                    'User-Agent': this.ua
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
                            'User-Agent': this.ua
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

        filterData() {
            this.newData = this.bookData.filter((book) => {
                let sameBook = this.dbData.filter((item) => {
                    return item.get('url') == book.url;
                });

                return sameBook.length == 0;
            });

            let taskList = this.newData.map((book) => {
                return rp.get({
                    uri: book.url,
                    encoding : null,
                    headers: {
                        'User-Agent': this.ua
                    }
                }).then((htmlString) => {
                    const $ = cheerio.load(iconv.decode(htmlString, 'gb2312'));
                    let time;

                    $('#con_a_1 .pro_r_deta').eq(0).find('li').each(function () {
                        let text = $(this).text();

                        if (text.includes('上架时间')) {
                            time = text.replace('上架时间：', '');
                        }
                    });

                    if (time) {
                        let year = +time.split("-")[0];

                        if (year <= 2016) {
                            return false
                        } else {
                            return book;
                        }
                    } else {
                        return false;
                    }
                });
            });

            return Promise.all(taskList).then((result) => {
                this.newData = result.filter((book) => {
                    return book;
                });

                console.log(this.newData);

                this.bookData = null;
                this.dbData = null;
            });
        }

        updateData() {
            return Promise.mapSeries(this.newData, (item) => {
                const BookStore = AV.Object.extend(this.dbName);
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
        }
    }

    let book = new Book();
    book.start();
    res.end();
};