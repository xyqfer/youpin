const init = require('./init');
init();

const updateGitHubTrending = require('../app-modules/updateGitHubTrending');

test('更新github trending', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    try {
        const result = await updateGitHubTrending();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {

    }
});