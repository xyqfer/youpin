const init = require('../init');
const setEnv = require('../setEnv');

init();
setEnv('production');

const params = require('app-libs/params');
const isObject = require('lodash/isObject');

test('isProd测试', () => {
    expect(isObject(params.env)).toBe(true);
    expect(params.env.isProd).toBe(true);
});
