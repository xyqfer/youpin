'use strict';

const init = require('./init');
init();

const wake = require('../app-modules/wake');

test('调用成功', () => {
    const result = wake();
    expect(result.success).toBe(true);
});
