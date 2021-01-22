const http = require('../http');

function encodeUrl(fullUrl) {
  const url = new URL(fullUrl);
  return url.origin + url.pathname + encodeURIComponent(url.search) + encodeURIComponent(url.hash);
}

function createScreenshotUrls(url) {
  const width = 375;
  const height = 2000;
  const url1 = 'https://render-tron.appspot.com/screenshot/' + encodeUrl(url) + `?width=${width}&height=${height}`;
  const url2 = `${process.env.hostName}/api/v1/screenshot?url=${encodeURIComponent(url)}&width=${width}&height=${height}`;
  const url3 = process.env.SCREENSHOT_URL2 + encodeUrl(url) + `?width=${width}&height=${height}`;
  const url4 = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot&embed=screenshot.url&fullPage`;
  const url5 = process.env.SCREENSHOT_URL + encodeUrl(url) + `?width=${width}&height=${height}`;

  return [
    url1,
    url2,
    url3,
    url4,
    url5,
  ];
}

module.exports = async (urls, tag = '') => {
  await Promise.each(urls, async (url) => {
    const screenshotUrls = createScreenshotUrls(url);

    for (let item of screenshotUrls) {
      try {
        const resp = await http.get({
            uri: item,
            headers: {
                'Content-Type': 'image/png'
            },
            resolveWithFullResponse: true,
            encoding: null
        });

        await http.post({
            uri: `${process.env.CF_KV}${encodeURIComponent(url)}`,
            body: resp.body,
            headers: {
                'Content-Type': 'image/png'
            }
        });

        break;
      } catch(err) {
        console.error(url);
      }
    }
  });

  const text = `${tag} 预加载完成`;
  http.get(`https://api.day.app/${process.env.device1}/${encodeURIComponent(text)}`);
};