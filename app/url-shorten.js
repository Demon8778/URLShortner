var base = "1234567890abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var length = base.length;

function encode(id){ 
	var encoded = "";
	while(id){
		var remainder = id % length;
		id = Math.floor(id/length);
		encoded = base[remainder].toString() + encoded;
	}
	return encoded;
}

function decode(string){
	var decoded = 0;
	while(string){
		var index = base.indexOf(string[0]);
		var power = string.length - 1;
		decoded += index*(Math.pow(base, power));
		string = string.substring(1);
	}
	return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;

