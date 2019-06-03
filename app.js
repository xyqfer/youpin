'use strict';

const express = require('express');
const timeout = require('connect-timeout');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const AV = require('leanengine');

require('module-alias/register');

// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

const app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public', {
    etag: false,
    lastModified: false,
    setHeaders: function (res, path, stat) {
        res.set('Cache-Control', 'no-cache')
    }
}));

// 设置默认超时时间
app.use(timeout('600s'));

// 加载云引擎中间件
app.use(AV.express());

app.enable('trust proxy');
// 需要重定向到 HTTPS
app.use(AV.Cloud.HttpsRedirect());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(cookieParser());

app.use(cors({
    origin: '*',
}));

app.use((req, res, next) => {
    const ipAddress = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`${req.originalUrl}, user IP: ${ipAddress}`);
    next();
});

app.get('/', function (req, res) {
    res.render('index', {});
});

app.get('/archive', function (req, res) {
    const getDbData = require('app-libs/db/getDbData');
    const { id, render = 'archive' } = req.query;

    getDbData({
        dbName: 'Archive',
        limit: 1,
        query: {
            equalTo: ['uuid', id]
        }
    }).then(([{ title = '', content = '' }]) => {
        res.render(render, {
            title,
            content
        });
    }).catch(err => {
        console.error(err);
        res.render(render, {
            title: '',
            content: ''
        });
    });
});

app.get('/bbcproxy', async function (req, res) {
    try {
        const { http } = require('app-libs');
        const cheerio = require('cheerio');
        const utils = require('./app-modules/bbc/utils');
        const render = 'archive';
        const { url } = req.query;
        const htmlString = await http.get(url);
        const $ = cheerio.load(htmlString);
        const title = $('.story-body__h1').text();

        res.render(render, {
            title,
            content: utils.ProcessFeed($, url),
        });
    } catch(err) {
        console.error(err);
        res.render(render, {
            title: '',
            content: ''
        });
    }
});

app.use('/api', require('./api/index'));

app.use(function (req, res, next) {
    // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
    if (!res.headersSent) {
        let err = new Error('Not Found');

        err.status = 404;
        next(err);
    }
});

// error handlers
app.use(function (err, req, res, next) {
    if (req.timedout && req.headers.upgrade === 'websocket') {
        // 忽略 websocket 的超时
        return;
    }

    let statusCode = err.status || 500;

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
        error: error
    });
});

module.exports = app;