var response;
var clues;
var guess;
// var title
var rightWrong;
var url;
var counter = 1;
var points;
var score = 0;
var level;
var filmsSoFar = [];
var films = ['scream', 'cocoon', 'good will hunting', 'alien', 'the shining', 'bring it on', '10 things i hate about you', 'clueless', 'bend it like beckham', 'finding dory', 'the matrix', 'back to the future', 'airplane', 'ed wood', 'blade runner', 'chalet girl', 'the iron giant', 'some like it hot', 'rear window', 'crash', 'lego movie', 'the princess bride', 'armageddon', 'inception', 'goodfellas', 'rashomon', 'attack the block', 'trainspotting', 'labyrinth', 'half past dead', 'cobra', 'jurassic park', 'speed', 'goldfinger', 'minority report', 'sicario', 'mary poppins', 'the sound of music', 'rocky'];
var resultImageLink = ["http://1.bp.blogspot.com/-axGTzFJz2jc/UUg2i1qVquI/AAAAAAAAKJY/Wr6iebkvx4M/s1600/grail-knight1-meme-generator-you-chose-poorly-df5968.jpg","/chose_wisely.jpg","/han_solo.png"]

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
  checkNotHadFilmBefore();
}

var checkNotHadFilmBefore = function(){
  var index = filmsSoFar.indexOf(response.Title.toLowerCase());
  if (index === -1){
    filmsSoFar.push(response.Title);
    setClues();
    console.log(filmsSoFar);
  }
  else if (index > -1){
    makeRequest(url, requestComplete);
  }
}


var setClues = function(){
  {
  var clue1 = document.querySelector('#clue1text');
  var clue2 = document.querySelector('#clue2text');
  var clue3 = document.querySelector('#clue3text');
  var button1 = document.querySelector('#clue1');
  var button2 = document.querySelector('#clue2');
  var button3 = document.querySelector('#clue3');
  button1.onclick = function(){
    if (response.Actors){
    clue1.innerText = "Stars: " + response.Actors;
    clues += 1;
    } else {
    clue1.innerText = "Released: " + response.Released;
    clues += 1;
    }
  }  
  button2.onclick = function(){
    if (response.Director){
    clue2.innerText = "Directed by: " + response.Director;
    clues += 1;
    } else {
    clue2.innerText = "Awards: " + response.Awards;
    clues += 1;
    }
  }  
  button3.onclick = function(){
    clue3.innerText = response.Plot;
    clues += 1;
  }
  var guessButton = document.querySelector('#guess');
  guessButton.onclick = function(){
    var guess = document.querySelector('input').value;
    rightWrong = document.querySelector('#result');
    
    if (guess.toLowerCase() === title.toLowerCase()){
      rightWrong.innerText = "You're right"

// do something with an array for points  and take th epoints at position clues - 1

      if (response.Poster != "N/A"){
      img = document.querySelector('#posterImage');
      img.style.display = "inline-block";
      img.src = response.Poster;
    }
      points = document.querySelector('#pointsTotal')
      var pointsArray = [10, 5, 2];
      var clueIndex = clues - 1;
      answerPoints = pointsArray[clueIndex].toString()
      points.innerText = answerPoints;
      score += pointsArray[clueIndex];
    }
    else if ((guess.toLowerCase() != title.toLowerCase) && (clues < 3)){
      rightWrong.innerText = "You're wrong. Select another clue"
    }
    else {
      rightWrong.innerText = "You're wrong. The answer was " + title + " . Move to the next question."
      if (response.Poster != "N/A"){
      img = document.querySelector('#posterImage');
      img.style.display = "inline-block";
      img.src = response.Poster;
    }
      points.innerText = " 0";
    };
  }
}



  var nextButton = document.querySelector('#next');
  nextButton.onclick = function(){
    counter += 1;
    if (counter < 6){
    if (level === "hard"){
      clearFields();
      makeRequest(url, requestComplete);
  }
    else {
      clearFields();
      title = films[Math.floor(Math.random()*films.length)];
      url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";
      makeRequest(url, requestComplete);
    }
    // could make above an else if and then have an else which takes you to a getResult() function made out of the below.
  }
    else {
      nextButton.style.display = "none";
      var finalScoreBox = document.querySelector('#finalScore');
      clearFields(); 
      var resultImage = document.querySelector('#resultImage');
      var i = 0;
      if (score < 20){i = 0}
      else if ((score >= 20 ) && (score < 45)) {i = 1}
      else if (score >= 45) {i = 2}
      var items = document.querySelectorAll('.toClear');
      for (var item of items){
        item.style.display = 'none';
      } 
      finalScoreBox.innerText = "The quiz is over. Your final score is " + score;
      resultImage.src = resultImageLink[i];
      resultImage.style.display = "inline-block"
      var newButton = document.querySelector('#newQuizButton');
      newButton.style.display = 'block';
      newButton.onclick = function(){
        console.log(location);
        location.reload();
      }
    }
  // }
  };
}


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






