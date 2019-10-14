const init = require('./init');
init();

const getEchojsData = require('../app-modules/updateEchojs/getEchojsData');

test('获取Echojs数据', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    try {
        const result = await getEchojsData();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
