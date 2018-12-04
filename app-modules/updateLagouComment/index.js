'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getLagouCommentData = require('./getLagouCommentData');

    try {
        return await updateContainer({
            dbName: 'LagouComment',
            mail: {
                title: '拉勾评论有更新~',
                template: ({ commentId = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <a href="https://www.lagou.com/gongsi/interviewExperiences.html?companyId=84693" target="_blank">
                                ${commentId}
                            </a>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getLagouCommentData();
            },
            filterKey: 'commentId'
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};