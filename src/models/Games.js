function Games() {
  this.items = [];
}

var gamesRootUrl = "https://games-world.herokuapp.com/";

Games.prototype.getAll = function() {
  var me = this;
  return $.get(gamesRootUrl + "games").then(function(response) {
    for (var i = 1; i < response.length; i++) {
      var game = new Game(response[i]);
      me.items.push(game);
    }
  });
};
