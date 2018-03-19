const init = require('./init');
init();

const getLagouCommentData = require('../app-modules/updateLagouComment/getLagouCommentData');

test('获取LagouComment数据', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    try {
        const result = await getLagouCommentData({});
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {

    }
});