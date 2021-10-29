const { http } = require('app-libs');
const lark = require('app-libs/mail/sendLark');

module.exports = async () => {
    try {
        const data = await http.get({
            uri: 'https://www.apple.com.cn/shop/fulfillment-messages?parts.0=MKMX3CH%2FA&searchNearby=true&mt=regular&option.0=&store=R639&_=1635176710530',
            json: true,
        });
        const info0 = data.body.content.pickupMessage.stores[0].partsAvailability['MKMX3CH/A'].pickupSearchQuote
        const info1 = data.body.content.pickupMessage.stores[1].partsAvailability['MKMX3CH/A'].pickupSearchQuote

        if (info0 !== '不可取货' || info1 !== '不可取货') {
            try {
                const res = await lark.sendText(process.env.LARK_USER, 'Apple Watch 有货啦！！！');
            } catch(err) {
                console.error(err);
            }
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
