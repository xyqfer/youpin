'use strict';

module.exports = async (req, res) => {
  const { id } = req.params;
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
    const steps = result.data.contentDetailList.map((item) => {
      return {
        title: item.groupTitle,
        desc: item.detail,
        img: item.image,
      };
    });
    const ingredients = result.data.contentFoodList.map(({ name, count }) => {
      return {
        name,
        count,
      };
    });

    return {
      steps,
      ingredients,
    };
  };

  const data = await getMenuDetail(id);

  res.json({
    success: true,
    data,
  })
};