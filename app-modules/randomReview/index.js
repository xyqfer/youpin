const { mail: sendMail, crawler } = require('app-libs');

const getUrls = async () => {
    const $ = await crawler('https://www.ruanyifeng.com/blog/weekly/');
    const $items = $('#alpha .module-list > .module-list-item');
    const length = $items.length;
    const index = Math.floor(Math.random() * length);
    const $item = $items.eq(index).find('a');
    const title = $item.text().trim();
    const url = $item.attr('href').replace('http:', 'https:');
    const result = [{
        title,
        url,
    }];

    return result;
};

module.exports = async () => {
    try {
        const title = 'Random Weekly';
        const data = await getUrls();

        sendMail({
            title,
            data,
            template: ({ url = '', title = '' }) => `
                <div style="margin-bottom: 50px">
                    <a href="${url}" target="_blank">
                        <h4>${title}</h4>
                    </a>
                </div>
            `,
            device: 'device3',
            open: 'safari',
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


