As a CodeClan homework we were given a selection of suggested APIs and asked to practice getting data from an API and using it in some way which required DOM manipulation.
I have been working on a film quiz which uses two different APIs to give two levels of difficulty for players.
Players are given up to three clues for each film - stars, director and a short synopsis. Each of these must be given in order and if the player gets the answer right the number of points they get depends on how many clues they needed (10 for 1 clue, 5 for 2 clues and 2 points if you use all 3 clues). A player gets five questions before receiving a final score.
The easier quiz uses a film api which requires you to provide a film name in the url for the request. Therefore it works by randomly selecting from an array of film titles I have provided. The harder quiz uses an api which sends back a different film every time you call it.
