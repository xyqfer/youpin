'use strict';

module.exports = () => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const sendMail = require('../lib/mail');

    const dbName = 'GitHubTrending';
    const urls = [
        'https://github.com/trending',
        'https://github.com/trending/javascript',
        'https://github.com/trending/css',
        'https://github.com/trending/vue',
        'https://github.com/trending/unknown'
    ];

    function getDbData() {
        let query = new AV.Query(dbName);

        query.ascending('updatedAt');
        query.limit(500);
        return query.find();
    }

    function getGitHubData() {
        return Promise.mapSeries(urls, (url) => {
            return rp.get({
                uri: url,
                headers: {
                    'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36`
                },
            }).then((htmlString) => {
                const $ = cheerio.load(htmlString);
                let repositoryList = [];

                $('.repo-list > li').each(function () {
                    const $elem = $(this);

                    repositoryList.push({
                        name: $elem.find('h3 a').text().replace(/\s+/g, ''),
                        url: `https://github.com${$elem.find('h3 a').attr('href')}`,
                        desc: $elem.find('.py-1').text().replace(/\n+/g, '').trim(),
                        lang: $elem.find('[itemprop="programmingLanguage"]').text().replace(/\n+/g, '').trim()
                    });
                });

                return repositoryList;
            }).catch((err) => {
                console.log(err);
                return [];
            });
        }).then((results) => {
            return uniqBy(flatten(results), 'url');
        }).catch((err) => {
            console.log(err);
            return [];
        });
    }

    return Promise.props({
        dbData: getDbData(),
        githubData: getGitHubData()
    }).then((result) => {
        const { dbData, githubData } = result;

        const newData = githubData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item.name === dbData[i].get('name')) {
                    return false;
                }
            }

            return true;
        });

        if (newData.length > 0) {
            let mailContent = '';

            newData.forEach((item) => {
                const GitHubTrending = AV.Object.extend(dbName);
                let trending = new GitHubTrending();

                trending.set('name', item.name);
                trending.save(null, {
                    useMasterKey: false
                });

                mailContent += `
                    <div style="margin-bottom: 50px">
                        <a href="${item.url}">
                            <h4>${item.name}</h4>
                        </a>
                        <p>
                            ${item.desc}
                        </p>
                        <p>
                            ${item.lang}
                        </p>
                    </div>
                    `;
            });

            sendMail({
                title: 'GitHub NEW Trending',
                mailContent: mailContent
            });
        }
    }).catch((err) => {
        console.log(err);
    });
};