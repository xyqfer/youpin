'use strict';

const { http } = require('app-libs');

module.exports = async () => {
    let result = await http.get({
        uri: 'https://www3.nhk.or.jp/news/easy/news-list.json',
        json: true,
    });

    if (typeof result === 'string') {
        result = JSON.parse(result.replace(/^\s/g, ''));
    }

    const data = result[0];
    const newsList = [];
    Object.values(data).forEach((items) => {
        items.forEach((news) => {
            const newsData = {
                title: news.title,
                easyUrl: `https://www3.nhk.or.jp/news/easy/${news.news_id}/${news.news_id}.html`,
                webUrl: news.news_web_url,
                time: news.news_prearranged_time,
            };

            if (news.has_news_web_image) {
                newsData.cover = news.news_web_image_uri;
            }

            if (news.has_news_easy_voice) {
                const date = news.news_prearranged_time.split(' ')[0].replace(/-/g, '');
                newsData.audioUrl = `https://newswebeasy-assets.gitlab.io/${date}/${news.news_id}/${news.news_easy_voice_uri}`;
            }

            newsList.push(newsData);
        });
    });

    return newsList;
};
