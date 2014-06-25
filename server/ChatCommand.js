Chat.Command = function(chat){
    this._chat = chat;
}

/**
 * @param  {String} message
 * @param  {{}} socket
 */
Chat.Command.prototype.parse = function(message, socket){
    if (/^\/nick [a-zA-Z0-9]+/.test(message)) {
        var newNick = message.replace("/nick ", "");
        var user = this._chat.getUserOverSocketId(socket.id);
        var oldNick = user.getNick();
        user.setNick(newNick);

        socket.broadcast.emit("systemMessage", "Uživatel " + oldNick + " je nyní " + newNick);
        socket.emit("systemMessage", "Uživatel " + oldNick + " je nyní " + newNick);
        socket.broadcast.emit("refreshUsers", this._chat.getUsers());
        socket.emit("refreshUsers", this._chat.getUsers());
    }
}


/**
 * @param  {String}  message
 * @return {Boolean}
 */
Chat.Command.prototype.isCommand = function(message){
    return (message.charAt(0) == "/");
}

