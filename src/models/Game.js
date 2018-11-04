function Game(options = {}) {
  this._id = options._id;
  this.title = options.title;
  this.description = options.description;
  this.imageUrl = options.imageUrl;
  this.genre = options.genre;
  this.publisher = options.publisher;
  this.releaseDate = options.releaseDate;
}

var gamesRootUrl = "https://games-world.herokuapp.com/";

Game.prototype.getGameDetails = function() {
  var me = this;
  return $.get(gamesRootUrl + "games/" + me.id).then(function(response) {
    console.log("Game", response);
    me.id = response.id;
    me.title = response.title;
    me.description = response.description;
    me.imageUrl = response.imageUrl;
    me.genre = response.genre;
    me.publisher = response.publisher;
    me.releaseDate = response.releaseDate;
  });
};

Game.prototype.newGame = function () {
  return $.post({
    url: gamesRootUrl + "games",
    data: {
      title: this.title,
      description: this.description,
      image: this.imageUrl
    }
  });
}


Game.prototype.deleteGame = function() {
  return $.ajax({
    url: gamesRootUrl + "games/" + this._id,
    method: "DELETE"
  });
};

Game.prototype.updateGame = function() {
  return $.ajax({
    url: gamesRootUrl + "games/" + this._id,
    method: "PUT",
    data: {
      title: this.title,
      description: this.description
    }
  });
};

Game.prototype.regenerateGames = function () {
  return $.ajax({
    url: gamesRootUrl + "regenerate-games",
    method: "GET"
  });
}
