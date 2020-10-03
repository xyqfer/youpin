const got = require('got');

let token;

const getToken = async () => {
    const { LARK_APP_ID, LARK_APP_SECRET } = process.env;
    const resp = await got.post('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/', {
        json: {
            app_id: LARK_APP_ID,
            app_secret: LARK_APP_SECRET,
        },
        responseType: 'json',
    });

    return resp.body.tenant_access_token;
};

const sendText = async (user, msg) => {
    if (!token) {
        token = await getToken();
    }

    await got.post('https://open.feishu.cn/open-apis/message/v4/send/', {
        json: {
            email: user,
            msg_type: 'text',
            content: {
                text: msg,
            },
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'json',
    });
};

const sendPost = async (user, msg) => {
    if (!token) {
        token = await getToken();
    }

    await got.post('https://open.feishu.cn/open-apis/message/v4/send/', {
        json: {
            email: user,
            msg_type: 'post',
            content: {
                post: {
                    "zh_cn": msg,
                },
            },
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'json',
    });
};

module.exports = {
    sendText,
    sendPost,
};