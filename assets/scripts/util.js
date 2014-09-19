String.prototype.toTitleCase = function () {
	var string = "";
	var words = this.split(" ");
  	for(keyvar in words) {
 		string += ' ' + words[keyvar].substr(0,1).toUpperCase()
    	+ words[keyvar].substr(1,words[keyvar].length);
  	}
  	return string;
}