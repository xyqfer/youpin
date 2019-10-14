const init = require('./init');
init();

const updateV2EX = require('../app-modules/updateV2EX');

test('更新v2ex', async () => {
    expect.assertions(1);

    try {
        const result = await updateV2EX();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
