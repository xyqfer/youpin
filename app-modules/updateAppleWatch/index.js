const { http } = require('app-libs');
const lark = require('app-libs/mail/sendLark');

module.exports = async () => {
    try {
        const data = await http.get({
            uri: 'https://www.apple.com.cn/shop/fulfillment-messages?parts.0=MKMX3CH%2FA&searchNearby=true&mt=regular&option.0=&store=R639&_=1635176710530',
            json: true,
        });
        const info = data.body.content.pickupMessage.stores[1].partsAvailability['MKMX3CH/A'].pickupSearchQuote

        try {
            // const res = await lark.sendText(process.env.LARK_USER, 'Apple Watch 有货啦！！！');
            const res = await lark.sendText(process.env.LARK_USER, info);
        } catch(err) {
            console.error(err);
        }

        return {
            success: true,
        };
    } catch(err) {
        console.error(err);
        return {
            success: false,
        };
    }
}
