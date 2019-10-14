module.exports = (req, res) => {
    const cheerio = require('cheerio');
    const { id = 0 } = req.params;
    const { sort = 'default', page = 1 } = req.query;
    const { params, http } = require('app-libs');
    const limit = 10;
    const include = `data[*].content&limit=${limit}&offset=${limit * (page - 1)}`;

    const url = `https://www.zhihu.com/api/v4/questions/${id}/answers?include=${include}&sort_by=${sort}`;
    http.get({
        json: true,
        uri: url,
        headers: {
            'User-Agent': params.ua.pc,
            Referer: `https://www.zhihu.com/question/${id}`,
        },
    })
        .then((resp) => {
            res.json({
                success: true,
                data: resp.data
                    .map(({ content }) => {
                        let html = '';
                        const $ = cheerio.load(content, {
                            xmlMode: true,
                        });

                        $('img').each(function() {
                            const src = $(this).attr('src');

                            if (src.startsWith('https://') || src.startsWith('http://')) {
                                html += `<img referrerpolicy="no-referrer" src="${$(this).attr('src')}">`;
                            }
                        });
                        // $('.video-box').each(function() {
                        //   html += `<iframe frameborder="0" allowfullscreen="" src="${$(this).attr('href')}"></iframe>`;
                        // });

                        return {
                            content: html,
                        };
                    })
                    .filter(({ content }) => content !== ''),
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: `zhihu question ${id} 获取失败`,
            });
        });
};
