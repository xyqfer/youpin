const { http } = require('app-libs');

module.exports = async () => {
    http.get(`${process.env.COUNTER_SERVER}/add`);

    return {
      success: true,
    };
};
