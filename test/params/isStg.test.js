const init = require('../init');
const setEnv = require('../setEnv');

init();
setEnv('stage');

const params = require('app-libs/params');
const isObject = require('lodash/isObject');

test('isStg测试', () => {
    expect(isObject(params.env)).toBe(true);
    expect(params.env.isStg).toBe(true);
});