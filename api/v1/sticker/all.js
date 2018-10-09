'use strict';

module.exports = (req, res) => {
  const http = require('./utils/http');
  const { params } = require('app-libs');
  const { page = 1 } = req.query;

  http.get({
    json: true,
    uri: `https://tlgrm.eu/stickers?page=${page}&ajax=true`,
    headers: {
      'User-Agent': params.ua.pc,
      'X-Requested-With': 'XMLHttpRequest',
    },
  }).then(({ last_page, total, data }) => {
    let stickers = {
      last: last_page,
      total: total,
      stickers: data.map(({ name_en, link, uuid, count, installs }) => {
        return {
          name: name_en,
          link,
          uuid,
          count,
          installs,
          cover: `https://s.tcdn.co/${uuid.slice(0, 3)}/${uuid.slice(3, 6)}/${uuid}/thumb256.png`,
        };
      }),
    };

    res.json({
      success: true,
      data: stickers,
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'sticker all 获取失败',
    });
  });
};