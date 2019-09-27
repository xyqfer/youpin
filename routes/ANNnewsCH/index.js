const Parser = require('rss-parser');
const parser = new Parser();

module.exports = async (req, res) => {
    const feed = await parser.parseURL(process.env.ANNnewsCH_rss);
    let content = feed.items.slice(0, 5).reduce((acc, item, index) => {
        acc += `
            <div style="margin-bottom: 30px">
                <div>${item.title}</div>
                <div>
                    <video controls webkit-playsinline playsinline src="${item.enclosure.url}"></video>
                </div>
                <div style="margin-top: 20px" id="J-content-${index}">
                    ${item.content}
                </div>
                <div style="margin-top: 10px">
                    <button data-index="${index}" class="J-furigana">furigana</button>
                </div>
            </div>
        `;

        return acc;
    }, '');

    content += `
    <script>
        document.body.addEventListener("click", ({ target }) => {
            if (target.classList.contains('J-furigana')) {
                const index = target.getAttribute('data-index');
                const id = "J-content-" + index;
                const elem = document.getElementById(id);
                const content = elem.textContent;

                const data = {
                    content,
                };
                const body = Object.entries(data).map(([key, value]) => {
                    return key + '=' + value;
                }).join('&');

                fetch('/api/v1/furigana/translate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    body,
                })
                .then(async (response) => {
                    const result = await response.json();
                    if (result.success) {
                        const content = result.data.list.reduce((acc, item) => {
                            acc += "<ruby>" + item.text + "<rt>" + item.furigana + "</rt></ruby>";
                            return acc;
                        }, '');

                        elem.innerHTML = content;
                    }
                })
            }
        });
    </script>
    `;

    res.render('archive', {
        title: 'ANNnewsCH',
        content,
    });
};