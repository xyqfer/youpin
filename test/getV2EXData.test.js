const init = require('./init');
init();

const getV2EXData = require('../app-modules/updateV2EX/getV2EXData');

test('获取v2ex数据', async () => {
    expect.assertions(1);

    try {
        const result = await getV2EXData();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {

    }
});