'use strict';

module.exports = async () => {
  const {
    mail: sendMail
  } = require('app-libs');

  try {
    const title = 'Initium有更新~';
    let data = [{
      title: '每日简报',
      url: `${process.env.proxyUrl}https://theinitium.com`,
    }];

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
      },
      device: 'device2',
      open: 'safari',
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