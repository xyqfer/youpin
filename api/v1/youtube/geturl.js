'use strict';

const utils = require('./utils');

module.exports = async (req, res) => {
    const { id } = req.params;
    const url = await utils.getUrl(id);

    res.json({
        success: true,
        data: {
            url,
        },
    });
};
