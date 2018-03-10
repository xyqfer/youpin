'use strict';

module.exports = () => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const { params } = require('app-lib');

    const pageCount = 3;
    const pageCountList = [];

    for (let i = 1; i <= pageCount; i++) {
        pageCountList.push(i);
    }

    return Promise.mapSeries(pageCountList, (page) => {
        return rp.get({
            uri: `https://h5.youzan.com/v2/showcase/tag?alias=lv78hovm&page=${page}`,
            headers: {
                'User-Agent': params.ua.pc
            }
        }).then((htmlString) => {
            try {
                const bookDetail = JSON.parse(htmlString.match(/var _showcase_components = (.+)} else {/)[1].trim().slice(0, -1));
                return bookDetail[1].goods;
            } catch (e) {
                return [];
            }
        }).catch((err) => {
            console.error(err);
            return [];
        });
    }).then((results) => {
        return flatten(results).map((item) => {
            return {
                name: item.title,
                url: item.url,
                cover: item.image_url,
                bookId: item.id
            };
        });
    }).catch((err) => {
        console.error(err);
        return [];
    });
};