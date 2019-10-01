'use strict';

const Promise = require('bluebird');
const flatten = require('lodash/flatten');
const cheerio = require('cheerio');
const {
    params,
    http,
} = require('app-libs');

module.exports = async () => {
    const ua = params.ua.pc;
    const user = 'newswebeasy';
    const repo = 'news';
    const commitsList = await http.get({
        uri: `https://api.github.com/repos/${user}/${repo}/commits`,
        qs: {
            sha: 'master',
            path: '/data',
        },
        json: true,
        headers: {
            'User-Agent': ua,
        },
    });
    const { url: commitUrl } = commitsList.find(({ commit }) => {
        return commit.message.includes('calendar.json');
    });

    const commitInfo = await http.get({
        uri: commitUrl,
        json: true,
        headers: {
            'User-Agent': ua,
        },
    });
    const fileName = commitInfo.files[0].filename;

    const WEB_HOST = 'https://newswebeasy.github.io/news/';
    const [ , year, month ] = fileName.match(/data\/(\d+?)\/(\d+?)\//);

    const calendarData = await http.get({
        uri: `${WEB_HOST}${fileName}`,
        json: true,
        headers: {
            'User-Agent': ua,
        },
    });
    const orderDateList = Object.entries(calendarData.dates).sort(([ dateA ], [ dateB ]) => {
        return parseInt(dateA) - parseInt(dateB)
    }).reverse();
    const dateList = [];
    const limit = 5;
    
    for (let i = 0; i < orderDateList.length; i++) {
        const [ date, dateInfo ] = orderDateList[i];

        if (dateInfo.web) {
            dateList.push(`${year}/${month}/${date}/`);
        }

        if (dateList.length >= limit) {
            break;
        }
    }

    const result = await Promise.mapSeries(dateList, async (date) => {
        const htmlString = await http.get({
            uri: `${WEB_HOST}web/${date}`,
            headers: {
                'User-Agent': ua,
            },
        });
        const $ = cheerio.load(htmlString);
        const linkList = $('.summary').map(function() {
            const $link = $(this).find('.title > a');

            return {
                title: $link.text(),
                link: $link.attr('href'),
            };
        }).get();

        return linkList;
    });

    return flatten(result);
};