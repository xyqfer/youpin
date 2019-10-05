'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const {
        params,
        http,
        db
    } = require('app-libs');

    const dbName = 'Fanfou';
    const name = process.env.fanfouName || '';
    const pwd = process.env.fanfouPwd || '';
    const getCookie = async ({ name = '', pwd = '' }) => {
        const resp = await http.post({
            uri: 'http://fanfou.com/login',
            headers: {
                'User-Agent': params.ua.pc,
            },
            simple: false,
            form: {
                loginname: name,
                loginpass: pwd,
                action: 'login'
            },
            resolveWithFullResponse: true
        });
        const cookies = resp.headers['set-cookie'].slice(1).map(cookie => {
            const [key, value] = cookie.split(';')[0].split('=');
            return {
                key,
                value
            };
        });
        let cookie;

        if (cookies.length > 2) {
            cookie = cookies.reduce((cookies, item) => {
                cookies += `${item.key}=${item.value}; `;
                return cookies;
            }, '');
        }
        return cookie;
    };
    const parseContent = async ({ userList = [], cookie = '' }) => {
        try {
            return flatten(await Promise.mapSeries(userList, async (user) => {
                try {
                    const htmlString = await http.get({
                        uri: `http://fanfou.com/${user}`,
                        headers: {
                            'User-Agent': params.ua.pc,
                            'Cookie': cookie,
                        }
                    });
                    const $ = cheerio.load(htmlString);
                    return $('#stream li').map(function() {
                        const $item = $(this);
                        const content = $item.find('.content').html();
                        const postId = $item.find('.op > .reply').attr('ffid');

                        return {
                            postId,
                            content
                        };
                    }).get();
                } catch (err) {
                    console.error(err);
                    return [];
                }
            }));
        } catch (err) {
            console.error(err);
            return [];
        }
    };
    const validateCookie = async (cookie) => {
        try {
            await http.get({
                uri: `http://fanfou.com/home`,
                headers: {
                    'User-Agent': params.ua.pc,
                    'Cookie': cookie,
                },
                followRedirect: false
            });
            return true;
        } catch (err) {
            return false;
        }
    };
    let [ cookieData ]  = await db.getDbData({
        dbName,
        query: {
            equalTo: ['name', name]
        }
    });
    const userList = [
        'wangxing'
    ];

    if (!cookieData || !(await validateCookie(cookieData.cookie))) {
        const cookie = await getCookie({ name, pwd });
        if (cookie) {
            if (cookieData) {
                db.updateDbData({
                    dbName,
                    data: {
                        name,
                        cookie
                    },
                    id: cookieData.objectId,
                });
            } else {
                cookieData = {
                    cookie
                };
                db.saveDbData({
                    dbName,
                    data: [{
                        name,
                        cookie,
                    }]
                });
            }
        } else {
            console.error('饭否登录失败');
            return [];
        }
    }

    return await parseContent({
        userList,
        cookie: cookieData.cookie
    });
};