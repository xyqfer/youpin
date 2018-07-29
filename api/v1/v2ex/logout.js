'use strict';

/**
 * 退出登录
 */
module.exports = (req, res) => {
  res.clearCookie('A2');
  res.json({
    success: true,
    data: {},
  });
};