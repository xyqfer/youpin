const init = require('./init');
init();

const updateEchojs = require('../app-modules/updateEchojs');

test('更新Echojs', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    try {
        const result = await updateEchojs();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
