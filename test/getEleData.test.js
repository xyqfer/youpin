const init = require('./init');
init();

const getEleData = require('../app-modules/updateEle/getEleData');

test('获取ele数据', async () => {
    expect.assertions(1);

    try {
        const result = await getEleData({});
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
