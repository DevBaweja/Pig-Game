/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
    DOM - Document Object Model
    Document Object provides us method by which we can interactivley treat html element as an objects and manipulate them
    manipulation of html element considering them as object is called as DOM Manipulation
*/

var scores, roundScore, activePlayer, diceDOMstyle, gamePlaying;
init();

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // Removing image initially
    diceDOMstyle = document.querySelector('.dice').style;
    diceDOMstyle.display = 'none';
    diceDOMstyle.border = '5px dashed';


    // Initiall values of all players
    for (var i = 0; i < scores.length; i++) {
        document.getElementById('score-' + i).textContent = '0';
        document.getElementById('current-' + i).textContent = '0';

        document.querySelector('#name-' + i).textContent = 'Player ' + (i+1);
        document.querySelector('.player-' + i + '-panel').classList.remove('winner');
        document.querySelector('.player-' + i + '-panel').classList.remove('active');
    }

    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

}


// Setting html tag
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>'+dice+'</em>';

// Receving imformation
// var x = document.querySelector('#score-0').textContent;


/***
Event- Triggers to notify code that something happended
    ex- clicking button,resiziing window,scrolling up or downa,pressing any key
Event Listener - A function that performs based upon certain event.
    It waits for certain event to happen

Event Lisetner only happens once execution stack is empty.(Global Execution Stack)
 */

/*
function btn()
{

}
document.querySelector('.btn-roll').addEventListener('click', btn);
*/

// here we don't put brackets as we are not calling this function here 
// we want event listener to call this function - Also this function is called callback function 
// Callback function - Function that is passed to another function as an argument
// Instead of callback function we can use anonymous function

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6 + 1); // Random number between 1-6

        // Regain image
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        // Acurate 
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            diceDOMstyle.borderColor = 'transparent';
        }
        else {
            document.querySelector('.dice').style.borderColor = 'red';
            changePlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 30) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            console.log(gamePlaying);

        }
        else
            changePlayer();
    }
});

function changePlayer() {
    document.getElementById('current-' + activePlayer).textContent = '0';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer = (activePlayer === 0) ? 1 : 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    // document.querySelector('.player-0-panel').classList.toggle('active');
    // document.querySelector('.player-1-panel').classList.toggle('active');
    roundScore = 0;
}

document.querySelector('.btn-new').addEventListener('click', init);

/*
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/