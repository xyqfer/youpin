const init = require('./init');
init();

const updateZCFY = require('../app-modules/updateZCFY');

test('更新zcfy', async () => {
    expect.assertions(1);

    const result = await updateZCFY();
    expect(result.length).toBeGreaterThanOrEqual(0);
});
