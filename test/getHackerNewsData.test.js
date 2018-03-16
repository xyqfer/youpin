const init = require('./init');
init();

const getHackerNewsData = require('../app-modules/updateHackerNews/getHackerNewsData');

test('获取HackerNews数据', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    try {
        const result = await getHackerNewsData({});
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {

    }
});