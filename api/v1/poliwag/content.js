'use strict';

module.exports = (req, res) => {
  const contentMap = require('./utils/content');
  const { url = '', region = '' } = req.query;

  if (contentMap[region]) {
    contentMap[region](url)
      .then(data => {
        res.json({
          success: true,
          data,
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          success: false,
          msg: `${region} ${url} 获取失败`,
        });
      });
  } else {
    res.json({
      success: false,
      msg: `${region} ${url} 获取失败`,
    });
  }
};