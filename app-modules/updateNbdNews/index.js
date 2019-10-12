'use strict';

const updateContainer = require('app-containers/update');
const fetchRSS = require('app-containers/fetchRSS');
const sendMail = require('app-libs/mail');
const fetchPage = require('./fetchPage');

module.exports = async () => {
    const filterKey = 'url';
    const dbName = 'WechatAnnounce';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            getTargetData: () => {
                return fetchRSS({
                    source: 'RSS_NbdNews',
                });
            },
            notify: async (newData) => {
                sendMail({
                    title: 'NbdNews 有更新',
                    template: ({ title = '', url = '', content = '', }) => {
                        return `
                            <div style="margin-bottom: 30px">
                                <a href="${url}" target="_blank">
                                    <h4>${title}</h4>
                                </a>
                                <div style="margin-top: 20px">${content}</div>
                            </div>
                        `;
                    },
                    data: await fetchPage(newData),
                });
            },
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};