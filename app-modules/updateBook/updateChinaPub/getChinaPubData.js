const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const uniqBy = require('lodash/uniqBy');
const { http } = require('app-libs');

module.exports = async () => {
    try {
        const htmlString = await http.get({
            uri: 'http://www.china-pub.com/xinshu/',
            encoding: null,
        });
        const $ = cheerio.load(iconv.decode(htmlString, 'gb2312'));
        const targetUrlList = [];
        const bookList = [];

        $('.nb_sec1').each(function() {
          const url = $(this).find('.nb_sec1_left h1 a').attr('href');

          if (url) {
            targetUrlList.push(url);
          } else {
            $(this).find('.tabct').eq(0).find('ul > li').each(function() {
              const $link = $(this).find('.pname > a');

              bookList.push({
                name: $link.text(),
                url: $link.attr('href'),
              });
            });
          }
        });

        const result = await Promise.map(targetUrlList, async (url) => {
            try {
                return await http.get({
                    uri: url,
                    encoding: null,
                });
            } catch (err) {
                console.error(err);
                return null;
            }
        });

        result.forEach((htmlString) => {
            /* eslint-disable eqeqeq */
            if (htmlString != null) {
                const $ = cheerio.load(iconv.decode(htmlString, 'gb2312'));

                $('.bookshow').each(function() {
                    bookList.push({
                        name: $(this)
                            .find('.bookName a')
                            .attr('title'),
                        url: $(this)
                            .find('.bookName a')
                            .attr('href'),
                    });
                });
            }
        });

        return uniqBy(bookList, 'url');
    } catch (err) {
        console.error(err);
        return [];
    }
};
