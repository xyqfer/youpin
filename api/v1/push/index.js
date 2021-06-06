const { v4: uuidv4 } = require('uuid');
const { mail: sendMail } = require('app-libs');
const { saveDbData } = require('app-libs/db')

module.exports = async (req, res) => {
  const { token, title = '' } = req.query;
  const newData = req.body.data;

  if (token !== process.env.PUSH_TOKEN) {
    res.status(400).send('Bad Request');
    return;
  }

  try {
    const uuid = uuidv4();
    const template = ({ url = '', title = '' }) => `
      <div style="margin-bottom: 50px">
          <a href="${url}" target="_blank">
              <h4>${title}</h4>
          </a>
      </div>
    `;
    const content = newData.map(template).join('');

    await saveDbData({
        dbName: 'Archive',
        data: [
            {
                uuid,
                title,
                content,
            },
        ],
    });

    sendMail({
      title,
      data: newData,
      template,
    });
  } catch(err) {
    console.error('push err');
    console.error(err);
  }

  res.json({
    success: true,
  });
};
