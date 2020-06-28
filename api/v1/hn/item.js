const { http, crawler } = require('app-libs');

module.exports = async (req, res) => {
    const { id } = req.query;

    try {
        const itemInfo = await http.get({
            uri: `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
            json: true,
        });
        const $ = await crawler(`https://news.ycombinator.com/item?id=${id}`);

        const $comments = $('.comment-tree .athing.comtr');
        let comments = $comments.map(function() {
            const $comment = $(this);
            const id = parseInt($comment.attr('id'));
            const author = $comment.find('.comhead > .hnuser').text();
            const indent = parseInt($comment.find('.ind > img').attr('width'));
            
            $comment.find('.comment .reply').remove();
            const text = $comment.find('.comment').html();
            
            return {
                id,
                author,
                indent,
                text,
            };
        }).get();
        const getParent = (indent, index) => {
            if (indent === 0) {
                return 0;
            }

            for (let i = index - 1; i >= 0; i--) {
                if (indent - comments[i].indent === 40) {
                    return comments[i].id;
                }
            }

            return 0;
        };

        comments.forEach((comment, index) => {
            comment.parent = getParent(comment.indent, index);
        });
        comments.sort((a, b) => {
            return a.id - b.id;
        });

        const data = {
            id,
            author: itemInfo.by,
            title: itemInfo.title,
            text: itemInfo.text,
            comments,
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
