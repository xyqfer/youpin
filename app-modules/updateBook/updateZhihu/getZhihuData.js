'use strict';

module.exports = async () => {
    const { params, http } = require('app-libs');

    try {
        const result = await http.get({
            uri: 'https://api.zhihu.com/books/features/new',
            json: true,
            headers: {
                'User-Agent': params.ua.pc,
            },
        });

        return result.data.map((book) => {
            const authors = book.authors.map((author) => author.name).join('、');

            return {
                name: book.title,
                url: book.url,
                cover: book.cover.replace(/_.+\.jpg/g, '.jpg'),
                pubInfo: authors,
                desc: book.description,
            };
        });
    } catch (err) {
        console.error(err);
        return [];
    }
};
