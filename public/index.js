var counter = 1;
var points;
var score = 0;
var level;
var filmsSoFar = [];
var films = ['scream', 'cocoon', 'good will hunting', 'alien', 'the shining', 'bring it on', '10 things i hate about you', 'clueless', 'bend it like beckham', 'finding dory', 'the matrix', 'back to the future', 'airplane', 'ed wood', 'blade runner', 'chalet girl', 'the iron giant', 'some like it hot', 'rear window', 'crash', 'lego movie', 'the princess bride', 'armageddon', 'inception', 'goodfellas', 'rashomon', 'attack the block', 'trainspotting', 'labyrinth', 'half past dead', 'cobra', 'jurassic park', 'speed', 'goldfinger', 'minority report', 'sicario', 'mary poppins', 'the sound of music', 'rocky'];
var resultImageLink = ["http://1.bp.blogspot.com/-axGTzFJz2jc/UUg2i1qVquI/AAAAAAAAKJY/Wr6iebkvx4M/s1600/grail-knight1-meme-generator-you-chose-poorly-df5968.jpg","/chose_wisely.jpg", "/practically-perfect.jpg", "/han-solo.jpg"]

var clearFields = function(){
  document.querySelector('#clue1text').innerText = "";
  document.querySelector('#clue2text').innerText = "";
  document.querySelector('#clue3text').innerText = "";
  document.querySelector('input').value = "";
  document.querySelector('#result').innerText = "";
  document.querySelector('#pointsTotal').innerText = "";
  document.querySelector('#posterImage').style.display = "none";
}


var requestComplete = function(){
  if(this.status !== 200) return;
  clues = 0;
  var jsonString = this.responseText;
  response = JSON.parse(jsonString);
  checkFilmHasPlot();
  checkIfHadFilmBefore();
}

var checkFilmHasPlot = function(){
  if (response.Plot === 'N/A'){
    if (level === "easier"){
    title = films[Math.floor(Math.random()*films.length)];
    url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";
    makeRequest(url, requestComplete);
    } else if (level === "hard") {
      url = "https://random-movie.herokuapp.com/random";
      makeRequest(url, requestComplete); 
    }
  }
}

var checkIfHadFilmBefore = function(){
  var index = filmsSoFar.indexOf(response.Title);
  if (index > -1){
    if (level === "easier"){
    title = films[Math.floor(Math.random()*films.length)];
    url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";
    makeRequest(url, requestComplete);
    } else if (level === "hard") {
      url = "https://random-movie.herokuapp.com/random";
      makeRequest(url, requestComplete); 
    }
  }
  else{
    filmsSoFar.push(response.Title);
    setClues();
    console.log(filmsSoFar);
  }
}

var setClues = function(){
  {
  var clue1 = document.querySelector('#clue1text');
  var clue2 = document.querySelector('#clue2text');
  var clue3 = document.querySelector('#clue3text');
  var button1 = document.querySelector('#clue1');
  var button2 = document.querySelector('#clue2');
  button2.disabled = true;
  var button3 = document.querySelector('#clue3');
  button3.disabled = true;
  button1.onclick = function(){
    if (response.Actors){
    clue1.innerText = "Stars: " + response.Actors;
    clues += 1;
    } else {
    clue1.innerText = "Released: " + response.Released;
    clues += 1;
    }
    button2.disabled = false;
  }  
  button2.onclick = function(){
    if (response.Director){
    clue2.innerText = "Directed by: " + response.Director;
    clues += 1;
    } else {
    clue2.innerText = "Awards: " + response.Awards;
    clues += 1;
    }
    button3.disabled = false;
  }  
  button3.onclick = function(){
    clue3.innerText = response.Plot;
    clues += 1;
  }
  var guessButton = document.querySelector('#guess');
  guessButton.onclick = function(){
    handleGuess(response)
}


var showPoster = function(){
  img = document.querySelector('#posterImage');
  img.style.display = "inline-block";
  img.src = response.Poster;
}

var calculatePoints = function(){
  points = document.querySelector('#pointsTotal')
  var pointsArray = [10, 5, 2];
  var clueIndex = clues - 1;
  var answerPoints = pointsArray[clueIndex].toString()
  points.innerText = answerPoints;
  score += pointsArray[clueIndex];
}


var handleGuess = function(answer){
  var guess = document.querySelector('input').value;
  var rightWrong = document.querySelector('#result');
  var guessButton = document.querySelector('#guess');
    // ANSWER IS RIGHT
  if (guess.toLowerCase() === answer.Title.toLowerCase()){
    rightWrong.innerText = "You're right"
    calculatePoints();
    if (response.Poster != "N/A"){
      showPoster(answer);
    }
  }
    // ANSWER IS WRONG BUT NEED MORE CLUES
  else if ((guess.toLowerCase() != answer.Title.toLowerCase()) && (clues < 3)){
    rightWrong.innerText = "You're wrong. Select another clue"
  }
    // ANSWER IS WRONG AFTER ALL CLUES  
  else {
    rightWrong.innerText = "You're wrong. The answer was " + title + " . Move to the next question."
    guessButton.disabled = true;
    if (response.Poster != "N/A"){
      showPoster(answer);
  }
    points = document.querySelector('#pointsTotal')
    points.innerText = " 0";
  };
}
}
  nextQuestion();
}

var nextQuestion = function(){
var nextButton = document.querySelector('#next');
nextButton.onclick = function(){
  counter += 1;
  if (counter < 6){
    if (level === "hard"){
      clearFields();
      makeRequest(url, requestComplete);
      if (counter === 5){
        nextButton.innerText = "Get Score"
      }
    }
    else {
      clearFields();
      title = films[Math.floor(Math.random()*films.length)];
      url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";
      makeRequest(url, requestComplete);
      if (counter === 5){
        nextButton.innerText = "Get Score"
      }
    }
  }
  else {
    setFinalScore()
  }
}

var clearItems = function(){
  var items = document.querySelectorAll('.toClear');
  for (var item of items){
    item.style.display = 'none';
  }
}

var setFinalImage = function(){
  var resultImage = document.querySelector('#resultImage');
  var i = 0;
  if (score < 20){i = 0}
  else if ((score >= 20 ) && (score < 45)) {i = 1}
  else if ((score >= 45) && (score < 50)) {i = 2}
  else if (score == 50){i = 3}
  resultImage.src = resultImageLink[i];
  resultImage.style.display = "inline-block"
}

var setFinalScore = function(){
  nextButton.style.display = "none";
  clearFields();
  clearItems();
  var finalScoreBox = document.querySelector('#finalScore');  
  finalScoreBox.innerText = "The quiz is over. Your final score is " + score;
  setFinalImage();
  var newButton = document.querySelector('#newQuizButton');
  newButton.style.display = 'block';
  newButton.onclick = function(){
  location.reload();
    }
  }
};


var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var hideEasyHardButtons = function(hardButton, easierButton){
  hardButton.disabled = true;
  easierButton.disable = true;
  hardButton.style.display = "none";
  easierButton.style.display = "none";
}

var app = function(){
  var hardButton = document.querySelector("#hard");
  var easierButton = document.querySelector('#easier');
  hardButton.onclick = function(){
    level = "hard";
    hideEasyHardButtons(hardButton, easierButton);
    url = "https://random-movie.herokuapp.com/random";
    makeRequest(url, requestComplete); 
  }
  easierButton.onclick = function(){
    level = "easier";
    hideEasyHardButtons(hardButton, easierButton);
    title = films[Math.floor(Math.random()*films.length)];
    url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";
    makeRequest(url, requestComplete); 
  }
}

window.onload = app;






