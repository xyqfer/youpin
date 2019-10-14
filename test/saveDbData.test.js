'use strict';

const init = require('./init');
init();

const { saveDbData } = require('app-libs/db');
const dbName = 'Test';

test('保存1条数据', async () => {
    expect.assertions(2);

    const now = Date.now();
    const data = [
        {
            a: now,
        },
    ];
    const result = await saveDbData({
        dbName,
        data,
    });

    expect(result.length).toBe(1);
    expect(result[0].a).toBe(now);
});

test('保存2条数据', async () => {
    expect.assertions(1);

    const data = [
        {
            a: Date.now(),
        },
        {
            a: Date.now() + 6,
        },
    ];
    const result = await saveDbData({
        dbName,
        data,
    });

    expect(result.length).toBe(2);
});

test('保存0条数据', async () => {
    expect.assertions(1);

    const data = [];
    const result = await saveDbData({
        dbName,
        data,
    });

    expect(result.length).toBe(0);
});

test('不传参报错', async () => {
    expect.assertions(1);

    try {
        await saveDbData();
    } catch (err) {
        expect(true).toBe(true);
    }
});

test('传空Object报错', async () => {
    expect.assertions(1);

    try {
        await saveDbData({});
    } catch (err) {
        expect(true).toBe(true);
    }
});

test('不传data不报错', async () => {
    expect.assertions(1);
    const result = await saveDbData({
        dbName,
    });

    expect(result.length).toBe(0);
});
