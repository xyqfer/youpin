const got = require('got');
const { mail: sendMail } = require('app-libs');

const getUrls = async () => {
    const SITEMAP_URL = 'https://developer.mozilla.org/sitemaps/en-US/sitemap.xml';
    const WEB_PATH = 'https://developer.mozilla.org/en-US/docs/Web';
    const SITEMAP_URL_REGEX = /<loc>(.*?)<\/loc>/g;
    const onlyAllowWebUrls = url => url.startsWith(WEB_PATH);
    const { body: sitemap } = await got(SITEMAP_URL);
    const allDocUrls = [];

    let match;
    while ((match = SITEMAP_URL_REGEX.exec(sitemap))) {
        allDocUrls.push(match[1]);
    }

    const webDocUrls = allDocUrls.filter(onlyAllowWebUrls);
    const result = [];

    for (let i = 0; i < 3; i++) {
        const item = webDocUrls[Math.floor(webDocUrls.length * Math.random())];
        result.push({
            url: item,
            title: item.replace(WEB_PATH, ''),
        });
    }

    return result;
};

module.exports = async () => {
    try {
        const title = 'Random MDN';
        const data = await getUrls();

        sendMail({
            title,
            data,
            template: ({ url = '', title = '' }) => `
                <div style="margin-bottom: 50px">
                    <a href="${url}" target="_blank">
                        <h4>${title}</h4>
                    </a>
                </div>
            `,
            device: 'device2',
        });

        return {
            success: true,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};


