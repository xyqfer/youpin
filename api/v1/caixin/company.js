module.exports = async (req, res) => {
    const moment = require('moment');
    const { http } = require('app-libs'); 
    const { code } = req.query;

    const response = await http.get({
        uri: `https://entities.caixin.com/api/companies/${code}/news?pageNum=1`,
        json: true,
    });

    const content = response.data.reduce((acc, news) => {
      const img = news.picture === '' ? 
        '' : 
        `<div>
            <img src="${news.picture}" alt="">
        </div>`;
      const time = moment(news.time).format('YYYY/MM/DD');

      acc += `
        <div style="margin-bottom: 50px">
            <div>${time}</div>
            <a href="./redirect?url=${encodeURIComponent(news.url)}" target="_blank">
              <h4>${news.title}</h4>
            </a>
            ${img}
            <p>
              ${news.guide}
            </p>
        </div>
      `;

      return acc;
    }, '');
    
    res.render('archive', {
        title: 'caixin - companies',
        content,
    });
};
