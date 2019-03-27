const request = require("request");
const cheerio = require("cheerio");

request('https://m.blog.naver.com/kangminser88/221146020394', function (error, response, body) {
  var $ = cheerio.load(body);

  var username = $('.txt_area').text()
  console.log(username)
});
