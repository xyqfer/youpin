const rp = require('request-promise').defaults({
    jar: true,
});

const getData = async (name, page = 1) => {
    return await rp.get({
        uri: `https://api.theinitium.com/api/v1/channel/articles/?language=zh-hans&page=${page}&slug=${name}`,
        headers: {
            'X-Client-Name': 'Web',
            'Authorization': `Basic ${process.env.THEINITIUM_TOKEN}`,
        },
        json: true,
    });
};

module.exports = async (req, res) => {
    const { name } = req.params;

    await rp.get({
        uri: `https://theinitium.com/channel/${name}`,
    });

    let data = await getData(name);
    const totalPages = Math.floor(data.count / data.digests.length);
    const page = Math.floor(totalPages * Math.random());
    data = await getData(name, page);

    const content = data.digests.reduce((acc, { article }) => {
        const img = process.env.IMAGE_PROXY + encodeURIComponent(article.preview.web.url);
        const time = article.date || '';

        acc += `
            <div style="margin-bottom: 30px">
                <a href="/api/v1/theinitium/article?slug=${article.slug}" target="_blank">
                    <h4>${article.headline}</h4>
                </a>
                <div>
                    <img referrerpolicy="no-referrer" src="${img}">
                    <br>
                    ${time}
                    <br>
                    ${article.lead}
                </div>
            </div>
        `;
        return acc;
    }, '');

    res.render('archive', {
        title: `${name} - P${page}`,
        content,
    });
};
