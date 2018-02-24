'use strict';

module.exports = (req, res) => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const sendMail = require('../lib/mail');

    const dbName = 'Codrop';

    function getCodepenData() {
        return rp.get({
            uri: 'https://codepen.io/pens/grid/picks/1/',
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
                'Accept-Language': 'en,zh-CN;q=0.9,zh;q=0.8,sk;q=0.7,ja;q=0.6,zh-TW;q=0.5',
            }
        }).then((data) => {
            const result = JSON.parse(data);
            const $ = cheerio.load(result.page.html);
            const penList = [];

            $('.single-pen').each(function () {
                const $pen = $(this);
                penList.push({
                    url: $pen.find('.cover-link').attr('href'),
                    title: $pen.find('.cover-link').text().replace(/\n+/g, '').trim()
                });
            });

            res.json(penList);
        }).catch((err) => {
            console.log(err);
        });
    }

    function getDbData() {
        let query = new AV.Query(dbName);

        query.ascending('updatedAt');
        query.limit(1000);
        return query.find();
    }

    getCodepenData().then((result) => {
    });


    // return Promise.all([getDbData(), getCodropData()]).then((result) => {
    //     const dbData = result[0];
    //     const codropData = result[1];
    //
    //     const newData = codropData.filter((codropItem) => {
    //         for (let i = 0; i < dbData.length; i++) {
    //             if (dbData[i].get('postId') === codropItem.postId) {
    //                 return false;
    //             }
    //         }
    //
    //         return true;
    //     });
    //
    //     if (newData.length > 0) {
    //         let mailContent = '';
    //
    //         newData.forEach((item) => {
    //             mailContent += `<a href='${item.url}'>${item.name}</a><br><br>`;
    //
    //             const Codrop = AV.Object.extend(dbName);
    //             const codrop = new Codrop();
    //
    //             codrop.set('postId', item.postId);
    //             codrop.save(null, {
    //                 useMasterKey: false
    //             });
    //         });
    //
    //         sendMail({
    //             title: 'Codrop 更新啦',
    //             mailContent: mailContent
    //         });
    //     }
    // });
};