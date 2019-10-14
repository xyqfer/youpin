const init = require('./init');
init();

const updateChinaPub = require('../app-modules/updateBook/updateChinaPub');

test('更新ChinaPub', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    try {
        const result = await updateChinaPub();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
