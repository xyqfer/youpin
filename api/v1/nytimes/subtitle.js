'use strict';

/**
 * 获取字幕列表
 */

module.exports = (req, res) => {
  const {
    db: {
      getDbData,
    },
  } = require('app-libs');

  const dbName = 'Subtitles';

  getDbData({
    dbName,
    query: {
      descending: ['updatedAt']
    }
  }).then((articles) => {
    res.json({
      success: true,
      data: articles,
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: '字幕列表获取失败',
    });
  });
};