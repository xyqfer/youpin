'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const {
        params,
        http
    } = require('app-libs');

    const parseWeather = ($elem) => {
        const time = $elem.find('dl').text();
        const timeLabel = $elem.find('.week').text();
        const air = $elem.find('.air b').attr('title');
        const weatherImg = 'https:' + $elem.find('.img > img').attr('src');
        const weatherText = $elem.find('.temp').text();
        const temperature = $elem.find('.txt').eq(0).text();
        const [lowestTemperature, highestTemperature] = temperature.split('~').map(item => {
            return item.trim().replace('℃', '')
        });

        return {
            time,
            timeLabel,
            air,
            weatherImg,
            weatherText,
            temperature,
            lowestTemperature,
            highestTemperature,
        };
    };
    const getCompareText = (num) => {
        if (num > 0) {
            return '高';
        } else {
            return '低';
        }
    };

    try {
        const htmlString = await http.get({
            uri: 'https://www.tianqi.com/tianhequ/7/',
            headers: {
                'User-Agent': params.ua.pc
            },
        });
        const $ = cheerio.load(htmlString);
        const $weatherList = $('.weatherbox2 > .table_day7');
        const todayWeather = parseWeather($weatherList.eq(0));
        const tomorrowWeather = parseWeather($weatherList.eq(1));
        const highestTemperatureDiff = tomorrowWeather.highestTemperature - todayWeather.highestTemperature;
        const lowestTemperatureDiff = tomorrowWeather.lowestTemperature - todayWeather.lowestTemperature;
        const desc = `
            明天(${tomorrowWeather.time})天气${tomorrowWeather.weatherText}<br>
            气温${tomorrowWeather.temperature}, 最低温比今天${getCompareText(lowestTemperatureDiff)}${Math.abs(lowestTemperatureDiff)}度, 最高温比今天${getCompareText(highestTemperatureDiff)}${Math.abs(highestTemperatureDiff)}度<br><br>
            今天(${todayWeather.time})天气${todayWeather.weatherText}, 气温${todayWeather.temperature}
        `;

        return desc;
    } catch (err) {
        console.error(err);
        return '';
    }
};