const init = require('./init');
init();

const updateZhanlu = require('../app-modules/updateBook/updateZhanlu');

test('更新Zhanlu', async () => {
    expect.assertions(1);

    const result = await updateZhanlu();
    expect(result.length).toBeGreaterThanOrEqual(0);
});
