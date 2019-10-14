'use strict';

module.exports = async () => {
    const getGZWeatherData = require('./getGZWeatherData');
    const { mail: sendMail } = require('app-libs');

    try {
        const weatherText = await getGZWeatherData();
        const title = '明日天气预报';
        sendMail({
            title,
            data: [
                {
                    url: 'https://www.tianqi.com/tianhequ/7/',
                    title,
                    content: weatherText,
                },
            ],
            template: ({ url = '', title = '', content = '' }) => `
                    <div style="margin-bottom: 50px">
                        <a href="${url}" target="_blank">
                            <h4>${title}</h4>
                        </a>
                        <p>
                            ${content}
                        </p>
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
