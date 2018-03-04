'use strict';

module.exports = () => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const iconv = require('iconv-lite');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const sendMail = require('../../lib/mail');

    class Book {
        constructor() {
            this.dbName = 'ChinaPubBooks';
            this.dbData = [];
            this.bookData = [];
            this.newData = [];
            this.ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) ' +
                'AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60';
        }

        async start() {
            this.dbData = await this.getDbData();
            this.bookData = uniqBy(await this.getBookData(), 'url');
            await this.filterData();
            return await this.updateData();
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
                for (let i = 0; i < this.dbData.length; i++) {
                    if (book.url === this.dbData[i].get('url')) {
                        return false;
                    }
                }

                return true;
            });

            return Promise.mapSeries(this.newData, (book) => {
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
                            return false;
                        } else {
                            let cover = $('.gray12a img').attr('src');
                            let intro = $(".pro_name_intr").text();

                            book.cover = cover;
                            book.intro = intro;
                            return book;
                        }
                    } else {
                        return false;
                    }
                });
            }).then((result) => {
                this.newData = result.filter((book) => {
                    return book;
                });

                console.log(this.newData);

                this.bookData = null;
                this.dbData = null;
            });
        }

        updateData() {
            const BookObj = AV.Object.extend(this.dbName);
            const bookObjList = this.newData.map((item) => {
                const bookObj = new BookObj();
                bookObj.set('name', item.name);
                bookObj.set('url', item.url);
                bookObj.set('cover', item.cover);
                bookObj.set('intro', item.intro);

                return bookObj;
            });

            if (process.env.LEANCLOUD_APP_ENV !== 'development' && this.newData.length > 0) {
                let mailContent = '';

                this.newData.forEach((item) => {
                    const bookUrl = `${process.env.hostName}/api/v1/book/redirect?url=${encodeURIComponent(item.url)}`;
                    mailContent += `
                    <div style="margin-bottom: 60px">
                        <a href="${bookUrl}">
                            <h4>${item.name}</h4>
                        </a>
                        <p>
                            ${item.intro}
                        </p>
                        <div>
                            <img src="${item.cover}" 
                                alt="">
                        </div>
                    </div>
                    <br><br>
                    `;
                });

                sendMail({
                    title: 'ChinaPub 有新书啦',
                    mailContent: mailContent
                });
            }

            return AV.Object.saveAll(bookObjList).then((results) => {

            }).catch((err) => {
                console.log(err);
            });
        }
    }

    let book = new Book();
    return book.start();
};
