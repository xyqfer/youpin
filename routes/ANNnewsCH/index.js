const Parser = require('rss-parser');
const parser = new Parser();

module.exports = async (req, res) => {
    const feed = await parser.parseURL(process.env.ANNnewsCH_rss);
    const content = feed.items.slice(0, 5).reduce((acc, item) => {
        acc += `
            <div style="margin-bottom: 30px">
                <div>${item.title}</div>
                <div>
                    <video controls webkit-playsinline playsinline src="${item.enclosure.url}"></video>
                </div>
                <div style="margin-top: 20px">
                    ${item.content}
                </div>
            </div>
        `;

        return acc;
    }, '');

    res.render('archive', {
        title: 'ANNnewsCH',
        content,
    });
};