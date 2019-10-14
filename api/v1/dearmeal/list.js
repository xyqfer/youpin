'use strict';

module.exports = async (req, res) => {
    const { params, http } = require('app-libs');
    const getMenuContent = async () => {
        const result = await http.post({
            json: true,
            uri: 'https://tv.daydaycook.com.cn/top-content/content-index',
            headers: {
                'User-Agent': params.ua.pc,
            },
            body: { deviceId: '00000000-0000-0000-0000-000000000000', uid: '', deviceType: '1', sessionId: '', userUniqueId: '', version: '6.2.0', mainland: '1', languageId: '3', ip: '192.168.31.105', regionCode: '156' },
        });
        return result.data.foodContentList.map((item) => ({
            cover: item.coverImage,
            title: item.title,
            summary: item.summary,
            id: item.id,
        }));
    };

    const data = await getMenuContent();

    res.json({
        success: true,
        data,
    });
};
