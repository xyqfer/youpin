'use strict';

module.exports = async (req, res) => {
  const id = req.params.id;
  const {
    params,
    http,
  } = require('app-libs');
  const getMenuDetail = async (id) => {
    const result = await http.post({
      json: true,
      uri: 'https://tv.daydaycook.com.cn/top-content/view',
      headers: {
        'User-Agent': params.ua.pc,
      },
      body: { "uid": "", "version": "6.2.0", "regionCode": "156", "userUniqueId": "", "deviceId": "00000000-0000-0000-0000-000000000000", "deviceType": "1", "businessCategoryId": "2", "mainland": "1", "contentId": id, "ip": "192.168.31.105", "languageId": "3", "sessionId": "", "showTag": "1" }
    });
    let data = {
      summary: '',
    };

    data.summary += result.data.contentDetailList.reduce((acc, item) => {
      acc += `
          <strong>${item.groupTitle} - ${item.detail}</strong>
          <img src="${item.image}" referrerpolicy="no-referrer">
          <br>
      `;
      return acc;
    }, '');

    data.summary += result.data.contentFoodList.reduce((acc, item) => {
      acc += `
          <div>${item.name}${item.count}</div>
      `;
      return acc;
    }, '');

    return data;
  };

  const data = await getMenuDetail(id);

  res.json({
    success: true,
    data,
  })
};