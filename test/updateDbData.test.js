'use strict';

const init = require('./init');
init();

const { updateDbData } = require('app-libs/db');
const dbName = 'Test';
const id = '5aa87acf9f5454006a1ee6f8';

test('更新数据', async () => {
    expect.assertions(1);

    const now = Date.now();
    const data = {
        a: now
    };
    const result = await updateDbData({
        dbName,
        id,
        data
    });
    expect(result.a).toBe(now);
});

test('不传参报错', async () => {
    expect.assertions(1);

    try {
        await updateDbData();
    } catch (err) {
        expect(true).toBe(true);
    }
});

test('传空Object报错', async () => {
    expect.assertions(1);

    try {
        await updateDbData({});
    } catch (err) {
        expect(true).toBe(true);
    }
});

test('不传data不报错', async () => {
    expect.assertions(1);
    await updateDbData({
        dbName,
        id
    });

    expect(true).toBe(true);
});

test('不传id报错', async () => {
    expect.assertions(1);

    try {
        await updateDbData({
            dbName
        });
    } catch (err) {
        expect(true).toBe(true);
    }
});