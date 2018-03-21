const init = require('./init');
init();

const get36KrNextData = require('../app-modules/update36KrNext/get36KrNextData');

test('获取36Kr Next数据', async () => {
    expect.assertions(1);

    try {
        const result = await get36KrNextData();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {

    }
});