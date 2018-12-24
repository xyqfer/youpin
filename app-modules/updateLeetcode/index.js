'use strict';

module.exports = async () => {
  const {
    mail: sendMail,
    http,
    db,
  } = require('app-libs');

  try {
    // 周一至周五中午发提醒
    const today = new Date();
    const needSend = today.getHours() === 12 && today.getMinutes() <= 15 
      && (today.getDay() >= 1 && today.getDay() <= 5);

    if (needSend) {
      const url = 'https://leetcode-cn.com/api/problems/all/';
      const dbName = 'ArticleFragment';
      const [articleInfo] = await db.getDbData({
        dbName,
        limit: 1,
        query: {
          equalTo: ['url', url]
        }
      });
      const questionList = await http.get({
        uri: url,
        json: true,
      });
      const day = questionList.stat_status_pairs.length;

      if (articleInfo && articleInfo.count < day) {
        const { count, objectId } = articleInfo;
        const question = questionList.stat_status_pairs.reverse()[count];
        const questionUrl = `https://leetcode-cn.com/problems/${question.stat.question__title_slug}`;
        const title = question.stat.question__title;

        await sendMail({
          title: '今天要刷 Leetcode 啦~',
          data: [{
            url: questionUrl,
            title,
            content: `${count + 1} / ${day}`,
          }],
          template: ({ url = '', title = '', content = '' }) => {
            return `
            <div style="margin-bottom: 50px">
                <a href="${url}" target="_blank">
                    <h4>${title}</h4>
                </a>
                <p>${content}</p>
            </div>
        `;
          }
        });

        db.updateDbData({
          dbName,
          id: objectId,
          data: {
            url,
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