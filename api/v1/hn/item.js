const { http, crawler, translate } = require('app-libs');

module.exports = async (req, res) => {
    const { id } = req.query;

    try {
        const [ itemInfo, $ ] = await Promise.all([
            http.get({
                uri: `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
                json: true,
            }),
            crawler(`https://news.ycombinator.com/item?id=${id}`),
        ]);

        const $comments = $('.comment-tree .athing.comtr');
        let comments = $comments.map(function() {
            const $comment = $(this);
            const id = parseInt($comment.attr('id'));
            const author = $comment.find('.comhead > .hnuser').text();
            const indent = parseInt($comment.find('.ind > img').attr('width'));
            
            $comment.find('.comment .reply').remove();
            $comment.find('.comment a').each(function() {
                const $link = $(this);
                const urlObject = new URL($link.attr('href'));

                if (urlObject.host === 'news.ycombinator.com' &&
                    urlObject.pathname === '/item' &&
                    urlObject.searchParams.get('id')) {
                    $link.attr('href', `/item/${urlObject.searchParams.get('id')}`);
                } else {
                    $link.addClass('external').attr('target', '_blank');
                }
            });
            const text = $comment.find('.comment').html();
            
            return {
                id,
                author,
                indent,
                text,
                parent: 0,
            };
        }).get().filter(({ indent }) => {
            return indent === 0;
        });

        const originalText = comments.map((item) => {
          return item.text;
        });
        const translatedText = await translate({
          q: originalText
        });
        comments.map((item, index) => {
          item.text = translatedText[index];
          return item;
        });

        let link = $('.storylink').attr('href');
        if (!link) link = $('.comhead .storyon a').attr('href');
        if (link.startsWith('item?')) link = 'https://news.ycombinator.com/' + link;

        let title = itemInfo.title;
        if (!title) title = $('.comhead .storyon a').text();

        const data = {
            id,
            author: itemInfo.by,
            title,
            text: itemInfo.text,
            comments,
            link,
        };

        res.json({
            success: true,
            data,
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            msg: `hn item ${id} 获取失败`,
        });
    }
};
