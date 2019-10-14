const init = require('./init');
init();

const updateCodrop = require('../app-modules/updateCodrop');

test('更新Codrop', async () => {
    expect.assertions(1);

    try {
        const result = await updateCodrop();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
