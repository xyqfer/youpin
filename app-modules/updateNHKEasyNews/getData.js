'use strict';

const {
    params,
    http,
} = require('app-libs');

module.exports = async () => {
    const [data] = await http.get({
        uri: 'https://www3.nhk.or.jp/news/easy/news-list.json',
        headers: {
            'User-Agent': params.ua.pc
        },
        json: true,
    });

    const newsList = [];
    Object.values(data).forEach((items) => {
        items.forEach((news) => {
            let newsData = {
                title: news.title,
                url: news.news_web_url,
                time: news.news_prearranged_time,
            };

            if (news.has_news_web_image) {
                newsData.cover = news.news_web_image_uri;
            }

            if (news.has_news_easy_voice) {
                const date = news.news_prearranged_time.split(' ')[0].replace(/-/g, '');
                newsData.audioUrl = `https://newswebeasy-assets.gitlab.io/${date}/${news.id}/${news.news_easy_voice_uri}`;
            }

            newsList.push(newsData);
        });
    });

    return newsList;
};