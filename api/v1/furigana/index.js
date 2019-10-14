const yahoo = require('./yahoo');

module.exports = async (req, res) => {
    const { content } = req.body;

    try {
        res.json({
            success: true,
            data: {
                list: await yahoo(content),
            },
        });
    } catch (err) {
        console.error(err);
        res.json({
            success: false,
        });
    }
};
