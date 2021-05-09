const { crawler, http } = require('app-libs');

function getCommentId(url) {
  const u = new URL(url);
  return u.searchParams.get('id');
}

async function getTopComments(url) {
  if (!url) return '';

  const id = getCommentId(url);
  let comments = [];
  let res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);

  if (res.data.kids) {
    const kids = res.data.kids.slice(0, 4);
    comments = await Promise.all(kids.map(async (id) => {
      const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);

      if (res.data) {
        return {
          by: res.data.by,
          text: res.data.text,
        };
      }
    }));
  }

  const commentHtml = comments.reduce((acc, { by, text }) => {
    acc += `${by} said:<br>
      ${text}<br>
      <hr>
    `;

    return acc;
  }, '');
  return `<div>${commentHtml}</div>`;
}

module.exports = async (req, res) => {
  const { i = 1, year = 2020 } = req.query;
  let $ = await crawler(`https://www.daemonology.net/hn-daily/${year}.html`);
  const link = 'https://www.daemonology.net/hn-daily/' + $('.content a').eq(i - 1).attr('href');
  $ = await crawler(link);

  const listPromise = $('.content ul').eq(0).find('li')
    .map(async (_, item) => {
        const $link = $(item).find('.storylink > a');
        const link = $link.attr('href');
        const readerViewUrl = process.env.READER_VIEW_URL + encodeURIComponent(link);
        const commentUrl = $(item).find('.postlink > a').attr('href');
        const topComments = await getTopComments(commentUrl);
        const previewUrl = `${process.env.hostName}/api/v1/screenshot2?url=${encodeURIComponent(link)}`;

        return {
          title: $link.text(),
          link,
          description: `
            <img src="${previewUrl}" referrerpolicy="no-referrer"><br>
            ${topComments}
            <a href="${readerViewUrl}" class="notranslate" translate="no" target="_blank">Reader View</a>
          `
        };
    })
    .get();
  
  const list = await Promise.all(listPromise);
  const content = list.reduce((acc, { title, link, description }) => {
    acc += `
      <div style="margin-bottom: 30px">
        <a class="notranslate" translate="no" href="${link}" target="_blank">
            <h4>${title}</h4>
        </a>
        <div>
            <style>pre {width: initial !important;}</style>
            ${description}
        </div>
      </div>
    `;
    return acc;
  }, '');

  res.render('archive', {
    title: `${year}-${i}`,
    content,
  });
};
