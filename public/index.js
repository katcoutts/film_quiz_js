var response;
var clues;
var guess;
var title
var rightWrong;

var requestComplete = function(){
  if(this.status !== 200) return;
  var clues = 0;
  var jsonString = this.responseText;
  response = JSON.parse(jsonString); 
  console.log(response);
  var release = response.Year;
  console.log(release);
  var clue1 = document.querySelector('#clue1text');
  var clue2 = document.querySelector('#clue2text');
  var clue3 = document.querySelector('#clue3text');
  var button1 = document.querySelector('#clue1');
  var button2 = document.querySelector('#clue2');
  var button3 = document.querySelector('#clue3');
  button1.onclick = function(){
    clue1.innerText = response.Actors;
    clues += 1;
}  
  button2.onclick = function(){
    clue2.innerText = response.Year;
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
    console.log(title)
    console.log(guess.toLowerCase())
    if (guess.toLowerCase() === title){
      rightWrong.innerText = "You're right"
      var points = document.querySelector('#pointsTotal')
      if (clues === 1){
        points.innerText = "10";
      }
      else if (clues === 2){
        points.innerText = " 5";
      }
      else if (clues === 3){
        points.innerText = " 2";
      }
    }
    else {
      rightWrong.innerText = "You're wrong"
    }
  }

}

var makeRequest = function(url, callback){

  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var app = function(){
  var films = ['scream', 'cocoon', 'good will hunting', 'deerhunter', 'alien', 'the shining', 'bring it on', '10 things i hate about you', 'clueless', 'terminator', 'bend it like beckham', 'finding dory', 'the matrix', 'back to the future', 'airplane', 'ed wood', 'blade runner', 'chalet girl', 'the iron giant', 'some like it hot', 'rear window', 'crash'];
  title = films[Math.floor(Math.random()*films.length)];
  var url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";


  makeRequest(url, requestComplete)
  // var button = document.querySelector('button');

  // button.onclick = function(){
  //   var inputBox = document.querySelector('input');
  //   var title = inputBox.value;
  //   var url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";
  //   console.log(url);
  //   makeRequest(url, requestComplete);
  // }  
}

window.onload = app;






