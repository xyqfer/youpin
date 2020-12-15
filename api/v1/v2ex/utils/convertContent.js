const cheerio = require('cheerio');
const url = require('url');

module.exports = (content) => {
    const id = 'vsrokjx';
    const at = [];

    const $ = cheerio.load(`<div id="${id}">${content}</div>`);
    $('a').each(function() {
        const $elem = $(this);
        let link = $elem.attr('href') || '';

        if (link === '') {
            return;
        }

        const reg = /^https:\/\/www\.v2ex\.com/;
        link = url.resolve('https://www.v2ex.com', link);
        const $children = $elem.children();

        if (!reg.test(link)) {
            if ($children.length === 1 && $children[0].tagName.toLowerCase() === 'img' && $children.attr('src') === link) {
                $elem.attr('href', '#');
            } else {
                $elem.addClass('external').attr('target', '_blank');
            }
        } else {
            $elem.attr('href', link.replace(reg, ''));
        }

        if (/^\/member\/.+/.test($elem.attr('href'))) {
            at.push($elem.text());
        }

        if (/\.png|jpg$/ig.test(link) && $children.length === 0) {
          $elem.after(`<p><img style="width: 100%;" referrerpolicy="no-referrer" src="${link}" /></p>`);
        }
    });

    $('img').each(function() {
      const $elem = $(this);
      const src = process.env.IMAGE_PROXY + encodeURIComponent($elem.attr('src'));
      $elem.attr('src', src);
    });

    return {
        at,
        content: $(`#${id}`).html(),
    };
};
