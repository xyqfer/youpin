'use strict';

module.exports = async () => {
    const { params, http } = require('app-libs');

    try {
        const result = await http.get({
            json: true,
            uri: 'http://ptpress.com.cn/bookinfo/getBookListForWSNewBook?rows=20&page=1&searchStr=',
            headers: {
                'User-Agent': params.ua.pc,
            },
        });

        return result.data.data.map((item) => ({
            title: item.bookName,
            url: `http://ptpress.com.cn/shopping/buy?bookId=${item.bookId}`,
            cover: item.picPath,
        }));
    } catch (err) {
        console.error(err);
        return [];
    }
};
