'use strict';

module.exports = () => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const sendMail = require('../lib/mail');

    const dbName = 'GitHubTrending';

    function getDbData() {
        let query = new AV.Query(dbName);

        query.ascending('updatedAt');
        query.limit(500);
        return query.find();
    }

    function getGitHubData() {
        return rp.get({
            uri: 'https://github.com/trending',
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
        });
    }

    return Promise.all([getDbData(), getGitHubData()]).then((result) => {
        const dbData = result[0];
        const githubData = result[1];

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
    });
};