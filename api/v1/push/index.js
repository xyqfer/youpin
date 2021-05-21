const { mail: sendMail } = require('app-libs');

module.exports = async (req, res) => {
  const { token, title = '' } = req.query;
  const newData = req.body.data;

  if (token !== process.env.PUSH_TOKEN) {
    res.status(400).send('Bad Request');
    return;
  }

  try {
    sendMail({
      title,
      data: newData,
      template: ({ url = '', title = '' }) => `
        <div style="margin-bottom: 50px">
            <a href="${url}" target="_blank">
                <h4>${title}</h4>
            </a>
        </div>
      `,
    });
  } catch(err) {
    console.error('push err');
    console.error(err);
  }

  res.json({
    success: true,
  });
};
