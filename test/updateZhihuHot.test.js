const init = require('./init');
init();

const updateZhihuHot = require('../app-modules/updateZhihuHot');

test('更新ZhihuHot', async () => {
    expect.assertions(1);

    try {
        const result = await updateZhihuHot();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {}
});
