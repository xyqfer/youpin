const { crawler } = require('app-libs');

module.exports = async (req, res) => {
    const { id, page } = req.query;
    let link = `https://wewe.t9t.io/chat/${encodeURIComponent(id)}`;
    if (page && page !== '') {
        link += `/page/${page}`;
    }

    const $ = await crawler(link);
    const data = JSON.parse($('#__NEXT_DATA__').html()).query;

    res.json({
        success: true,
        data,
    });
};
