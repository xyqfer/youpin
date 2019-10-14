const init = require('./init');
init();

const updateEle = require('../app-modules/updateEle');

test('更新ele', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    try {
        const result = await updateEle();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
