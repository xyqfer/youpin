'use strict';

module.exports = async () => {
  const {
    mail: sendMail
  } = require('app-libs');

  try {
    const title = '刷书啦~';
    let data = [{
      url: 'life1389://topic?topic_id=6612888851461439758&tab=1',
      title,
    }, {
      title: '领蚂蚁积分啦~',
      url: 'alipays://platformapi/startapp?appId=20000160',
    }, {
      title: '签到~',
      url: 'mnw://',
    }];
    const now = new Date();
    if (now.getDate() === 26) {
      data.push({
        title: '燃气费',
        url: 'alipays://platformapi/startapp?appId=20000193'
      });
    }

    sendMail({
      title,
      data,
      template: ({ url = '', title = '' }) => {
        return `
            <div style="margin-bottom: 50px">
                <a href="${url}" target="_blank">
                    <h4>${title}</h4>
                </a>
            </div>
        `;
      }
    });

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