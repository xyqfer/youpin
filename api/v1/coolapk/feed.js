const { http } = require('app-libs');
const utils = require('./utils');

const parseContentFromRaw = (raw) =>
    raw.map((i) => {
        if (i.type === 'text') {
            return `<p>${i.message}</p>`;
        } else if (i.type === 'image') {
            return `<div class="img-container" style="text-align: center;">
                <img referrerpolicy="no-referrer" src="${i.url}">
                <p class="image-caption" style="text-align: center;">${i.description}</p></div>`;
        } else {
            return '';
        }
    }).join('');

module.exports = async (req, res) => {
    const { id } = req.params;
    const { data } = await http.get(`https://www.coolapk.com/feed/${id}`, {
        json: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Sdk-Int': '28',
            'X-Sdk-Locale': 'zh-CN',
            'X-App-Id': 'com.coolapk.market',
            'X-App-Version': '9.2.2',
            'X-App-Code': '1905301',
            'X-Api-Version': '9',
            'X-App-Device': utils.getCoolapkDeviceToken(),
            'X-App-Token': utils.getCoolapkAppToken(),
        },
    });
    const content = parseContentFromRaw(JSON.parse(data.message_raw_output));

    res.render('archive', {
        title: data.title,
        content,
    });
};
