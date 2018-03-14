const init = require('./init');
init();

const updateJuejin = require('../app-modules/updateJuejin');

test('更新juejin', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    try {
        const result = await updateJuejin();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {

    }
});