'use strict';

module.exports = async () => {
  const {
    mail: sendMail,
    http,
    db,
  } = require('app-libs');
  const cheerio = require('cheerio');

  try {
    const url = 'https://res.wokanxing.info/jpgramma/index.html';
    const dbName = 'ArticleFragment';
    const [articleInfo] = await db.getDbData({
      dbName,
      limit: 1,
      query: {
        equalTo: ['url', url]
      }
    });

    if (articleInfo) {
      const { count, objectId } = articleInfo;
      const htmlString = await http.get({
        uri: url,
      });
      const $ = cheerio.load(htmlString);
      const $content = $('ol > li').slice(2).find('ul > li > a');
      const length = $content.length;

      if (count < length) {
        const $link = $content.eq(count);
        const title = $link.text();
        const url = 'http://res.wokanxing.info/jpgramma/' + $link.attr('href');

        await sendMail({
          title: '要刷JP啦',
          data: [{
            url,
            title,
          }],
          template: ({ url = '', title = '', }) => {
            return `
            <div style="margin-bottom: 50px">
                <a href="${url}" target="_blank">
                    <h4>${title}</h4>
                </a>
                <div>${count + 1} / ${length}</div>
            </div>
        `;
          }
        });

        db.updateDbData({
          dbName,
          id: objectId,
          data: {
            count: count + 1
          }
        });
      }
    }

    return {
      success: true
    };
  } catch (err) {
    console.error(err);
    return {
      success: false
    };
  }
};