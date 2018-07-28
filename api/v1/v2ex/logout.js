'use strict';

/**
 * 退出登录
 */
module.exports = (req, res) => {
  res.append('Set-Cookie', 'A2=');
  res.json({
    success: true,
    data: {},
  });
};