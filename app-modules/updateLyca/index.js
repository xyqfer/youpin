'use strict';

module.exports = async () => {
  const {
    mail: sendMail
  } = require('app-libs');

  try {
    const title = '刷新 Lyca 啦~';

    sendMail({
      title,
      data: [{}],
      template: () => {
        return title;
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