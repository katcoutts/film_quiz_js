var response;
var clues;
var guess;
var title
var rightWrong;
var url;
var counter = 1;
var score = 0;
var level;
var films = ['scream', 'cocoon', 'good will hunting', 'deerhunter', 'alien', 'the shining', 'bring it on', '10 things i hate about you', 'clueless', 'bend it like beckham', 'finding dory', 'the matrix', 'back to the future', 'airplane', 'ed wood', 'blade runner', 'chalet girl', 'the iron giant', 'some like it hot', 'rear window', 'crash', 'lego movie', 'the princess bride', 'armageddon', 'inception', 'goodfellas'];

var clearFields = function(){
  document.querySelector('#clue1text').innerText = "";
  document.querySelector('#clue2text').innerText = "";
  document.querySelector('#clue3text').innerText = "";
  document.querySelector('input').value = "";
  document.querySelector('#result').innerText = "";
}


var requestComplete = function(){
  if(this.status !== 200) return;
  clues = 0;
  var jsonString = this.responseText;
  response = JSON.parse(jsonString); 
  console.log(response);
  var release = response.Year;
  title = response.Title;
  console.log(release);
  var clue1 = document.querySelector('#clue1text');
  var clue2 = document.querySelector('#clue2text');
  var clue3 = document.querySelector('#clue3text');
  var button1 = document.querySelector('#clue1');
  var button2 = document.querySelector('#clue2');
  var button3 = document.querySelector('#clue3');
  button1.onclick = function(){
    clue1.innerText = "Stars: " + response.Actors;
    clues += 1;
}  
  button2.onclick = function(){
    clue2.innerText = "Directed by: " + response.Director;
    clues += 1;
}  
  button3.onclick = function(){
    clue3.innerText = response.Plot;
    clues += 1;
}
  var guessButton = document.querySelector('#guess');
  guessButton.onclick = function(){
    var guess = document.querySelector('input').value;
    console.log(guess)
    rightWrong = document.querySelector('#result');
    // console.log(title.toLowerCase())
    // console.log(guess.toLowerCase())
    if (guess.toLowerCase() === title.toLowerCase()){
      rightWrong.innerText = "You're right"
      var points = document.querySelector('#pointsTotal')
      if (clues === 1){
        points.innerText = "10";
        score += 10;
      }
      else if (clues === 2){
        points.innerText = " 5";
        score += 5;
      }
      else if (clues === 3){
        points.innerText = " 2";
        score += 2;
      }
    }
    else if ((guess.toLowerCase() != title.toLowerCase)&& (clues < 3)){
      rightWrong.innerText = "You're wrong. Select another clue"
    }
    else {
      rightWrong.innerText = "You're wrong. Move to the next question."
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
  }
    else{
      nextButton.style.visibility = "hidden";
      var finalScoreBox = document.querySelector('#finalScore');
      finalScoreBox.innerText = "The quiz is over. Your final score is " + score;
      console.log("Quiz is over. Your score is " + score);
    }
  };
}

var makeRequest = function(url, callback){

  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var app = function(){
  var hardButton = document.querySelector("#hard");
  var easierButton = document.querySelector('#easier');
  hardButton.onclick = function(){
    level = "hard";
    hardButton.disabled = true;
    easierButton.disable = true;
    hardButton.style.visibility = "hidden";
    easierButton.style.visibility = "hidden";
    url = "https://random-movie.herokuapp.com/random";
    makeRequest(url, requestComplete); 
  }
  easierButton.onclick = function(){
    level = "easier";
    hardButton.disabled = true;
    easierButton.disable = true;
    hardButton.style.visibility = "hidden";
    easierButton.style.visibility = "hidden";
    title = films[Math.floor(Math.random()*films.length)];
    url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";
    makeRequest(url, requestComplete); 
  }
  // var setUrlToHard = function(){
  //   hardButton.disabled = true;
  //   easierButton.disable = true;
  //   url = "https://random-movie.herokuapp.com/random";
  //   makeRequest(url, requestComplete); 
  // }
  // var setUrlToEasier = function(){
  //   var films = ['scream', 'cocoon', 'good will hunting', 'deerhunter', 'alien', 'the shining', 'bring it on', '10 things i hate about you', 'clueless', 'bend it like beckham', 'finding dory', 'the matrix', 'back to the future', 'airplane', 'ed wood', 'blade runner', 'chalet girl', 'the iron giant', 'some like it hot', 'rear window', 'crash', 'lego movie', 'the princess bride', 'armageddon', 'inception', 'goodfellas'];
  //   title = films[Math.floor(Math.random()*films.length)];
  //   url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";
  //   makeRequest(url, requestComplete); 
  // }
  // makeRequest(url, requestComplete) 

  // var films = ['scream', 'cocoon', 'good will hunting', 'deerhunter', 'alien', 'the shining', 'bring it on', '10 things i hate about you', 'clueless', 'bend it like beckham', 'finding dory', 'the matrix', 'back to the future', 'airplane', 'ed wood', 'blade runner', 'chalet girl', 'the iron giant', 'some like it hot', 'rear window', 'crash', 'lego movie', 'the princess bride', 'armageddon', 'inception', 'goodfellas'];
  // title = films[Math.floor(Math.random()*films.length)];
  // var url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";

  // url = "https://random-movie.herokuapp.com/random";

  // makeRequest(url, requestComplete) 
}

window.onload = app;






