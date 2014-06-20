User = function(socketId){
    this._nick = "";
    this._cookie = "";
    this._status = "";
    this._socketId = socketId;
}

User.prototype.setNick = function(nick){
    this._nick = nick;
}

User.prototype.getNick = function(){
    return this._nick;
}

User.prototype.setStatus = function(status){
    this._status = status;
}

User.prototype.getStatus = function(){
    return this._status;
}

User.prototype.setCookie = function(cookie){
    this._cookie = cookie;
}

User.prototype.getCookie = function(){
    return this._cookie;
}

User.prototype.getSocketId = function(){
    return this._socketId;
}

User.prototype.setSocketId = function(socketId){
    this._socketId = socketId;
}
