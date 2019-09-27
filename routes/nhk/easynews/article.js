const { db, http, params, } = require('app-libs');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    const { id } = req.params;
    const dbName = 'NHKEasyNews';
    const [ data ] = await db.getDbData({
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

    $('.dicWin').each(function() {
        $(this).removeAttr('href');
    });
    $('p').each(function() {
        const html = $(this).html();

        if (html !== '') {
            const textarea = `<textarea rows="4" class="textarea"></textarea>`;
            $(this).html(html + textarea);
        }
    });
    const articleContent = $.html();

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
        uri: data.easyUrl.replace('.html', '.out.dic'),
        headers: {
            'User-Agent': params.ua.pc,
        },
        json: true,
    });
    const dicContent = Object.entries(dicData.reikai.entries).reduce((acc, [ key, item ]) => {
        const { hyouki } = item[0];
        const furigana = $(`#id-${key}`).find('rt').eq(0).text().trim();
        
        acc += `
            <ruby>${hyouki}<rt>${furigana}</rt></ruby>
        `;
        
        item.forEach(({ def }, index) => {
            acc += `
                <div style="margin-bottom: 10px">
                    ${index + 1}. ${def}
                </div>
            `;
        });

        acc += `<div style="margin-bottom: 20px"></div>`;
        
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
                opacity: 0;
            }

            .textarea {
                width: 100%;
            }
        </style>
        <div style="margin-bottom: 30px">
            <video controls webkit-playsinline playsinline src="${process.env.IMAGE_PROXY}${data.audioUrl}"></video>
        </div>
        <div style="margin-bottom: 30px">
            ${articleContent}
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
            document.getElementById("J-word-container").addEventListener("click", ({ target }) => {
                if (target.classList.contains('J-furigana')) {
                    target.classList.toggle('hide');
                }
            });

            document.getElementById("J-word-reset").addEventListener("click", () => {
                document.querySelectorAll(".J-furigana").forEach((elem) => {
                    elem.classList.add("hide");
                });
            });
        </script>
    `;

    res.render('archive3', {
        title: data.title,
        content,
    });
};