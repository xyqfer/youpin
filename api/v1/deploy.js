'use strict';

module.exports = (req, res) => {
    const Promise = require('bluebird');
    const rp = require('request-promise');

    try {
        const { ref } = req.body;

        if (ref === 'refs/heads/master') {
            rp.post({
                uri: `https://leancloud.cn/1.1/engine/groups/web/productionImage?token=${process.env.deployToken}&gitTag=master`
            });
        }
    } catch (e) {

    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send({
        result: 'ok ' + new Date(),
        msg: 'your message has been delivered'
    });
};