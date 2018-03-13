'use strict';

module.exports = (req, res) => {
    const rp = require('request-promise');

    try {
        const { ref } = req.body;

        if (ref === 'refs/heads/master') {
            rp.post({
                uri: `https://leancloud.cn/1.1/engine/groups/web/productionImage?token=${process.env.deployToken}&gitTag=master`
            }).catch((err) => {
                console.error(err);
            });
        }
    } catch (err) {
        console.error(err);
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send({
        result: 'OK ' + new Date(),
        msg: 'deploy'
    });
};