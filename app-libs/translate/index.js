const qs = require('qs');
const http = require('../http');
const { getTK } = require('./utils');

const translate = async (params) => {
  const text = params.q.reduce((acc, item) => {
    return acc + item;
  }, '');
  const tk = getTK(text);
  const body = qs.stringify(params.q, {
    encoder: (str, defaultEncoder, charset, type) => {
      return type === 'key' ? 'q' : encodeURIComponent(str);
    }
  });
  let res = await http.post({
    uri: `https://translate.googleapis.com/translate_a/t?anno=3&client=te_lib&format=html&v=1.0&key=${process.env.GOOGLE_TRANSLATE_KEY}&logld=vTE_20200506_00&sl=en&tl=zh-CN&sp=nmt&tc=1&sr=1&tk=${tk}&mode=1`,
    headers: {
      'User-Agent': 'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/86.0.4240.93 Mobile/15E148 Safari/604.1',
      'Accept-Language': 'en,zh-CN;q=0.9,zh;q=0.8,ja;q=0.7,zh-TW;q=0.6',
    },
    body
  });

  res = JSON.parse(res);
  return params.q.length > 1 ? res : [res];
};

module.exports = translate;