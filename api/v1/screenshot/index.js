const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { url, width, height } = req.params;
    const code = `
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('http://example.com');
      await page.screenshot({path: 'example.png'});
      await browser.close();
    `;
    const options = {
      method: 'POST',
      uri: 'https://backend-dot-try-puppeteer.appspot.com/run',
      formData: {
          file: {
              value: Buffer.from(code),
              options: {
                  filename: '1.js',
                  contentType: 'text/javascript'
              }
          }
      },
      json: true,
    };

    const resp = await http(options);
    res.set('Content-Type', 'image/png');
    res.send(Buffer.from(resp.result.buffer.data));
};
