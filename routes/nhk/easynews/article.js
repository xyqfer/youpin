const { db, http, params, } = require('app-libs');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    const { id } = req.params;
    const dbName = 'NHKEasyNews';
    const [ data ] = await getDbData({
        dbName,
        limit: 1,
        query: {
            equalTo: ['objectId', id],
        },
    });

    const $ = cheerio.load(data.content);
    const words = $('ruby').map(function() {
        const $elem = $(this);
        const furigana = $elem.find('rt').text().trim();
        const text = $elem.text().replace(/\s*/g, '');
        const kanji = text.slice(0, text.indexOf(furigana));

        return {
            kanji,
            furigana,
        };
    }).get();
    const wordsContent = words.reduce((acc, item) => {
        acc += `
            <div class="word-container">
                <div class="word-item">${item.kanji}</div>
                <div class="word-item hide J-furigana">${item.furigana}</div>
            </div>
        `;

        return acc;
    }, '');

    const dicData = await http.get({
        uri: data.url.replace('.html', '.out.dic'),
        json: true,
    });
    const dicContent = Object.values(dicData.reikai.entries).reduce((acc, item) => {
        acc += item[0].hyouki;
        
        item.forEach(({ def }, index) => {
            acc += `
                <div style="margin-bottom: 10px">
                    ${index + 1}. ${def}
                </div>
            `;
        });
        
        return acc;
    }, '');

    const content = `
        <style>
            .word-container {
                display: flex;
                margin-bottom: 10px;
            }

            .word-item {
                width: 50%;
                text-align: center;
            }

            .word-item.hide {
                display: none;
            }
        </style>
        <div style="margin-bottom: 30px">
            <video controls webkit-playsinline playsinline src="${process.env.IMAGE_PROXY}${data.audioUrl}"></video>
        </div>
        <div style="margin-bottom: 30px">
            ${data.content}
        </div>
        <div id="J-word-container" style="margin-bottom: 30px">
            ${wordsContent}
        </div>
        <div style="margin-bottom: 30px">
            <button id="J-word-reset">Reset</button>
        </div>
        <div style="margin-bottom: 30px">
            <h2>词典</h2>
            ${dicContent}
        </div>
        <script>
            document.getElementById("J-word-container").addEventListener("click", ({ targe }) => {
                if (target.classList.has('J-furigana')) {
                    target.classList.remove('hide');
                }
            });

            document.getElementById("J-word-reset").addEventListener("click", () => {
                document.querySelectorAll(".J-furigana").forEach((elem) => {
                    elem.classList.add("hide");
                });
            });
        </script>
    `;

    res.render('archive', {
        title: data.title,
        content,
    });
};