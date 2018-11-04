var games = new Games();

getGames();
function getGames() {
  games.getAll().then(function() {
    console.log("List", games.items);
    displayGames(games.items);
  });
}

function displayGames(response) {
  var template = document.getElementById("template");
  var gamesContainer = document.getElementById("games");
  var regenerateGamesContainer = document.getElementById("regenerate-games");
  // traverse the array (parcurgerea sirului)
  for (var i = 0; i < response.length; i++) {
    // clone the template; copy template's children as well (deep parameter = true)
    var gamesClone = template.cloneNode(true);

    // set a unique id for each article
    gamesClone.id = "game_" + response[i]._id;

    // populate the cloned template
    var gameTitleElement = gamesClone.querySelector(".game-title");
    gameTitleElement.innerHTML = response[i].title;

    var gameDescriptionElement = gamesClone.querySelector(".game-description");
    gameDescriptionElement.innerHTML = response[i].description;

    var gameImageElement = gamesClone.querySelector(".game-image");
    gameImageElement.src = response[i].imageUrl;

    var deleteButton = gamesClone.querySelector(".game-delete");

    //callbacks from event listeners receive as parameter the event that just happened
    deleteButton.addEventListener("click", function(event) {
      // console.log("event", event);

      var theGame = event.target.parentNode.parentNode;
      var theGameId = theGame.id;

      var gameId = theGameId.replace("game_", "");
      //call delete article model
      var game = new Game({ _id: gameId });
      // event.target = the button that we clicked
      // the clicked button has a div as parent, and that has the game as parent
      // var game = getGameById(event);
      //call delete article model
      game.deleteGame().then(function() {
        removeGameFromDOM(response, theGame);
      });
    });

    var editButton = gamesClone.querySelector(".game-edit");
    // this sends the event as parameter to updateArticleOnClick function
    editButton.addEventListener("click", updateGameOnClick);

    var getGameDetailsButton = gamesClone.querySelector(".game-details");
    getGameDetailsButton.addEventListener("click", function getGameDetailsOnClick(){  

  var theGame = event.target.parentNode.parentNode;
  var theGameId = theGame.id;
  var gameId = theGameId.replace("game_", "");
  
  window.location= 'games-details.html?_id=' + gameId;
});

    // append the clone to the articles container
    gamesContainer.appendChild(gamesClone);
  }

  var newGameButton = document.querySelector(".game-addNewGame");
  newGameButton.addEventListener("click", newGameOnClick);

  var regenerateGamesButton = regenerateGamesContainer.querySelector(".game-regenerateGames");
    regenerateGamesButton.addEventListener("click", function(event){
        var game = getGameById(event);
        game.regenerateGames().then(function() {
        window.location.reload();
        console.log("refresh", response);
        });
    });
  // remove the template from DOM
  template.remove();
}

function getGameById (event){
      var theGame = event.target.parentNode.parentNode;
      var theGameId = theGame.id;

      var gameId = theGameId.replace("game_", "");
      //call delete article model
      var game = new Game({ _id: gameId });
      return game;
  }

function removeGameFromDOM(response, theGame) {
  console.log("deleted", response);
  theGame.remove();
}



function updateGameOnClick(event) {
  // event.target is the clicked button
  // disable the button so we can't click it several times
  event.target.disabled = true;

  var theGame = event.target.parentNode.parentNode; // the article
  var theGameId = theGame.id;
  var gameId = theGameId.replace("game_", "");

  var inputTitle = document.createElement("input");
  inputTitle.setAttribute("class", "new-title");
  inputTitle.setAttribute("style", "width: 80%"); // the default width is too small
  inputTitle.value = theGame.querySelector(".game-title").innerText;
  theGame.appendChild(inputTitle);

  var inputDescription = document.createElement("textarea");
  inputDescription.setAttribute("class", "new-body");
  inputDescription.setAttribute("style", "width: 80%");
  inputDescription.value = theGame.querySelector(".game-description").innerText;
  theGame.appendChild(inputDescription);

  var updateButton = document.createElement("button");
  updateButton.innerText = "Update";
  theGame.appendChild(updateButton);

  updateButton.addEventListener("click", function() {
    var game = new Game({
      _id: gameId,
      title: inputTitle.value,
      description: inputDescription.value
    });
    game.updateGame().then(function(response) {
      console.log("edited", response);

      // populate items with the response from the API
      theGame.querySelector(".game-title").innerText = response.title;
      theGame.querySelector(".game-description").innerText = response.description;

      // remove input and textarea created by us
      inputTitle.remove();
      inputDescription.remove();
      updateButton.remove();

      // enable back the "Edit" button
      event.target.disabled = false;
    });
  });
}

function newGameOnClick(event) {
  //disable the button so we can't click it several times

  event.target.disabled = true;

  var theGame = event.target.parentNode.parentNode;
  //event.target is the clicked button
  var theGameId = theGame.id;

  var gameId = theGameId.replace("game_", "");

  var inputTitle = document.createElement("input");
  inputTitle.setAttribute("class", "new-title");
  inputTitle.setAttribute("style", "width: 80%"); //the width is to small
  inputTitle.setAttribute("placeholder", "Title");
  theGame.appendChild(inputTitle);

  var inputDescription = document.createElement("textarea");
  inputDescription.setAttribute("class", "new-description");
  inputDescription.setAttribute("style", "width: 80%"); //the width is to small
  inputDescription.setAttribute("placeholder", "Description");
  theGame.appendChild(inputDescription);

  var inputImageUrl = document.createElement("input");
  inputImageUrl.setAttribute("class", "new-image");
  inputImageUrl.setAttribute("style", "width: 80%"); //the width is to small
  inputImageUrl.setAttribute("placeholder", "Image URL");
  theGame.appendChild(inputImageUrl);

  var newGameButton = document.createElement("button");
  newGameButton.innerText = "Create Game";
  theGame.appendChild(newGameButton);

  newGameButton.addEventListener("click", function() {
    var game = new Game({
      _id: gameId,
      title: inputTitle.value,
      description: inputDescription.value,
      imageUrl: inputImageUrl.value
    });
    game.newGame().then(function(response) {
      console.log("newGame", response);
      //populate items with the response from the API
      theGame.querySelector(".game-title").innerText = response.title;
      theGame.querySelector(".game-description").innerText =
        response.description;
      theGame.querySelector(".game-image").src = response.imageUrl;
      //remove input and textarea created by us
      inputTitle.remove();
      inputDescription.remove();
      inputImageUrl.remove();
      newGameButton.remove();

      //enable back the newGame button
      event.target.disabled = false;
      window.location.reload();
    });
  });
}
