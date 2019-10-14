const init = require('./init');
init();

const update36KrNext = require('../app-modules/update36KrNext');

test('更新36Kr Next', async () => {
    expect.assertions(1);

    try {
        const result = await update36KrNext();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
