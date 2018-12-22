'use strict';

module.exports = async () => {
  const Parser = require('rss-parser');
  const {
    mail: sendMail
  } = require('app-libs');
  let parser = new Parser();

  try {
    const feed = await parser.parseURL('https://rsshub.avosapps.us/eudic/ting/b1d68e28-9a54-4af8-8caa-b149cac8a31d?limit=1');
    const data = feed.items.map(item => {
      return {
        title: item.title,
        url: item.link,
      };
    });

    sendMail({
      title: '看经济学人啦~',
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