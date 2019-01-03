'use strict';

module.exports = async () => {
  const {
    mail: sendMail
  } = require('app-libs');

  try {
    sendMail({
      title: '刷书啦~',
      data: [{
        url: 'life1389://topic?topic_id=6612888851461439758&tab=1',
        title,
      }],
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