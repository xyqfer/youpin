const cheerio = require('cheerio');
const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { id } = req.query;

    let response = await http.get({
        uri: process.env.CODE_URL,
        json: true,
    });
    const code = response.code;
    
    response = await http.get({
        uri: `https://gateway.caixin.com/api/newauth/checkAuthByIdJsonp?type=0&id=${id}&page=0`,
        json: true,
        headers: {
            Cookie: `SA_USER_UID=${process.env.CX_USER_UID}; SA_USER_UNIT=1; SA_USER_DEVICE_TYPE=5; USER_LOGIN_CODE=${code};`,
        }
    });
    const { content } = JSON.parse(response.data.slice(17, -1));
    
    console.log(response);

    const $ = cheerio.load(content);
    $('script').remove();
    $('img').each(function() {
        $(this).attr('referrerpolicy', 'no-referrer');
    });
    $('a').each(function() {
        const $elem = $(this);
        let link = $elem.attr('href');

        if (link.startsWith('link://') || link.startsWith('links://')) {
          link = link.replace('link://', 'https://').replace('links://', 'https://');
          $elem.attr('href', link);
        }
    });

    res.render('caixin', {
        title: '',
        content: $.html(),
    });
};
