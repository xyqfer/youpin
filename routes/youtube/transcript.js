const { getSubtitles } = require('youtube-captions-scraper');

module.exports = async (req, res) => {
    const { lang, v } = req.query;
    const captions = await getSubtitles({
        videoID: v,
        lang,
    });

    const content = captions.reduce((acc, item) => {
        acc += `
                <div style="margin-bottom: 20px">
                    <div>
                        ${item.start}
                    </div>
                    <div style="margin-top: 10px">
                        ${item.text}
                    </div>
                </div>
            `;

        return acc;
    }, '');

    res.render('archive', {
        title: `${v}-transcript`,
        content,
    });
};
