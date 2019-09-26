const { http, params, } = require('app-libs');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    const { userId, articleId, } = req.params;
    const htmlString = await http.get({
        uri: `http://lang-8.com/${userId}/journals/${articleId}`,
        headers: {
            'User-Agent': params.ua.pc,
        },
    });
    const $ = cheerio.load(htmlString);
    const title = $('#subject_show').text();
    let zhContent = $('#body_show_ori').text().split('\n').filter((item) => {
        return item !== '';
    });
    zhContent = [title].concat(zhContent);
    const jpCotent = $('#body_show_mo').text().split('\n').filter((item) => {
        return item !== '';
    });

    const content = jpCotent
        .reduce((acc, item, index) => {
            acc += `
                <div style="margin-bottom: 30px">
                    <div style="margin-bottom: 10px">
                        ${item}
                    </div>
                    <div>
                        ${zhContent[index]}
                    </div>
                </div>
            `;

            return acc;
        }, '');

    res.render('archive', {
        title,
        content,
    });
};