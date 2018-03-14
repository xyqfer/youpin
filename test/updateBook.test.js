const init = require('./init');
init();

const updateBook = require('../app-modules/updateBook');

test('更新book', async () => {
    expect.assertions(1);
    jest.setTimeout(50 * 1000);

    const result = await updateBook();
    expect(result.success).toBe(true);
});