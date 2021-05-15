module.exports = (req, res) => {
    const getEnvInfo = require('@xyqfer/env-info');
    res.json({
        success: true,
        data: getEnvInfo(),
    });
};
