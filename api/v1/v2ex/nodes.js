'use strict';

/**
 * 获取节点
 */
module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  // rp.get({
  //   uri: 'https://www.v2ex.com',
  //   headers: {
  //     'User-Agent': params.ua.pc
  //   }
  // }).then((htmlString) => {
  //   let $ = cheerio.load(htmlString);
  //   let data = [];
  //
  //   $('#Main > .box').eq(1).find('.cell').each(function () {
  //     let $elem = $(this);
  //
  //     $elem.find('table').each(function () {
  //       let $table = $(this);
  //       let nodeData = {
  //         groupName: $table.find('.fade').text(),
  //         nodes: []
  //       };
  //
  //       $table.find('td a').each(function () {
  //         let $node = $(this);
  //
  //         nodeData.nodes.push({
  //           name: $node.text(),
  //           url: $node.attr('href')
  //         });
  //       });
  //
  //       data.push(nodeData);
  //     });
  //   });
  //
  //   res.json({
  //     success: true,
  //     data
  //   });
  // }).catch((err) => {
  //   console.log(err);
  //   res.json({
  //     success: false,
  //     msg: 'v2ex nodes 获取失败'
  //   });
  // });

  let nodesData = [
    {
      "groupName": "分享与探索",
      "nodes": [
        {
          "name": "问与答",
          "url": "/go/qna"
        },
        {
          "name": "分享发现",
          "url": "/go/share"
        },
        {
          "name": "分享创造",
          "url": "/go/create"
        },
        {
          "name": "分享邀请码",
          "url": "/go/in"
        },
        {
          "name": "奇思妙想",
          "url": "/go/ideas"
        },
        {
          "name": "自言自语",
          "url": "/go/autistic"
        },
        {
          "name": "随想",
          "url": "/go/random"
        },
        {
          "name": "设计",
          "url": "/go/design"
        },
        {
          "name": "Blog",
          "url": "/go/blog"
        }
      ]
    },
    {
      "groupName": "V2EX",
      "nodes": [
        {
          "name": "V2EX",
          "url": "/go/v2ex"
        },
        {
          "name": "DNS",
          "url": "/go/dns"
        },
        {
          "name": "Project Babel",
          "url": "/go/babel"
        },
        {
          "name": "反馈",
          "url": "/go/feedback"
        },
        {
          "name": "Google App Engine",
          "url": "/go/gae"
        },
        {
          "name": "使用指南",
          "url": "/go/guide"
        }
      ]
    },
    {
      "groupName": "iOS",
      "nodes": [
        {
          "name": "iDev",
          "url": "/go/idev"
        },
        {
          "name": "iCode",
          "url": "/go/icode"
        },
        {
          "name": "iMarketing",
          "url": "/go/imarketing"
        },
        {
          "name": "iAd",
          "url": "/go/iad"
        },
        {
          "name": "iTransfer",
          "url": "/go/itransfer"
        }
      ]
    },
    {
      "groupName": "Geek",
      "nodes": [
        {
          "name": "程序员",
          "url": "/go/programmer"
        },
        {
          "name": "Python",
          "url": "/go/python"
        },
        {
          "name": "Android",
          "url": "/go/android"
        },
        {
          "name": "宽带症候群",
          "url": "/go/bb"
        },
        {
          "name": "Linux",
          "url": "/go/linux"
        },
        {
          "name": "PHP",
          "url": "/go/php"
        },
        {
          "name": "云计算",
          "url": "/go/cloud"
        },
        {
          "name": "外包",
          "url": "/go/outsourcing"
        },
        {
          "name": "硬件",
          "url": "/go/hardware"
        },
        {
          "name": "Java",
          "url": "/go/java"
        },
        {
          "name": "Node.js",
          "url": "/go/nodejs"
        },
        {
          "name": "服务器",
          "url": "/go/server"
        },
        {
          "name": "Bitcoin",
          "url": "/go/bitcoin"
        },
        {
          "name": "MySQL",
          "url": "/go/mysql"
        },
        {
          "name": "编程",
          "url": "/go/programming"
        },
        {
          "name": "Linode",
          "url": "/go/linode"
        },
        {
          "name": "汽车",
          "url": "/go/car"
        },
        {
          "name": "设计师",
          "url": "/go/designer"
        },
        {
          "name": "Kindle",
          "url": "/go/kindle"
        },
        {
          "name": "Markdown",
          "url": "/go/markdown"
        },
        {
          "name": "MongoDB",
          "url": "/go/mongodb"
        },
        {
          "name": "Tornado",
          "url": "/go/tornado"
        },
        {
          "name": "Redis",
          "url": "/go/redis"
        },
        {
          "name": "Ruby on Rails",
          "url": "/go/ror"
        },
        {
          "name": "Minecraft",
          "url": "/go/minecraft"
        },
        {
          "name": "字体排印",
          "url": "/go/typography"
        },
        {
          "name": "商业模式",
          "url": "/go/business"
        },
        {
          "name": "Ruby",
          "url": "/go/ruby"
        },
        {
          "name": "数学",
          "url": "/go/math"
        },
        {
          "name": "Photoshop",
          "url": "/go/photoshop"
        },
        {
          "name": "Amazon",
          "url": "/go/amazon"
        },
        {
          "name": "自然语言处理",
          "url": "/go/nlp"
        },
        {
          "name": "LEGO",
          "url": "/go/lego"
        },
        {
          "name": "SONY",
          "url": "/go/sony"
        },
        {
          "name": "C#",
          "url": "/go/csharp"
        },
        {
          "name": "Serverless",
          "url": "/go/serverless"
        }
      ]
    },
    {
      "groupName": "游戏",
      "nodes": [
        {
          "name": "游戏",
          "url": "/go/games"
        },
        {
          "name": "Steam",
          "url": "/go/steam"
        },
        {
          "name": "PlayStation 4",
          "url": "/go/ps4"
        },
        {
          "name": "英雄联盟",
          "url": "/go/lol"
        },
        {
          "name": "iGame",
          "url": "/go/igame"
        },
        {
          "name": "Battlefield 3",
          "url": "/go/bf3"
        },
        {
          "name": "StarCraft 2",
          "url": "/go/sc2"
        },
        {
          "name": "PlayStation 3",
          "url": "/go/ps3"
        },
        {
          "name": "World of Warcraft",
          "url": "/go/wow"
        },
        {
          "name": "Nintendo Switch",
          "url": "/go/switch"
        },
        {
          "name": "EVE",
          "url": "/go/eve"
        },
        {
          "name": "Xbox 360",
          "url": "/go/xbox360"
        },
        {
          "name": "王者荣耀",
          "url": "/go/5v5"
        },
        {
          "name": "Battlefield 4",
          "url": "/go/bf4"
        },
        {
          "name": "Gran Turismo",
          "url": "/go/gt"
        },
        {
          "name": "Wii",
          "url": "/go/wii"
        },
        {
          "name": "Wii U",
          "url": "/go/wiiu"
        }
      ]
    },
    {
      "groupName": "Apple",
      "nodes": [
        {
          "name": "macOS",
          "url": "/go/macos"
        },
        {
          "name": "iPhone",
          "url": "/go/iphone"
        },
        {
          "name": "MacBook Pro",
          "url": "/go/mbp"
        },
        {
          "name": "iPad",
          "url": "/go/ipad"
        },
        {
          "name": "MacBook",
          "url": "/go/macbook"
        },
        {
          "name": "配件",
          "url": "/go/accessory"
        },
        {
          "name": "MacBook Air",
          "url": "/go/mba"
        },
        {
          "name": "iMac",
          "url": "/go/imac"
        },
        {
          "name": "Mac mini",
          "url": "/go/macmini"
        },
        {
          "name": "iPod",
          "url": "/go/ipod"
        },
        {
          "name": "Mac Pro",
          "url": "/go/macpro"
        },
        {
          "name": "MobileMe",
          "url": "/go/mobileme"
        },
        {
          "name": "iWork",
          "url": "/go/iwork"
        },
        {
          "name": "iLife",
          "url": "/go/ilife"
        },
        {
          "name": "GarageBand",
          "url": "/go/garageband"
        }
      ]
    },
    {
      "groupName": "生活",
      "nodes": [
        {
          "name": "二手交易",
          "url": "/go/all4all"
        },
        {
          "name": "酷工作",
          "url": "/go/jobs"
        },
        {
          "name": "天黑以后",
          "url": "/go/afterdark"
        },
        {
          "name": "免费赠送",
          "url": "/go/free"
        },
        {
          "name": "音乐",
          "url": "/go/music"
        },
        {
          "name": "电影",
          "url": "/go/movie"
        },
        {
          "name": "物物交换",
          "url": "/go/exchange"
        },
        {
          "name": "剧集",
          "url": "/go/tv"
        },
        {
          "name": "信用卡",
          "url": "/go/creditcard"
        },
        {
          "name": "团购",
          "url": "/go/tuan"
        },
        {
          "name": "投资",
          "url": "/go/invest"
        },
        {
          "name": "美酒与美食",
          "url": "/go/taste"
        },
        {
          "name": "旅行",
          "url": "/go/travel"
        },
        {
          "name": "阅读",
          "url": "/go/reading"
        },
        {
          "name": "摄影",
          "url": "/go/photograph"
        },
        {
          "name": "绿茵场",
          "url": "/go/soccer"
        },
        {
          "name": "Baby",
          "url": "/go/baby"
        },
        {
          "name": "宠物",
          "url": "/go/pet"
        },
        {
          "name": "咖啡",
          "url": "/go/coffee"
        },
        {
          "name": "乐活",
          "url": "/go/lohas"
        },
        {
          "name": "非诚勿扰",
          "url": "/go/love"
        },
        {
          "name": "骑行",
          "url": "/go/bike"
        },
        {
          "name": "日记",
          "url": "/go/diary"
        },
        {
          "name": "植物",
          "url": "/go/plant"
        },
        {
          "name": "蘑菇",
          "url": "/go/mushroom"
        },
        {
          "name": "行程控",
          "url": "/go/mileage"
        }
      ]
    },
    {
      "groupName": "Internet",
      "nodes": [
        {
          "name": "Google",
          "url": "/go/google"
        },
        {
          "name": "Twitter",
          "url": "/go/twitter"
        },
        {
          "name": "Coding",
          "url": "/go/coding"
        },
        {
          "name": "Facebook",
          "url": "/go/facebook"
        },
        {
          "name": "Wikipedia",
          "url": "/go/wikipedia"
        },
        {
          "name": "reddit",
          "url": "/go/reddit"
        }
      ]
    },
    {
      "groupName": "城市",
      "nodes": [
        {
          "name": "北京",
          "url": "/go/beijing"
        },
        {
          "name": "上海",
          "url": "/go/shanghai"
        },
        {
          "name": "深圳",
          "url": "/go/shenzhen"
        },
        {
          "name": "杭州",
          "url": "/go/hangzhou"
        },
        {
          "name": "成都",
          "url": "/go/chengdu"
        },
        {
          "name": "广州",
          "url": "/go/guangzhou"
        },
        {
          "name": "武汉",
          "url": "/go/wuhan"
        },
        {
          "name": "昆明",
          "url": "/go/kunming"
        },
        {
          "name": "天津",
          "url": "/go/tianjin"
        },
        {
          "name": "青岛",
          "url": "/go/qingdao"
        },
        {
          "name": "New York",
          "url": "/go/nyc"
        },
        {
          "name": "San Francisco",
          "url": "/go/sanfrancisco"
        },
        {
          "name": "Los Angeles",
          "url": "/go/la"
        },
        {
          "name": "Boston",
          "url": "/go/boston"
        }
      ]
    }
  ];

  res.json({
    success: true,
    data: nodesData
  });
};