const Kuroshiro = require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    const { content } = req.body;

    try {
        const kuroshiro = new Kuroshiro();
        await kuroshiro.init(new KuromojiAnalyzer());

        const result = await kuroshiro.convert(content, { 
            to: 'hiragana',
            mode: 'furigana',
        });
        const $ = cheerio.load(`<div>${result}</div>`, {
            decodeEntities: false,
        });
        $('ruby rp').remove();
        const htmlContent = $('div').eq(0).html();

        res.json({
            success: true,
            data: {
                htmlContent,
            },
        });
    } catch (err) {
        console.error(err);
        res.json({
            success: false,
        });
    }
};