const AV = require('leanengine');

module.exports = async (req, res) => {
    const { text } = req.body;
    const now = Date.now();

    const Todo = AV.Object.extend('TODO');
    const todo = new Todo();

    todo.set('text', text);
    todo.set('createTime', now);
    todo.set('updateTime', now);

    const data = await todo.save();
    res.json({
        success: true,
        data: {
            todo: data
        }
    });
};
