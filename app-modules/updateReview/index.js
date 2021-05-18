const { mail: sendMail } = require('app-libs');
const fetchRSS = require('app-containers/fetchRSS');

module.exports = async () => {
    try {
        const data = await fetchRSS({
            source: 'RSS_Review',
            appendTitle: true,
        });

        sendMail({
            title: 'Review 有更新',
            data,
            template: ({ url = '', title = '' }) => `
                <div style="margin-bottom: 50px">
                    <a href="${url}" target="_blank">
                        <h4>${title}</h4>
                    </a>
                </div>
            `,
        });

        return {
            success: true,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
