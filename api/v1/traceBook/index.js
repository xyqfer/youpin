'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const iconv = require('iconv-lite');
    const sendMail = require('../lib/mail');

    class Trace {
        constructor() {
            this.dbName = 'ChinaPubBooks';
            this.mailTitle = '有货啦';
            this.traceBook = [];
            this.isbn = [];
            this.mobileUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) ' +
                'AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60';
            this.pcUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) ' +
                'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3297.0 Safari/537.36';
        }

        async start() {
            await this.getTraceBook();
            await this.fillISBN();
            await this.getJDStatus();
            await this.updateData();
            await this.sendMail();
        }

        getTraceBook() {
            let query = new AV.Query(this.dbName);
            query.equalTo('trace', true);
            query.limit(1000);

            return query.find().then((data) => {
                this.traceBook = data.map((item) => {
                    return {
                        id: item.id,
                        name: item.get('name'),
                        url: item.get('url'),
                        isbn: item.get('isbn')
                    }
                });
            });
        }

        fillISBN() {
            let taskList = this.traceBook.map((book) => {
                if (book.isbn) {
                    return book
                } else {
                    return rp.get({
                        uri: book.url,
                        encoding : null,
                        headers: {
                            'User-Agent': this.mobileUA
                        }
                    }).then((htmlString) => {
                        const $ = cheerio.load(iconv.decode(htmlString, 'gb2312'));
                        let isbn;

                        $('#con_a_1 .pro_r_deta').eq(0).find('li').each(function () {
                            let text = $(this).text();

                            if (text.includes('ISBN')) {
                                isbn = text.replace('ISBN：', '');
                            }
                        });

                        if (isbn) {
                            book.isbn = isbn;
                        }

                        return book;
                    });
                }
            });

            return Promise.all(taskList).then((data) => {
                if (data) {
                    this.traceBook = data;
                }
            });
        }

        getJDStatus() {
            let taskList = this.traceBook.map((book) => {
                return rp.get({
                    uri: `https://search.jd.com/Search?keyword=${book.isbn}&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wtype=1&click=1`,
                    headers: {
                        'User-Agent': this.pcUA
                    }
                }).then((htmlString) => {
                    const $ = cheerio.load(htmlString);

                    book.onSale = false;

                    if ($('.gl-item').length > 0) {
                        for (let i = 0; i < $('.gl-item').length; i++) {
                            let $bookItem = $('.gl-item').eq(i);
                            let text = $bookItem.text();

                            if (text.includes('自营')) {
                                book.onSale = true;
                                book.jdUrl = 'http:' +
                                    $bookItem.find('.gl-i-wrap > .p-img').eq(0).find('a').attr('href');
                                break;
                            }
                        }
                    }

                    return book;
                });
            });

            return Promise.all(taskList).then((data) => {
                if (data) {
                    this.traceBook = data;
                }
            });
        }

        updateData() {
            let taskList = this.traceBook.map((book) => {
                let bookStore = AV.Object.createWithoutData(this.dbName, book.id);

                bookStore.set('isbn', book.isbn);
                bookStore.set('trace', !book.onSale);
                return bookStore.save();
            });

            return Promise.all(taskList);
        }

        sendMail() {
            let onSaleBookList = this.traceBook.filter((book) => {
                return book.onSale;
            });

            if (onSaleBookList.length > 0) {
                if (process.env.LEANCLOUD_APP_ENV != 'development') {
                    let mailContent = '';

                    onSaleBookList.forEach((item) => {
                        mailContent += `<a href='${item.jdUrl}'>${item.name}</a><br><br>`;
                    });

                    return sendMail({
                        title: this.mailTitle,
                        mailContent: mailContent
                    });
                } else {
                    return onSaleBookList;
                }
            }
        }
    }

    let trace = new Trace();
    trace.start();
    res.end();
};