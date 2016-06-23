var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CounterSchema = Schema({
	_id: {type: String, required: true},
	seq: {type: Number, default: 0}
});

var counter = mongoose.model('Counter', CounterSchema);

var urlSchema = Schema({
	_id: {type: Number, index: true},
	long_url: String,
	created_at: Date
});

urlSchema.pre('save', function(next){
	var doc = this;
	counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1}}, function(err, response){
		if(err)
			return next(err);
		doc._id = response.seq;
		doc.created_at = new Date();
		next();
	});
});

module.exports = mongoose.model('Url', urlSchema);


