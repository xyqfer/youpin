const moment = require('moment');
const axios = require('axios');
const cheerio = require('cheerio');
const Parser = require('rss-parser');
const { params } = require('app-libs')
const parser = new Parser({
  headers: {
    'User-Agent': params.ua.pc
  },
});

function extractData({content, link}) {
    const $ = cheerio.load(content, null, false);

    const $date = $('.tweet-date > a');
    const date = $date.attr('title');
    $date.text(moment(date, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'));

    const $fullname = $('.fullname').eq(0);
    const $username = $('.username').eq(0);
    const fullname = $fullname.attr('title');
    const username = $username.attr('title');

    $('.fullname').addClass('notranslate').attr('translate', 'no');
    $('.username').addClass('notranslate').attr('translate', 'no');
    $date.addClass('notranslate').attr('translate', 'no');

    return {
        content: $.html(),
        link,
        date,
        fullname,
        username,
    }
}

async function getTargetData(userList, sort = false) {
    const host = process.env.NT_HOST;
    const RSSHost = process.env.NT_RSS;
    let res = [];

    for (let user of userList) {
        try {
            const feed = await parser.parseURL(`${RSSHost}${user}`);
            feed.items.forEach((item) => {
                res.push(extractData(item))
            })
        } catch(err) {
            console.error(err)
        }
    }

    res = res.filter(({ date }) => {
        return moment(date, 'DD/MM/YYYY HH:mm:ss').add(1, 'month').isAfter(moment(Date.now()))
    })

    if (sort) {
        return res.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    return res
}

async function getFriends(user = '') {
    const userList = [];
    let cursor = -1

    while (cursor) {
        const result = await axios({
            method: 'get',
            url: `https://api.twitter.com/1.1/friends/list.json?screen_name=${user}&count=200&cursor=${cursor}`,
            headers: {
                'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        });

        result.data.users.forEach((item) => userList.push(item.screen_name));
        cursor = result.data.next_cursor
    }
    return userList;
}

module.exports = {
    getTargetData,
    getFriends,
}