MessageType = function(){
    this._regExps = {
        email: /((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g
    }
}

/**
 * @param  {{}}  message
 * @return {Boolean}
 */
MessageType.prototype.addType = function(message){
    message.type = "text"; // vychozi stav

    for (var key in this._regExps) {
        if (this._regExps[key].test(message.text)) {
            message.type = key;
            message = this["_"+key](message);
        };
    };

    return message;
}

MessageType.prototype._email = function(message){
    message.textWrapped = message.text.replace(this._regExps.email, "<a href='mailto:$1'>$1</a>");

    return message;
}
