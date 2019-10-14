'use strict';

module.exports = (req, res) => {
    const loadData = require('./_loadData');
    const saveDbData = require('./_saveDbData');

    const params = req.params;
    const page = params[0];

    const url = `https://www.uplabs.com/posts/c/all/resources/animation.json?page=${page}`;

    function redirectUplabs() {
        console.log('uplabs 异常');
        res.redirect(url);
    }

    loadData({
        url,
    })
        .then((data) => {
            if (data && data.length > 0) {
                saveDbData(data);
                res.json(data);
            } else {
                redirectUplabs();
            }
        })
        .catch((err) => {
            console.log(err);
            redirectUplabs();
        });
};
