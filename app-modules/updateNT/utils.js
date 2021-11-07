const cheerio = require('cheerio');
const Parser = require('rss-parser');
const { params } = require('app-libs')
const parser = new Parser({
  headers: {
    'User-Agent': params.ua.pc
  },
});

const userList = [
    'googlechrome',
    'v8js',
]

function extractData({content, link}) {
    const $ = cheerio.load(content, null, false);

    const $date = $('.tweet-date > a');
    const date = $date.attr('title');
    $date.text('');

    const $fullname = $('.fullname').eq(0);
    const $username = $('.username').eq(0);
    const fullname = $fullname.attr('title');
    const username = $username.attr('title');

    $('.fullname').addClass('notranslate').attr('translate', 'no');
    $('.username').addClass('notranslate').attr('translate', 'no');

    return {
        content: $.html(),
        link,
        date,
        fullname,
        username,
    }
}

async function getTargetData() {
    const host = process.env.NT_HOST;
    const RSSHost = process.env.NT_RSS;
    const res = []

    for (let user of userList) {
        const feed = await parser.parseURL(`${RSSHost}${user}`);
        feed.items.forEach((item) => {
            res.push(extractData(item))
        })
    }

    // return res.sort((a, b) => new Date(b.date) - new Date(a.date))
    return res
}

module.exports = {
    getTargetData,
}