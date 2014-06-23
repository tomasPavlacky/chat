var Chat = function(dom){
	this._dom = dom;
	this._nick = "Guest";
	socket.emit("connect", document.cookie);
	socket.on("refreshUsers", this.usersToHTML.bind(this));
	socket.on("broadcastMessage", this.broadcastMessageToHTML.bind(this));
	socket.on("userEnter", this.userEnter.bind(this));
	socket.on("setCookie", this.setCookie.bind(this));

	this._dom.message.form.addEventListener("submit", this);

	this._dom.message.focus();
}

Chat.prototype.setCookie = function(cookie) {
	document.cookie = cookie;
}

Chat.prototype.userEnter = function(data){
	this._dom.messages.insertAdjacentHTML("beforeend", "<span class='system'>uzivatel " + data.nick + " vstoupil do mistnosti</span>")
}

Chat.prototype.usersToHTML = function(users){
	this._dom.users.innerHTML = "";

	for (var i = 0; i < users.length; i++) {
		this._dom.users.insertAdjacentHTML("beforeend", "<div class='nick " + (users[i].status == "offline" ? "hide" : " ") + " '>" + users[i].nick + "</div>")
	}
}

Chat.prototype.broadcastMessageToHTML = function(message){
	var div = this._dom.messages;

	if (div.scrollHeight == div.scrollTop + div.offsetHeight) {
		div.insertAdjacentHTML("beforeend", "<div><span class='time'>" + message.time + "</span> <span class='author'>" + message.author + ": </span> <span class='message'>" + message.text + "</span></div>");
		div.scrollTop = div.scrollHeight;
	}else{
		div.insertAdjacentHTML("beforeend", "<div><span class='time'>" + message.time + "</span> <span class='author'>" + message.author + ": </span> <span class='message'>" + message.text + "</span></div>");
	}
}

Chat.prototype.handleEvent = function(e){
	if (e.type == "submit") {
		socket.emit("message", {text: this._dom.message.value});
		this._dom.message.value = "";
		e.preventDefault();
	};
}

Chat.System = function(dom){
	this._dom = dom;

	socket.on("systemMessage", this.enterMessage.bind(this));
}

/**
 * @param  {String} message [description]
 */
Chat.System.prototype.enterMessage = function(message){
	this._dom.messages.insertAdjacentHTML("beforeend", "<div class='system'>" + message + "</div>")
}
