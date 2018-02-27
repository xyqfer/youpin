'use strict';

module.exports = (req, res) => {
    try {
        console.log(req.body)
    } catch (e) {

    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send({
        result: 'ok' + new Date(),
        msg: 'your message has been delievered'
    });
};