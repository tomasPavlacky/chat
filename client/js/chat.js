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
	var newDiv = document.createElement("div");
	var spanTime = document.createElement("span");
	var spanAuthor = document.createElement("span");
	var spanMessage = document.createElement("span");
	spanTime.classList.add("time");
	spanTime.innerHTML = message.time;
	spanAuthor.classList.add("author");
	spanAuthor.innerHTML = message.author + ": ";
	spanMessage.classList.add("message");
	spanMessage.innerText = message.text;

	newDiv.appendChild(spanTime);
	newDiv.appendChild(spanAuthor);
	newDiv.appendChild(spanMessage);

	div.appendChild(newDiv);

	// jestli neni odscrollovano tak posuneme scrollTop dolu
	if (div.scrollHeight == div.scrollTop + div.offsetHeight) { div.scrollTop = div.scrollHeight; }

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
