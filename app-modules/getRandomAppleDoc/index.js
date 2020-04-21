const { mail: sendMail, crawler } = require('app-libs');

const getUrls = async () => {
    const BASE_URL = 'https://developer.apple.com/';
    const COUNT = 3;
    const ID = '#bootstrap-data';
    const result = [];
    
    let $ = await crawler(`${BASE_URL}documentation`);
    const entryDocs = JSON.parse($(ID).html().trim()).modules;

    for (let i = 0; i < COUNT; i++) {
        const entryPath = entryDocs[Math.floor(entryDocs.length * Math.random())].paths[0];
        $ = await crawler(`${BASE_URL}${entryPath}`);

        const { tasks } = JSON.parse($(ID).html().trim());
        const symbols = tasks.reduce((acc, item) => {
            item.symbols.forEach((symbol) => {
                acc.push({
                    url: symbol.paths[0],
                    title: symbol.name || symbol.title.content,
                });
            });

            return acc;
        }, []);
        const symbol = symbols[Math.floor(symbols.length * Math.random())];
        symbol.url = BASE_URL + symbol.url;

        result.push({...symbol});
    }

    return result;
};

module.exports = async () => {
    try {
        const title = 'Random Apple Document';
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


