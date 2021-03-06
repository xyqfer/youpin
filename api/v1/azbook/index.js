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
                title: '亚马逊有新书',
                template: ({ title = '', summary = '', url = '' }) => `
              <div style="margin-bottom: 30px">
                  <a href="${url}" target="_blank">
                      <h4>${title}</h4>
                  </a>
                  <div>
                      ${summary}
                  </div>
              </div>
          `,
            },
            getTargetData: () =>
                books.map((book) => ({
                    url: book.link.replace(/\/ref.+/g, ''),
                    title: book.title,
                    summary: book.description,
                })),
        });
    } catch (err) {
        console.error(err);
    }

    res.json({
        success: true,
    });
};
