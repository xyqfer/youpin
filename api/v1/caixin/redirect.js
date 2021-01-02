const path = require('path');
const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { url } = req.query;
    const u = new URL(url);
    const id = path.basename(u.pathname, '.html');

    const response = await http.get({
        uri: `https://gateway.caixin.com/api/purchase/article/get/${id}`,
    });
    
    res.redirct(`/api/v1/caixin/article?id=${response.data.data.id}`);
};
