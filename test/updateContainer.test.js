const init = require('./init');
init();

const updateContainer = require('app-containers/update');

test('更新容器', async () => {
    expect.assertions(1);

    try {
        const result = await updateContainer({
            dbName: 'Test'
        });
        expect(result.length).toBeGreaterThanOrEqual(0);
    } catch (err) {

    }
});