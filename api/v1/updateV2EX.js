'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const sendMail = require('../lib/mail');

    const dbName = 'V2EXHot';

    function getDbData() {
        let query = new AV.Query(dbName);

        query.ascending('updatedAt');
        query.limit(500);
        return query.find();
    }

    function getV2EXData() {
        return rp.get({
            json: true,
            uri: 'https://www.v2ex.com/api/topics/hot.json',
            headers: {
                'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36`
            },
        });
    }

    Promise.all([getDbData(), getV2EXData()]).then((result) => {
        const dbData = result[0];
        const v2exData = result[1];

        const newData = v2exData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item.id === dbData[i].get('postId')) {
                    return false;
                }
            }

            return true;
        });


        if (newData.length > 0) {
            let mailContent = '';

            newData.forEach((item) => {
                const V2EXHot = AV.Object.extend(dbName);
                let v2Hot = new V2EXHot();

                v2Hot.set('postId', item.id);
                v2Hot.save(null, {
                    useMasterKey: false
                });

                mailContent += `
                    <div style="margin-bottom: 50px">
                        <a href="${item.url}">
                            <h4>${item.title}</h4>
                        </a>
                        <p>
                            ${item.content}
                        </p>
                    </div>
                    `;
            });

            sendMail({
                title: 'v2 今日热议主题',
                mailContent: mailContent
            });
        }

        res.end();
    });
};