module.exports = async (req, res) => {
    const { token, code = '', needReturn = false } = req.body;

    if (token === process.env.SANDBOX_TOKEN) {
        console.log('开始执行沙盒');
        /* eslint-disable no-eval */
        const result = await eval(`
            (async () => {
                ${decodeURIComponent(code)}
            })();
        `);
        console.log('沙盒执行完毕，结果为：');
        console.log(result);

        res.json({
            success: true,
            data: {
                result: needReturn ? result : null,
            },
        });
    } else {
        res.status(400).send('Bad Request');
    }
};
