const getEnvInfo = require('@xyqfer/env-info');

module.exports = (req, res) => {
    res.json({
        success: true,
        data: getEnvInfo(),
    });
};