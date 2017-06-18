var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs');

var images = [];
request('http://www.fitedi.com.br/', function(err, res, body){
	if(!err && res.statusCode == 200){
		var $ = cheerio.load(body);
		$('img', 'div.galeria-home').each(function(){
		var img = $(this).attr('src');
		images.push(img);

		});
		//console.log(images);
		for (var i = 0; i < images.length; i++){
			request(images[i]).pipe(fs.createWriteStream('images/fitedi_imagem' + i + '.jpg'));
		}
	}
});	