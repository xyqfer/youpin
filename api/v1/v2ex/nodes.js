'use strict';

/**
 * 获取节点
 */
module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  rp.get({
    uri: 'https://www.v2ex.com',
    headers: {
      'User-Agent': params.ua.pc
    }
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = [];

    $('#Rightbar > .box').each(function () {
      let $box = $(this);
      let $nodes = $box.find('.item_node');

      if ($nodes.length > 0) {
        let nodeData = {
          groupName: $box.find('.fade').text(),
          nodes: []
        };

        $nodes.each(function () {
          let $node = $(this);

          nodeData.nodes.push({
            name: $node.text(),
            url: $node.attr('href')
          });
        });

        data.push(nodeData);
      }
    });

    $('#Main > .box').eq(1).find('table').each(function () {
      let $table = $(this);
      let nodeData = {
        groupName: $table.find('.fade').text(),
        nodes: []
      };

      $table.find('td a').each(function () {
        let $node = $(this);

        nodeData.nodes.push({
          name: $node.text(),
          url: $node.attr('href')
        });
      });

      data.push(nodeData);
    });

    res.json({
      success: true,
      data
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'v2ex nodes 获取失败'
    });
  });
};