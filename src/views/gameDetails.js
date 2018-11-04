var game = new Game();

game.id = getUrlParameter("_id");
game.getGameDetails().then(function() {
  console.log("Game details : ", game);
  // console.log("Game title : ", game.title);

  displayGame(game.id);
});

function displayGame() {

	$('.game-title').html(game.title);

	var image = document.querySelector('.game-image');
	image.src = game.imageUrl;

	$('.game-description').html(game.description);

	$('.game-genre').html(game.genre);

	$('.game-publisher').html(game.publisher);

	$('.game-release-date').html(game.releaseDate);
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}