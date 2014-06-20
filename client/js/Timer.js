var Timer = function(callbackEverySecond){
	this._seconds = 30;
	this._callbackEverySecond = callbackEverySecond;
	this._setTimoutId = null;
}

/**
 * @param {Number} seconds
 */
Timer.prototype.reset = function(seconds){
	this.stop();
	this._seconds = seconds;
	this.start();
};

Timer.prototype.start = function(){
	this._setTimoutId = window.setInterval(this.decrease.bind(this), 1000);
};

Timer.prototype.decrease = function(){
	this._seconds--;

	if (this._seconds < 0) {
		this.stop();
	};

	this._callbackEverySecond(this._seconds);
};

Timer.prototype.stop = function(){
	window.clearInterval(this._setTimoutId);
};