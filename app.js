'use strict';

const express = require('express');
const timeout = require('connect-timeout');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const AV = require('leanengine');
const expressWs = require('express-ws');
const deployMiddleware = require('@xyqfer/deploy-middleware');
const leancloudGraphQL = require('@xyqfer/leancloud-graphql-express-middleware').express;
const bluebird = require('bluebird');

global.Promise = bluebird;

require('module-alias/register');
const { params } = require('app-libs');

// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

const app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

// 设置默认超时时间
app.use(timeout('600s'));

// 加载云引擎中间件
app.use(AV.express());

app.enable('trust proxy');
// 需要重定向到 HTTPS
app.use(AV.Cloud.HttpsRedirect());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());

app.use(
    cors({
        origin: '*',
    })
);

app.use((req, res, next) => {
    const ipAddress = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`${req.originalUrl}, user IP: ${ipAddress}`);
    next();
});

const GRAPHQL_TOKEN = params.env.isProd ? process.env.GRAPHQL_TOKEN : '';
app.use(
    `/graphql${GRAPHQL_TOKEN}`,
    leancloudGraphQL({
        graphiql: params.env.isDev,
    })
);

app.use(
    deployMiddleware({
        path: '/api/v1/deploy',
    })
);

app.get('/', function(req, res) {
    res.render('index', {});
});

app.get('/archive', function(req, res) {
    const { getDbData } = require('app-libs/db');
    const { id, render = 'archive' } = req.query;

    getDbData({
        dbName: 'Archive',
        limit: 1,
        query: {
            equalTo: ['uuid', id],
        },
    })
        .then(([{ title = '', content = '' }]) => {
            res.render(render, {
                title,
                content,
            });
        })
        .catch((err) => {
            console.error(err);
            res.render(render, {
                title: '',
                content: '',
            });
        });
});

app.get('/archives', function(req, res) {
    const { token } = req.query;
    if (token !== process.env.ARCHIVES_TOKEN) {
        res.status(400).send('Bad Request');
        return;
    }

    const { getDbData } = require('app-libs/db');

    getDbData({
        dbName: 'Archive',
        limit: 200,
        query: {
            descending: ['createdAt'],
        },
    })
        .then((archives) => {
            const content = archives.reduce((acc, item) => {
                acc += `
                <div style="margin-bottom: 50px">
                    <a href="${process.env.hostName}/archive?id=${item.uuid}&render=archive" target="_blank" rel="noreferrer">
                        <h4>${item.title}</h4>
                    </a>
                    <h5>${item.createdAt}</h5>
                </div>
            `;

                return acc;
            }, '');

            res.render('archive', {
                title: 'Archives',
                content,
            });
        })
        .catch((err) => {
            console.error(err);
            res.render('archive', {
                title: '',
                content: '',
            });
        });
});

app.get('/notes', async (req, res) => {
    const { token } = req.query;
    if (token !== process.env.NOTES_TOKEN) {
        res.send('err');
        return;
    }

    const { getDbData } = require('app-libs/db');

    try {
        const notes = await getDbData({
            dbName: 'Notes',
            limit: 50,
            query: {
                descending: ['createdAt'],
            },
        });

        res.render('notes', {
            title: 'Notes',
            notes,
            token,
        });
    } catch (err) {
        console.error(err);
        res.render('archive', {
            title: '',
            content: '',
        });
    }
});

app.post('/note', async (req, res) => {
    const { token, message } = req.body;
    if (token !== process.env.NOTES_TOKEN) {
        res.status(400).send('Bad Request');
        return;
    }

    const { saveDbData } = require('app-libs/db');

    try {
        await saveDbData({
            dbName: 'Notes',
            data: [
                {
                    message,
                },
            ],
        });
        res.json({
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(400).send('Bad Request');
    }
});

app.get('/theinitium', async (req, res) => {
    const cheerio = require('cheerio');
    const { slug } = req.query;

    const render = 'archive';
    try {
        const { http, params } = require('app-libs');
        const response = await http.get({
            uri: `https://api.theinitium.com/api/v1/article/detail/?language=zh-hans&slug=${slug}`,
            json: true,
            headers: {
                'User-Agent': params.ua.pc,
                Authorization: `Basic ${process.env.THEINITIUM_TOKEN}`,
            },
        });

        const $ = cheerio.load(response.content);
        $('img').each(function() {
            const $elem = $(this);
            const src = $elem.attr('src');

            if (!src.startsWith('data:')) {
                $elem.attr('src', process.env.IMAGE_PROXY + src);
            }
        });

        res.render(render, {
            title: response.headline,
            content: $.html(),
        });
    } catch (err) {
        console.error(err);
        res.render(render, {
            title: '',
            content: '',
        });
    }
});

app.get('/bbcproxy', async function(req, res) {
    const render = 'archive';

    try {
        const { http } = require('app-libs');
        const cheerio = require('cheerio');
        const utils = require('./app-modules/bbc/utils');

        const { url } = req.query;
        const htmlString = await http.get(url);
        const $ = cheerio.load(htmlString);
        const title = $('.story-body__h1').text();

        res.render(render, {
            title,
            content: utils.ProcessFeed($, url),
        });
    } catch (err) {
        console.error(err);
        res.render(render, {
            title: '',
            content: '',
        });
    }
});

app.use('/api', require('./api/index'));

app.get('/youtube/transcript', require('./routes/youtube/transcript'));

expressWs(app);

app.ws('/echo', function(ws) {
    ws.on('message', function(msg) {
        ws.send(msg);
        setTimeout(() => {
            ws.send(msg + 1);
            setTimeout(() => {
                ws.send(msg + 2);
            }, 2000);
        }, 1000);
    });
});

app.use(function(req, res, next) {
    // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
    if (!res.headersSent) {
        console.log(req.url);
        const err = new Error('Not Found');

        err.status = 404;
        next(err);
    }
});

// error handlers
app.use(function(err, req, res) {
    if (req.timedout && req.headers.upgrade === 'websocket') {
        // 忽略 websocket 的超时
        return;
    }

    const statusCode = err.status || 500;

    if (statusCode === 500) {
        console.error(err.stack || err);
    }

    if (req.timedout) {
        console.error(`请求超时: url=${req.originalUrl}, timeout=${err.timeout}, 请确认方法执行耗时很长，或没有正确的 response 回调。`);
    }

    res.status(statusCode);

    // 默认不输出异常详情
    let error = {};

    if (app.get('env') === 'development') {
        // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
        error = err;
    }

    res.render('error', {
        message: err.message,
        error: error,
    });
});

module.exports = app;
