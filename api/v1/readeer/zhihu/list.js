'use strict';

module.exports = async (req, res) => {
  const {
    params,
    http,
  } = require('app-libs');
  let data = [];
  let success = true;

  try {
    const result = await http.get({
      json: true,
      uri: 'http://duzhihu.cc/web/answer_api?num=30&yesterday=false',
      headers: {
        'User-Agent': params.ua.pc,
      },
    });
    data = result.map((item) => {
      return {
        title: item.title,
        summary: item.content,
        url: item.answerLink,
      };
    });
  } catch(err) {
    console.error(err);
    data = [];
    success = false;
  }

  res.json({
    success,
    data,
  });
};