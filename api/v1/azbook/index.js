'use strict';

module.exports = (req, res) => {
  const books = JSON.parse(req.body.books);
  console.log(books);

  res.json({
    success: true
  });
};