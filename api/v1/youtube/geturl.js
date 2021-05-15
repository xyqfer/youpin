module.exports = async (req, res) => {
    const utils = require('./utils');
    const { id } = req.params;
    const url = await utils.getUrl(id);

    res.json({
        success: true,
        data: {
            url,
        },
    });
};
