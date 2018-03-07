'use strict';

module.exports = () => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const sendMail = require('../lib/mail');

    const dbName = 'Codrop';

    function getCodropData() {
        return rp.get({
            uri: 'https://tympanus.net/codrops/all-articles/',
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) ' +
                'AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
            }
        }).then((htmlString) => {
            const $ = cheerio.load(htmlString);
            let postList = [];

            $('.ct-row article').each(function () {
                postList.push({
                    postId: $(this).attr('id'),
                    url: $(this).find('h3 > a').attr('href'),
                    name: $(this).find('h3 > a').text()
                });
            });

            return postList;
        });
    }

    function getDbData() {
        let query = new AV.Query(dbName);
        query.descending('updatedAt');
        query.limit(1000);

        return query.find().then((data) => {
            return data.map((item) => {
                return item.toJSON();
            });
        }).catch((err) => {
            console.log(err);
            return [];
        });
    }

    return Promise.all([getDbData(), getCodropData()]).then(([dbData, codropData]) => {
        const newData = codropData.filter((codropItem) => {
            for (let i = 0; i < dbData.length; i++) {
                if (dbData[i].postId === codropItem.postId) {
                    return false;
                }
            }

            return true;
        });

        if (newData.length > 0 && process.env.LEANCLOUD_APP_ENV !== 'development') {
            let mailContent = '';

            newData.forEach((item) => {
                mailContent += `<a href='${item.url}'>${item.name}</a><br><br>`;

                const Codrop = AV.Object.extend(dbName);
                const codrop = new Codrop();

                codrop.set('postId', item.postId);
                codrop.save(null, {
                    useMasterKey: false
                });
            });

            sendMail({
                title: 'Codrop 更新啦',
                mailContent: mailContent
            });
        }
    }).catch((err) => {
        console.log(err);
    });
};