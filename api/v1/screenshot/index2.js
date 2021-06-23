const request = require('request');
const { http } = require('app-libs');

module.exports = async (req, resp) => {
  const { url, width = 375, height = 2000, fullPage = false, delay = false, } = req.query;
  const res = await http.post({
    uri: 'https://cp82i7sfi4.execute-api.us-east-1.amazonaws.com/prod/capture',
    body: {
        "url": url,
        "devices": [{
            "vw": `${width}`,
            "vh": `${height}`,
            "name": "ios",
            "enabled": true
        }],
        "options": {
            "delay": delay,
            "fullPage": fullPage,
        }
    },
    json: true,
  });

  if (res.success) {
    const url = res.renders[0].image_url;

    request.get({
      url,
    }).pipe(resp);
  } else {
    resp.json({
      success: false,
    });
  }
};
