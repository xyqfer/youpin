const init = require('../init');
init();

const params = require('app-libs/params');
const isObject = require('lodash/isObject');

test('isDev测试', () => {
    expect(isObject(params.env)).toBe(true);
    expect(params.env.isDev).toBe(true);
});