let words = [];
let currentWord = '';
let guessedLetters = [];
let score = 0;
let level = 1;
let maxAttempts = 7;
let attemptsLeft = maxAttempts;
let difficulty = 'easy'; 

async function fetchWords() {
    const response = await fetch('words.php');
    words = await response.json();
    startGame();
}

function setDifficulty(level) {
    document.getElementById("menu").style.display ="none";
    difficulty = level;
    document.getElementById("difficulty").innerHTML = "difficulty: "+difficulty;
    startGame();
}
function giveHint() {
    let unguessedLetters = currentWord.split('').filter(letter => !guessedLetters.includes(letter));
    
    if (unguessedLetters.length > 0) {
        let hintLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
        guessedLetters.push(hintLetter);
        
        const keyButton = document.querySelector(`button.key[data-letter="${hintLetter}"]`);
        if (keyButton) {
            keyButton.classList.add('correct');
            keyButton.querySelector('.icon').textContent = '✔️';
            keyButton.disabled = true;
        }
        
        displayWord();
        checkWin();
    }
    
    // Disable the hint button if no letters are left to guess
    if (unguessedLetters.length <= 1) {
        document.getElementById('hintButton').disabled = true;
    }
}

function startGame() {
    guessedLetters = [];
    attemptsLeft = maxAttempts;
    document.getElementById('message').textContent = '';
    document.getElementById('hangman').textContent = '';
    document.getElementById('score').textContent = 'Score: ' + score;
    document.getElementById('level').textContent = 'Level: ' + level;
    generateKeyboard();
    selectWord();

    const keyboardButtons = document.querySelectorAll('#keyboard button');
    keyboardButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove('disabled');
    });

    document.getElementById('hintButton').disabled = false; // Enable hint button at start

    document.addEventListener('keydown', handleKeyboardInput);
}


function selectWord() {
    const difficultyWords = words[difficulty];
    currentWord = difficultyWords[Math.floor(Math.random() * difficultyWords.length)].toUpperCase();
    displayWord();
}

function displayWord() {
    let display = '';
    for (let letter of currentWord) {
        if (guessedLetters.includes(letter)) {
            display += letter + ' ';
        } else {
            display += '_ ';
        }
    }
    document.getElementById('wordDisplay').textContent = display.trim();
    checkWin();
}

function generateKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const key = document.createElement('button');
        key.textContent = letter;
        key.classList.add('key');
        key.setAttribute('data-letter', letter); 
        key.onclick = () => handleGuess(letter);
        const icon = document.createElement('span');
        icon.classList.add('icon');
        key.appendChild(icon);
        keyboard.appendChild(key);
    }
}

function handleKeyboardInput(event) {
    const letter = event.key.toUpperCase();
    if (letter >= 'A' && letter <= 'Z') {
        handleGuess(letter);
    }
}

function handleGuess(letter) {
    letter = letter.toUpperCase(); 

    if (guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);

    const keyButton = document.querySelector(`button.key[data-letter="${letter}"]`);
    
    if (!keyButton) {
        console.error(`Button for letter ${letter} not found.`);
        return;
    }

    const icon = keyButton.querySelector('.icon');

    if (currentWord.includes(letter)) {
        score += 10;
        keyButton.classList.add('correct');
        icon.textContent = '✔️';
        document.getElementById('score').textContent = 'Score: ' + score;
    } else {
        attemptsLeft--;
        keyButton.classList.add('incorrect');
        icon.textContent = '❌';
        updateHangman();
        if (attemptsLeft === 0) {
            endGame(false);
        }
    }

    keyButton.disabled = true; 
    displayWord(); 
}

function updateHangman() {
    let hangmanStages = [
        '\n',                     
        '\n  😄𓍯',                   
        '\n  😃𓍯\n |',                
        '\n  😐𓍯\n/|',               
        '\n  😟𓍯\n /|\\',             
        '\n  😨𓍯\n   /|\\  \n/',          
        '\n  😵̷̊̊̊̊̊\n    /|\\ \n   /\\' ,           
        '   👻\n  💀̷̊̊̊̊̊\n    /|\\ \n    /\\ '            
    ];
    document.getElementById('hangman').textContent = hangmanStages[maxAttempts - attemptsLeft];
}

function checkWin() {
    if (!document.getElementById('wordDisplay').textContent.includes('_')) {
        endGame(true);
    }
}

function endGame(won) {
    const message = document.getElementById('message');
    const keyboardButtons = document.querySelectorAll('#keyboard button');
    
    keyboardButtons.forEach(button => {
        button.disabled = true; 
        button.classList.add('disabled'); 
    });

    if (won) {
        message.textContent = 'You won! Moving to next level...';
        message.style.color='green';
        level++;
        setTimeout(startGame, 2000);
    } else {
        message.textContent = 'Game Over! The word was: ' + currentWord;
        document.getElementById('restartButton').style.display = 'block';
        message.style.color='red';
        level=1;
        score=0;
    }
}

window.onload = fetchWords;

document.getElementById('easyButton').addEventListener('click', () => setDifficulty('easy'));
document.getElementById('mediumButton').addEventListener('click', () => setDifficulty('medium'));
document.getElementById('hardButton').addEventListener('click', () => setDifficulty('hard'));
