'use strict';

/**
 * 获取 TE 列表
 */

module.exports = (req, res) => {
  require('isomorphic-fetch');
  const Promise = require('bluebird');
  const Dropbox = require('dropbox').Dropbox;
  const cheerio = require('cheerio');
  const {
    db: {
      getDbData,
      saveDbData,
    },
  } = require('app-libs');

  const dbName = 'TE';

  getDbData({
    dbName,
  }).then((articles) => {
    if (articles.length === 0) {
      let dropbox = new Dropbox({
        accessToken: process.env.dropboxToken,
      });
    
      dropbox.filesListFolder({
        path: '/TE'
      }).then((resp) => {
        Promise.mapSeries(resp.entries, (item) => {
          return dropbox.filesDownload({
            path: `${item.path_display}/article.xml`,
          }).then((data) => {
            const $ = cheerio.load(Buffer.from(data.fileBinary, 'binary').toString(), {
              normalizeWhitespace: true,
              xmlMode: true
            });

            let title = $('title[lang=en_GB]').text();
            let summary = $('rubric[lang=en_GB]').text();
        
            return {
              articleId: $('article').attr('id'),
              title,
              summary,
            };
          }).catch((err) => {
            console.log(err);
            return {};
          });
        }).then((articles) => {
          res.json({
            success: true,
            data: articles,
          });

          saveDbData({
            dbName,
            data: articles,
          });
        }).catch((err) => {
          console.log(err);
          res.json({
            success: false,
            msg: 'TE 列表获取失败',
          });
        });
      }).catch((err) => {
        console.log(err);
        res.json({
          success: false,
          msg: 'TE 列表获取失败',
        });
      });
    } else {
      res.json({
        success: true,
        data: articles,
      });
    }
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'TE 列表获取失败',
    });
  });
};