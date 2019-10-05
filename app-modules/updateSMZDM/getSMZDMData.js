'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const {
        params
    } = require('app-libs');

    const results = await Promise.mapSeries([1, 2, 3], async (offset) => {
        try {
            const htmlString = await rp.get({
                uri: `https://news.m.smzdm.com//ajax_get_list_html//${offset}`,
                headers: {
                    'User-Agent': params.ua.mobile
                }
            });

            const $ = cheerio.load(htmlString);
            const newsList = [];

            $('body > li').each(function () {
                const $elem = $(this);

                newsList.push({
                    title: $elem.find('h2').text(),
                    url: `https:${$elem.find('.openApp').attr('href')}`,
                    cover: $elem.find('.image > img').attr('src'),
                    desc: $elem.find('p').text()
                });
            });

            return newsList;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    const postHtmlString = await rp.get({
        uri: 'https://post.m.smzdm.com/',
        headers: {
            'User-Agent': params.ua.mobile
        }
    });

    const $ = cheerio.load(postHtmlString);

    $('#J_scroll_ul > .card-group-list').each(function () {
        const $elem = $(this);

        results.push({
            title: $elem.find('.zm-card-title').text(),
            url: `https:${$elem.find('a').attr('href')}`,
            cover: $elem.find('.zm-card-media > img').attr('src'),
            desc: ''
        });
    });

    let timesort = $('#J_scroll_ul > .card-group-list').last().attr('timesort');

    for (let i = 1; i <= 5; i++) {
        const postData = await rp.get({
            json: true,
            uri: `https://post.m.smzdm.com/ajax_get_list_html/?timesort=${timesort}`,
            headers: {
                'User-Agent': params.ua.mobile
            }
        });

        postData.data.forEach((item) => {
            results.push({
                title: item.article_title,
                url: `https:${item.article_url}`,
                cover: item.article_pic,
                desc: item.article_region_title
            });
        });

        timesort = postData.data[postData.data.length - 1].time_sort;
    }

    return uniqBy(flatten(results), 'url').map((item) => {
        item.title = item.title.replace(/#/g, '');

        return item;
    });
};