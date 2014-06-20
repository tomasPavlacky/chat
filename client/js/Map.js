/**
 * @param {[type]} size //@todo
 * @param {String} gameId
 * @param {Game} game
 */
var Map = function(size, gameId, game){
	this._size = size;
	this._gameId = gameId;
	this._game = game;
	this._screen3 = document.querySelector("#screen3");
	this._overlay = document.querySelector("#overlay");
};

/**
* @param {HTMLElement} 	place
*/
Map.prototype.render = function(place){
	var table = "<table>";

	for (var j = 0; j < this._size[0]; j++) {
		var row = "<tr data-row=" + j+ ">";

		for (var i = 0; i < this._size[1]; i++) {
			row += "<td data-col=" + i+ ">&nbsp;</td>";
		}

		row += "</tr>";
		table += row;
	}

	table += "</table>";

	place.insertAdjacentHTML("beforeend", table);
};

/**
* @param {HTMLElement} 	place
* @param {[[]]} 	fleet
*/
Map.prototype.renderFleet = function(place, fleet){
	for (var j = 0; j < fleet.length; j++) {
		place.querySelector("[data-row='" + fleet[j][0] + "'] [data-col='" + fleet[j][1] + "']").innerHTML = "o";
	}
}

/**
 * @param  {{}} data
 */
Map.prototype.renderHit = function(data){
	var ship = document.querySelector("#map2 [data-row='" + data.pos[1] + "'] [data-col='" + data.pos[0] + "']");
	ship.classList.add("hit");
	ship.innerHTML = "x";

	sound.play("explosion");
	message.add("Trefil jsi !");
}

/**
 * @param  {{}} data
 */
Map.prototype.renderYouHaveBeenHit = function(data){
	var ship = document.querySelector("#map1 [data-row='" + data.pos[1] + "'] [data-col='" + data.pos[0] + "']");
	ship.classList.add("hit");
	ship.innerHTML = "x";

	sound.play("explosion");
	message.add("Byl jsi zasažen !");
}

/**
 * @param  {{}} data
 */
Map.prototype.renderMiss = function(data){
	var cell = document.querySelector("#map2 [data-row='" + data.pos[1] + "'] [data-col='" + data.pos[0] + "']");
	cell.classList.add("miss");

	sound.play("miss");
	message.add("Minul jsi !");
}

/**
 * @param  {Number} time
 */
Map.prototype.renderTimer = function(time){
	document.querySelector("#clock").innerHTML = time;
}

/**
 * @param  {{}} data
 */
Map.prototype.renderYouHaveBeenMiss = function(data){
	var cell = document.querySelector("#map1 [data-row='" + data.pos[1] + "'] [data-col='" + data.pos[0] + "']");
	cell.classList.add("miss");

	sound.play("miss");
	message.add("Protihráč se netrefil !");
}

/**
 * @param  {{}} data
 */
Map.prototype.renderEndGame = function(data){
	message.add("Konec Hry."); // @todo pekny game over
}

Map.prototype.renderYouLose = function(){
	this._screen3.innerHTML = "<p class='code'>Byl jsi poražen :-(</p>";
	this._screen3.classList.remove("hide");
	this._overlay.classList.remove("hide");
}

Map.prototype.renderYouWin = function(){
	this._screen3.innerHTML = "<p class='code'>Tuto bitvu jsi vyhrál.</p>";
	this._screen3.classList.remove("hide");
	this._overlay.classList.remove("hide");
}

/**
* @param {HTMLElement} 	place
*/
Map.prototype.addListenersOnTd = function(place){
	var tds = place.querySelectorAll("td");

	for (var i = 0; i < tds.length; i++) {
		tds[i].addEventListener("click", this);
	}
}

/**
* @param {Event} 	place
*/
Map.prototype.handleEvent = function(e){
	// shoot
	var col = e.target.getAttribute("data-col");
	var row = e.target.parentElement.getAttribute("data-row");

	socket.emit('shoot', {pos: [col, row], gameId: this._gameId});
	e.srcElement.classList.add("empty");
	e.srcElement.removeEventListener("click", this);
}

