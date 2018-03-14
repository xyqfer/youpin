const init = require('./init');
init();

const updateDouban = require('../app-modules/updateBook/updateDouban');

test('更新豆瓣', async () => {
    expect.assertions(1);

    try {
        const result = await updateDouban();
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {

    }
});