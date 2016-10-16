As a CodeClan homework we were given a selection of suggested APIs and asked to practice getting data from an API and using it in some way which required DOM manipulation.
I have been working on a film quiz which uses two different APIs to give two levels of difficulty for players.
Players are given up to three clues for each film - stars, director and a short synopsis. Each of these must be given in order and if the player gets the answer right the number of points they get depends on how many clues they needed (10 for 1 clue, 5 for 2 clues and 2 points if you use all 3 clues). A player gets five questions before receiving a final score.
The easier quiz uses a film api which requires you to provide a film name in the url for the request. Therefore it works by randomly selecting from an array of film titles I have provided. The harder quiz uses an api which sends back a different film every time you call it.

Screenshot of homepage
<img width="1225" alt="screen shot 2016-10-16 at 15 44 30" src="https://cloud.githubusercontent.com/assets/17859815/19418252/3c8f0578-93b8-11e6-8e3c-70edecdf9399.png">

Screenshot of correct answer page
<img width="1215" alt="screen shot 2016-10-16 at 15 44 59" src="https://cloud.githubusercontent.com/assets/17859815/19418268/7652927a-93b8-11e6-8ecf-2ace5e63e97a.png">

Screenshot of example results page:
<img width="1126" alt="screen shot 2016-10-16 at 15 46 11" src="https://cloud.githubusercontent.com/assets/17859815/19418290/c6eccc28-93b8-11e6-8bc5-5e2a6bdba7fe.png">
