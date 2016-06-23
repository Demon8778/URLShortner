var base61 = require('./url-shorten.js');
var Url = require('./models/urls');
var config = require('../config/database.js');
module.exports = function(app){

	

	app.post('/url/shorten', function(req, res){
		var longUrl = req.body.url
		var shortUrl = '';

		Url.findOne({long_url: longUrl}, function(err, url){
			if(url){
				shortUrl = config.webhost + base61.encode(url._id);
				res.send({'shortUrl': shortUrl});
			}

			else{
				var newUrl = Url({
					long_url: longUrl
				});

				newUrl.save(function(err){
					if(err){
						console.log(err);
					}

					shortUrl = config.webhost + base61.encode(newUrl._id);

					res.send({'shortUrl': shortUrl});
				});
			}
		})
	});

	app.get('/:encoded_id', function(req, res){
		var base61Id = req.params.encoded_id;
		var id = base61.decode(base61Id);

		Url.findOne({_id: id}, function(err, url){
			if(url){
				res.redirect(url.long_url);
			}
			else{
				res.redirect(config.webhost);
			}
		})
	});

	
}