'use strict';

module.exports = async (req, res) => {
  const books = JSON.parse(req.body.books);
  const updateContainer = require('app-containers/update');

  const filterKey = 'url';
  const dbName = 'Dribbble';

  try {
    await updateContainer({
      dbName,
      filterKey,
      mail: {
        title: '亚马逊有新书~',
        template: ({ title = '', summary = '', url = '' }) => {
          return `
              <div style="margin-bottom: 60px">
                  <a href="${url}" target="_blank">
                      <h4>${title}</h4>
                  </a>
                  <div>
                      ${summary}
                  </div>
              </div>
              <br><br>
          `;
        }
      },
      getTargetData: () => {
        return books.map((book) => {
          return {
            url: book.link,
            title: book.title,
            summary: book.description
          };
        });
      }
    });
  } catch (err) {
    console.error(err);
  }

  res.json({
    success: true
  });
};