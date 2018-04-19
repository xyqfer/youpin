'use strict';

module.exports = (req, res) => {
    const rp = require('request-promise');

    try {
        const { ref } = req.body;

        if (ref === 'refs/heads/master') {
            rp.post({
                uri: `${process.env.deployUrl}`
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