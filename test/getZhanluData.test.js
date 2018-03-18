const init = require('./init');
init();

const getZhanluData = require('../app-modules/updateBook/updateZhanlu/getZhanluData');

test('获取Zhanlu数据', async () => {
    expect.assertions(1);

    const result = await getZhanluData({});
    expect(result.length).toBeGreaterThanOrEqual(0);
});