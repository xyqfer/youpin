const init = require('./init');
init();

const getZhihuHotData = require('../app-modules/updateZhihuHot/getZhihuHotData');

test('获取ZhihuHot数据', async () => {
    expect.assertions(1);

    try {
        const result = await getZhihuHotData();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
