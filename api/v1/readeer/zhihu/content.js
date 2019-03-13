'use strict';

module.exports = async (req, res) => {
  const path = require('path');
  const { url } = req.query;
  const {
    params,
    http,
  } = require('app-libs');
  const utils = require('./utils');
  let data = {};
  let success = true;
  const answerId = path.parse(url).name;

  try {
    const result = await http.get({
      json: true,
      uri: `https://api.zhihu.com/appview/api/v4/answers/${answerId}?include=content`,
      headers: {
        'User-Agent': params.ua.pc,
      },
    });
    data = {
      url,
      content: utils.ProcessImage(result.content),
    };
  } catch (err) {
    console.error(err);
    data = {};
    success = false;
  }

  res.json({
    success,
    data,
  });
};