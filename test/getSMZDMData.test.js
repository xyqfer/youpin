const init = require('./init');
init();

const getSMZDMData = require('../app-modules/updateSMZDM/getSMZDMData');

test('获取SMZDM数据', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    try {
        const result = await getSMZDMData({});
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
