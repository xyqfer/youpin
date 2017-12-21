'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const nodemailer = require('nodemailer');
    const cheerio = require('cheerio');
    const iconv = require('iconv-lite');
    const flatten = require('lodash/flatten');

    class Book {
        constructor() {
            console.log('update_book');

            this._dbName = 'ChinaPubBooks';
            this._dbData = [];
            this._bookData = [];
            this._newData = [];
            this._ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) ' +
                'AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60';
        }

        async start() {
            this._dbData = await this._getDbData();
            this._bookData = await this._getBookData();
            this._filterData();
            await this._updateData();
        }

        _getDbData() {
            let query = new AV.Query(this._dbName);

            query.limit(1000);
            return query.find();
        }

        _getBookData() {
            return rp.get({
                uri: 'http://www.china-pub.com/xinshu/',
                headers: {
                    'User-Agent': this._ua
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
                            'User-Agent': this._ua
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

        _filterData() {
            this._newData = this._bookData.filter((book) => {
                let sameBook = this._dbData.filter((item) => {
                    return item.get('url') == book.url;
                });

                return sameBook.length == 0;
            });

            console.log(this._newData);

            this._bookData = null;
            this._dbData = null;
        }

        _updateData() {
            return Promise.mapSeries(this._newData, (item) => {
                const BookStore = AV.Object.extend(this._dbName);
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