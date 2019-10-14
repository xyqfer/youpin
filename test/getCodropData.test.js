const init = require('./init');
init();

const getCodropData = require('../app-modules/updateCodrop/getCodropData');

test('获取Codrop数据', async () => {
    expect.assertions(1);

    try {
        const result = await getCodropData();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
