/**
 * @param {[]} 		sounds
 * @param {String} 	path
 */
var Sound = function(sounds, path){
	this._sounds = sounds;
	this._path = path;
	this._suffix = undefined;
	this._audioElements = {};

	this._detectSuffix();
	this._autoload();
}

Sound.prototype._detectSuffix = function(){
	var audio = document.createElement("audio");

	if (typeof audio.canPlayType === "function" && audio.canPlayType("audio/ogg") !== "") { this._suffix = ".ogg" };
	if (typeof audio.canPlayType === "function" && audio.canPlayType("audio/mpeg") !== "") { this._suffix = ".mp3" };
}

Sound.prototype._autoload = function(){
	for (var i = 0; i < this._sounds.length; i++) {
		this._audioElements[this._sounds[i]] = new Audio(this._path + "/" + this._sounds[i] + this._suffix);
		this._audioElements[this._sounds[i]].load();
	}
}

Sound.prototype.play = function(name){
	this._audioElements[name].cloneNode().play();
}