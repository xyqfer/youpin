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
  const url6 = process.env.STATELESS_SERVER + `/api/v1/screenshot2?url=${encodeURIComponent(url)}&width=${width}&height=${height}`;

  return [
    url2,
    url1,
    url5,
    url6,
    url3,
    url4,
  ];
}

module.exports = async (urls, tag = '') => {
  const log = [];

  await Promise.each(urls, async (url) => {
    const screenshotUrls = createScreenshotUrls(url);
    let i = 0;

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

        if (!log[i]) log[i] = 0;
        log[i]++;

        break;
      } catch(err) {
        console.error(`${url} ${i}`);
      }

      i++;
    }
  });

  const text = `${tag} 预加载完成 / ${urls.length}条消息 / ${log.toString()}`;
  http.get(`https://api.day.app/${process.env.device1}/${encodeURIComponent(text)}`);
};