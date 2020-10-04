const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { id } = req.query;

    const response = await http.get({
        uri: `https://mappsv5.caixin.com/magazine_detailv5/${id}.json`,
    });
    const data = response.data.data;
    const content = data.list.reduce((acc, { news_list }) => {
      news_list.forEach((news) => {
        acc += `
          <div style="margin-bottom: 50px">
              <a href="${url}" target="_blank">
                  <h4>${news.title}</h4>
              </a>
              <div>
                  <img src="${news.pics === '' ? 'https://file.caixin.com/webchannel/all/img/logo.png' : news.pics}" alt="">
              </div>
              <p>
                  ${news.summary}
              </p>
          </div>
        `;
      });

      return acc;
    }, '');
    
    res.render('archive', {
        title: data.magazine.pub_date,
        content: `
          <img referrerpolicy="no-referrer" src="${data.magazine.image_big_url}" /><br>
          ${content}
        `,
    });
};
