const AV = require('leanengine');

module.exports = async (req, res) => {
    const { id } = req.body;
    const todo = AV.Object.createWithoutData('TODO', id);
    todo.destroy();

    res.json({
        success: true,
    });
};
