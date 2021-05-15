'use strict';

async function makeText(text) {
    const puppeteer = require('puppeteer-core');
    const { params } = require('app-libs');
    const filename = `./${Date.now()}.png`;
    let config = {};

    if (params.env.isDev) {
        config = {
            executablePath: '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
        };
    } else {
        config = {
            executablePath: '/usr/bin/google-chrome',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        };
    }

    const browser = await puppeteer.launch(config);

    const page = await browser.newPage();
    await page.goto(`${process.env.hostName}/bigText/index.html`);

    if (text.length < 10) {
        await page.setViewport({ width: 460, height: 460 });
    } else {
        await page.setViewport({ width: 1000, height: 1000 });
    }

    await page.evaluate((text) => {
        if (text.startsWith('serif`')) {
            /* eslint-disable no-undef */
            serif();
            text = text.substr(6);
            /* eslint-disable no-undef */
            set(text);
        } else {
            /* eslint-disable no-undef */
            set(text);
        }
    }, text);

    await page.screenshot({
        fullPage: true,
        path: filename,
        omitBackground: true,
    });

    await browser.close();
    return filename;
}

module.exports = (req, res) => {
    const fs = require('fs');
    const { text = '' } = req.query;

    makeText(text)
        .then((filename) => {
            fs.readFile(filename, function(err, buffer) {
                if (err) {
                    res.end(err.message);
                } else {
                    res.setHeader('Content-Type', 'image/png');
                    res.end(buffer);

                    setTimeout(() => {
                        fs.unlinkSync(filename);
                    }, 1000);
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.end(err.message);
        });
};
