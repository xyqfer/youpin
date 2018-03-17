const init = require('./init');
init();

const updateSMZDM = require('../app-modules/updateSMZDM');

test('更新SMZDM', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    try {
        const result = await updateSMZDM({});
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {

    }
});