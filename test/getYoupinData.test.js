const init = require('./init');
init();

const getYoupinData = require('../app-modules/updateYoupin/getYoupinData');

test('获取youpin数据', async () => {
    expect.assertions(1);

    try {
        const result = await getYoupinData();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {

    }
});