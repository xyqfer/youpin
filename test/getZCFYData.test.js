const init = require('./init');
init();

const getZCFYData = require('../app-modules/updateZCFY/getZCFYData');

test('获取zcfy数据', async () => {
    expect.assertions(1);

    try {
        const result = await getZCFYData();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {

    }
});