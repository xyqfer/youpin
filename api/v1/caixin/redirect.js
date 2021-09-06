const path = require('path');
const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { url } = req.query;
    const u = new URL(url);
    const id = path.basename(u.pathname, '.html');
    
    res.redirect(`/api/v1/caixin/article?id=${id}`);
};
