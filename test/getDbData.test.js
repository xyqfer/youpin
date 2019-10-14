'use strict';

const init = require('./init');
init();

const { getDbData } = require('app-libs/db');
const dbName = 'Test';

test('获取数据', async () => {
    expect.assertions(1);

    const dbData = await getDbData({
        dbName,
    });
    expect(dbData.length).toBeGreaterThan(0);
});

test('获取两条数据', async () => {
    expect.assertions(1);

    const limit = 2;
    const dbData = await getDbData({
        dbName,
        limit,
    });
    expect(dbData.length).toBe(limit);
});

test('查询', async () => {
    expect.assertions(2);

    const a = 1;
    const dbData = await getDbData({
        dbName,
        query: {
            equalTo: ['a', a],
        },
    });
    expect(dbData.length).toBe(1);
    expect(dbData[0].a).toBe(a);
});

test('不传参报错', async () => {
    expect.assertions(1);

    try {
        await getDbData();
    } catch (err) {
        expect(true).toBe(true);
    }
});

test('传空Object报错', async () => {
    expect.assertions(1);

    try {
        await getDbData({});
    } catch (err) {
        expect(true).toBe(true);
    }
});
