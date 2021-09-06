const { http } = require('app-libs');

module.exports = async (req, res) => {
    const { id } = req.query;

    const response = await http.get({
        uri: `https://mappsv5.caixin.com/magazine_detailv5/${id}.json`,
        json: true,
    });
    const data = response.data;
    const content = data.list.reduce((acc, { news_list }) => {
      news_list.forEach((news) => {
        const img = news.pics === '' ? 
            '' : 
            `<div>
                <img src="${news.pics}" alt="">
            </div>`;

        acc += `
          <div style="margin-bottom: 50px">
              <a href="./article?id=${news.source_id}" target="_blank">
                  <h4>${news.title}</h4>
              </a>
              ${img}
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
