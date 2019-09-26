const { http, params, } = require('app-libs');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    const { id } = req.params;
    let { page = 1 } = req.query;
    page = parseInt(page);
    const htmlString = await http.get({
        uri: `http://lang-8.com/${id}/journals?page=${page}`,
        headers: {
            'User-Agent': params.ua.pc,
        },
    });
    const $ = cheerio.load(htmlString);
    let content = $('.journals_flex')
        .map((index, elem) => {
            elem = $(elem);
            const $link = elem.find('.journal_title > a');
            const title = $link.text();
            const link = $link.attr('href');
            const paths = link.split('/');
            const articleId = paths[paths.length - 1];
            const description = elem.find('.journal_body').text();

            return {
                title,
                articleId,
                description,
            };
        })
        .get()
        .reduce((acc, item) => {
            acc += `
                <div style="margin-bottom: 30px">
                    <a href="/lang-8/article/${id}/${item.articleId}" target="_blank">
                        <h4>${item.title}</h4>
                    </a>
                    <div>
                        ${item.description}
                    </div>
                </div>
            `;

            return acc;
        }, '');

    if (page > 1) {
        content += `
            <div><a href='/lang-8/journals/${id}?page=${page - 1}'>上一页</a></div> <br />
        `;
    }

    content += `
        <div><a href='/lang-8/journals/${id}?page=${page + 1}'>下一页</a></div> <br />
    `;


    res.render('archive', {
        title: `${id}-journals`,
        content,
    });
};