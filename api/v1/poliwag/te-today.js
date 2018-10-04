'use strict';

module.exports = (req, res) => {
  const http = require('./utils/http');
  const { params } = require('app-libs');

  http.get({
    json: true,
    uri: 'https://www.economist.com/graphql?query=query%20Home(%24path_0%3AString!)%20%7Bcontent(path%3A%24path_0)%20%7B...F6%7D%7D%20fragment%20F0%20on%20XRef%20%7Btitle%2Cchildren%20%7Bentries%20%7Bid%2Ctitle%2CflyTitle%2CwebURL%7D%7D%2Cid%7D%20fragment%20F1%20on%20XRef%20%7BwebURL%2Ctitle%2CflyTitle%2CmainImageObj%20%7Bpath%7D%2CdateCreatedTimeAgo%2Cinternal%2Cparent%20%7Btitle%2Cid%7D%2Cid%7D%20fragment%20F2%20on%20XRef%20%7Btitle%2Cid%2CoriginalID%2Cchildren%20%7Bentries%20%7Bid%2CoriginalID%2Ctitle%2CwebURL%2C...F1%7D%7D%7D%20fragment%20F3%20on%20XRef%20%7Bid%2CoriginalID%2CwebURL%2Ctitle%2CflyTitle%2Cteaser%2Crubric%2CmainImageObj%20%7Bpath%7D%2CpromoImage%20%7Bpath%7D%2CdateCreated%2CdateCreatedString%2CprintEdition%2Cinternal%2Ctype%2Cparent%20%7Btitle%2CwebURL%2Ctype%2Ctopic%2Cslug%2Cid%7D%7D%20fragment%20F4%20on%20XRef%20%7Bid%2CdateModifiedString%2Ctitle%2Cchildren%20%7Bentries%20%7Bid%2CoriginalID%2CflyTitle%2CmainImageObj%20%7Bpath%7D%2Ctitle%2CwebURL%2Cparent%20%7Btitle%2CwebURL%2Ctype%2Cid%7D%2Cinternal%2CdateCreatedTimeAgo%2C...F3%7D%7D%7D%20fragment%20F5%20on%20XRef%20%7Bid%2CdateModifiedString%2Ctitle%2Cchildren%20%7Bentries%20%7BflyTitle%2CmainImageObj%20%7Bpath%7D%2Ctitle%2CwebURL%2Cinternal%2Cparent%20%7Btitle%2CwebURL%2Ctype%2Cid%7D%2CdateCreatedTimeAgo%2Cid%2C...F3%7D%7D%7D%20fragment%20F6%20on%20XRef%20%7Bchildren%20%7Bentries%20%7Btitle%2Cid%2CoriginalID%2CwebURL%2Ctype%2Cchildren%20%7Bentries%20%7BoriginalID%2Cid%7D%7D%2C...F0%2C...F2%2C...F4%2C...F5%7D%7D%2Cid%7D&version=v1&variables=%7B%22path_0%22%3A%22%2Fnode%2F21715232%22%7D',
    headers: {
      'User-Agent': params.ua.pc,
    },
  }).then((result) => {
    let data = result.data.content.children.entries[0].children.entries.map((item) => {
      return {
        title: item.title,
        flyTitle: item.flyTitle,
        url: item.webURL,
        img: item.mainImageObj.path,
        summary: item.teaser,
        rubric: item.rubric
      };
    });

    res.json({
      success: true,
      data,
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'te-today 获取失败',
    });
  });
};