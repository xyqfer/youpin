'use strict';

module.exports = async () => {
    const {
        params,
        http
    } = require('app-libs');

    const result = await http.post({
        json: true,
        uri: 'https://1b8bp93y6k-2.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.32.0%3Breact-instantsearch%205.4.0%3BJS%20Helper%202.26.1&x-algolia-application-id=1B8BP93Y6K&x-algolia-api-key=104a2d95fc7311c7803ded312768c4ec',
        headers: {
            'User-Agent': params.ua.pc,
        },
        body: { "requests": [{ "indexName": "prod_video_library", "params": "query=&hitsPerPage=50&maxValuesPerFacet=10&page=0&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&facets=%5B%22series%22%5D&tagFilters=&facetFilters=%5B%5B%22series%3A5-Minute%20Videos%22%5D%5D" }, { "indexName": "prod_video_library", "params": "query=&hitsPerPage=1&maxValuesPerFacet=10&page=0&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&analytics=false&clickAnalytics=false&facets=series" }] }
    });

    return result.results[0].hits.slice(0, 5).map(({ title, image, description, slug }) => {
        return {
            title,
            url: `https://www.prageru.com/video/${slug}`,
            summary: `
                <img referrerpolicy="no-referrer" src="${image}"/><br>
                <div><strong>${description}</strong></div>
            `
        };
    });
};