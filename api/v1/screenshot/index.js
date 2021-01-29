const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { url, width, height, fullPage = false } = req.query;
    const code = `
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({ width: ${width}, height: ${height}, });
      await page.goto('${url}');
      await page.screenshot({path: 'example${Date.now()}.png', fullPage: ${fullPage}});
      await browser.close();
    `;
    const options = {
      method: 'POST',
      uri: 'https://backend-dot-try-puppeteer.appspot.com/run',
      formData: {
          file: {
              value: Buffer.from(code),
              options: {
                  filename: `1-${Date.now()}.js`,
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
