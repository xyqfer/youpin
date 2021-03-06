const { http, params } = require('app-libs');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    const { userId, articleId } = req.params;
    const isValidItem = (item) => item !== '' && item !== '\n';
    const htmlString = await http.get({
        uri: `http://lang-8.com/${userId}/journals/${articleId}`,
        headers: {
            'User-Agent': params.ua.pc,
        },
    });
    const $ = cheerio.load(htmlString);
    const title = $('#subject_show').text();
    let zhContent = $('#body_show_ori')
        .html()
        .split('<br>')
        .filter(isValidItem);
    zhContent = [title].concat(zhContent);
    const jpCotent = $('#body_show_mo')
        .html()
        .split('<br>')
        .filter(isValidItem);

    let content = jpCotent.reduce((acc, item, index) => {
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

    content += `
        <script>
            const height = window.innerHeight;
            const div = document.createElement('div');
            div.style.height = height + 'px';
            document.body.appendChild(div);
        </script>;
    `;

    res.render('archive', {
        title,
        content,
    });
};
