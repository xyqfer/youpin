const init = require('./init');
init();

const getJuejinData = require('../app-modules/updateJuejin/getJuejinData');

test('获取juejin数据', async () => {
    expect.assertions(1);

    try {
        const result = await getJuejinData({});
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
