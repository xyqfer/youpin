const init = require('./init');
init();

const getGitHubData = require('../app-modules/updateGitHubTrending/getGitHubData');

test('获取github trending数据', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    try {
        const result = await getGitHubData();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {

    }
});