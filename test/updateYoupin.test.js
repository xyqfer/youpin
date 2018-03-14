const init = require('./init');
init();

const updateYoupin = require('../app-modules/updateYoupin');

test('更新youpin', async () => {
    expect.assertions(1);

    const result = await updateYoupin();
    expect(result.length).toBeGreaterThanOrEqual(0);
});