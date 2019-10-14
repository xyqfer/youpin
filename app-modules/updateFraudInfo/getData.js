'use strict';

module.exports = async () => {
    const { params, http } = require('app-libs');

    try {
        const result = await http.post({
            json: true,
            uri: 'https://api.aideep.com/v1/fraud/getfraudinfolist',
            headers: {
                'User-Agent': params.ua.pc,
            },
            body: { param: { page: '2', num: '10', pflag: '1' } },
        });

        return result.response.data.FraudinfoRst.map((item) => ({
            url: item.Fraudreportlink,
            title: item.Fraudcompanyname + '/' + item.Fraudname,
            summary: item.Fraudreporttitle,
        }));
    } catch (err) {
        console.error(err);
        return [];
    }
};
