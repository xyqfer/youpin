const init = require('../init');
init();

const params = require('app-libs/params');
const isString = require('lodash/isString');
const isObject = require('lodash/isObject');

test('ua测试', () => {
    expect(isObject(params)).toBe(true);
    expect(isObject(params.ua)).toBe(true);
    expect(isString(params.ua.mobile)).toBe(true);
    expect(isString(params.ua.pc)).toBe(true);
    expect(isString(params.ua.youpin)).toBe(true);
});