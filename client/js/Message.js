/**
 * @param {HTMLElement} element
 */
var Message = function(element){
	this._element = element;
}

/**
 * @param {String} message
 */
Message.prototype.add = function(message){
	this._element.insertAdjacentHTML("afterbegin", "<span>" + message + "</span><br/>");
}