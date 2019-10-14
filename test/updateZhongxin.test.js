const init = require('./init');
init();

const updateZhongxin = require('../app-modules/updateBook/updateZhongxin');

test('更新中信', async () => {
    expect.assertions(1);

    try {
        const result = await updateZhongxin();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
