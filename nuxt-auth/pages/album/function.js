const request = require("request");
const cheerio = require("cheerio");
const cors = require('cors')({origin: true});
var url_string = 'http://www.melon.com/album/detail.htm?albumId='

      url_string = url_string + '2451'
      request(url_string, function (error, response, body) {
      
      var $ = cheerio.load(body);
      console.log(url_string)

      var album_Id = $('#btnLike').attr('data-album-no')
      var album_name = $('.song_name').not('strong').text().replace(/\t/gi,"").replace(/\n/gi,"").replace("앨범명","")
      var artist_id_parent = $('.artist').children('a')
      var artist_id = artist_id_parent.attr('href').replace(/[^0-9]/g,"");
      var artist_name = $('.artist').text().replace(/\t/gi,"").replace(/\n/gi,"")
      var thumbnail_parent = $('.thumb').find('img')
      var thumbnail = thumbnail_parent.attr('src')
      var released_date_parent = $('.list').find('dd')
      var released_date = released_date_parent.eq(0).text()
      var genre = $('.list').children('dd').eq(1).text()
      var label = $('.list').children('dd').eq(2).text()
      var agency = $('.list').children('dd').eq(3).text()

      res.set('Access-Control-Allow-Origin', "*")
      res.set('Access-Control-Allow-Methods', 'GET, POST')
      res.set('Access-Control-Allow-Headers', 'Content-Type')
      res.status(200).send({ json_album_Id: album_Id
        , json_album_name: album_name,
        json_artist_id: artist_id,
        json_artist_name: artist_name,
        json_thumbnail: thumbnail,
        json_released_date: released_date,
        json_genre: genre,
        json_label: label,
        json_agency: agency
       });
    });
