'use strict';

module.exports = (req, res) => {
    const googletranslate = require('./utils/googletranslate');
    const bingTranslate = require('./utils/bingTranslate');
    const { text = '', type = 'all' } = req.body;

    if (type === 'word') {
        bingTranslate(text)
            .then((response) => {
                res.json({
                    success: true,
                    data: {
                        text: response.defs[response.defs.length - 1].def.replace(/；/g, ';'),
                    },
                });
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    success: false,
                    msg: 'translate 失败',
                });
            });
    } else {
        googletranslate(text)
            .then((response) => {
                const data = {};

                if (type === 'all') {
                    const text = response.sentences.reduce((acc, item) => acc + item.trans, '');

                    data.text = text;
                } else {
                    const content = response.sentences.map(
                        (item) => ({
                            en: item.orig,
                            zh: item.trans,
                        }),
                        ''
                    );

                    data.content = content;
                }

                res.json({
                    success: true,
                    data,
                });
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    success: false,
                    msg: 'translate 失败',
                });
            });
    }
};
