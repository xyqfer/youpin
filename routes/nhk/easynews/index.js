const { db } = require('app-libs');

module.exports = async (req, res) => {
    const dbName = 'NHKEasyNews';
    const data = await db.getDbData({
        dbName,
        query: {
            descending: ['createdAt'],
        },
    });

    const content = data
        .reduce((acc, item) => {
            acc += `
                <div style="margin-bottom: 30px">
                    <a href="/nhk/easynews/article/${item.objectId}" target="_blank">
                        <h4>${item.title}</h4>
                    </a>
                </div>
            `;
            return acc;
        }, '');

    res.render('archive', {
        title: 'nhk-easynews',
        content,
    });
};