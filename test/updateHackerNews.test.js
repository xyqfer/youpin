const init = require('./init');
init();

const updateHackerNews = require('../app-modules/updateHackerNews');

test('更新HackerNews', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    try {
        const result = await updateHackerNews();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {

    }
});