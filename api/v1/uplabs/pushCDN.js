module.exports = (req, res, next) => {
    const loadData = require('./_loadData');
    const COS = require('cos-nodejs-sdk-v5');

    const params = req.params;
    const year = params[0];
    const month = params[1];
    const date = params[2];
    const page = params[3];

    const zoneOffset = -5;
    const nowDate = new Date();
    const now = nowDate.getTime();
    const offsetMilliSecond = nowDate.getTimezoneOffset() * 60 * 1000;
    const currentZoneDate = new Date(now + offsetMilliSecond + zoneOffset * 60 * 60 * 1000);

    const currentYear = currentZoneDate.getFullYear();
    let _month = currentZoneDate.getMonth() + 1;
    const currentMonth = _month < 10 ? '0' + _month : _month;
    const currentDate = currentZoneDate.getDate() < 10 ? '0' + currentZoneDate.getDate() : currentZoneDate.getDate();

    const offset = (((new Date(`${currentYear}-${currentMonth}-${currentDate}`)).getTime()) -
        ((new Date(`${year}-${month}-${date}`)).getTime())) / (24 * 60 * 60 * 1000);

    let url = `https://www.uplabs.com/showcases/all/more.json?days_ago=${offset}&per_page=12&page=${page}`;

    if (page == 0) {
        url = `https://www.uplabs.com/all.json?days_ago=${offset}&page=1`;
    }

    loadData({
        url: url,
        platform: ''
    }).then((data) => {
        const cos = new COS({
            SecretId: process.env.COSSecretId || '',
            SecretKey: process.env.COSSecretKey || ''
        });

        cos.putObject({
            Bucket: process.env.COSBucket || '',
            Region: process.env.COSRegion || '',
            Key: `api/v1/uplabs/uplabs_${year}-${month}-${date}_${page}.json`,
            Body: Buffer.from(JSON.stringify(data))
        }, function (err, data) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                res.json(data);
            }
        });
    });
};