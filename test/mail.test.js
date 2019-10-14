const init = require('./init');
init();

const sendMail = require('app-libs/mail');

test('发送邮件', async () => {
    expect.assertions(1);

    try {
        const result = await sendMail({});
        expect(result.success).toBe(true);
    } catch (err) {}
});
