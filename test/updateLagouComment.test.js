const init = require('./init');
init();

const updateLagouComment = require('../app-modules/updateLagouComment');

test('更新LagouComment', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    try {
        const result = await updateLagouComment({});
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
