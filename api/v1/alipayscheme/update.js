'use strict';

module.exports = async (req, res) => {
  const {
    db: {
      getDbData,
      updateDbData,
    },
    mail: sendMail
  } = require('app-libs');
  const dbName = 'ipa';
  const { ver, token, data } = req.body;

  if (token !== process.env.UPDATE_IPA_INFO_TOKEN) {
    res.json({
      success: false,
      data: {},
    });
    return;
  }

  try {
    const [dbData] = await getDbData({
      dbName,
      limit: 1,
      query: {
        equalTo: ['name', 'Alipay']
      }
    });

    updateDbData({
      dbName,
      data: {
        info: data,
        ver,
      },
      id: dbData.objectId
    });

    sendMail({
      title: 'Alipay Schemes 有更新~',
      data: [{}],
      template: () => {
        return `
          <div style="margin-bottom: 50px">
              <a href="https://ibdkopi6vn.avosapps.us/alipayschemes" target="_blank">
                  <h4>版本${ver}</h4>
              </a>
          </div>
        `;
      }
    });

    res.json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      data: {},
    });
  }
};