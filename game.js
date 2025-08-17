let words = [];
let currentWord = '';
let guessedLetters = [];
let score = 0;
let level = 1;
let maxAttempts = 7;
let attemptsLeft = maxAttempts;
let difficulty = 'easy';

let bombCounter = 0;  
let maxBombs = 5;  
let canUseBomb = true; 

let hintCounter = 0;  
let maxHints = 5;  
let canUseHint = true; 

// Game state to prevent multiple wins
let gameEnded = false;

async function fetchWords() {
    const response = await fetch('words.php');
    words = await response.json();
    startGame();
}

function setDifficulty(level) {
    document.getElementById("menu").style.display = "none";
    difficulty = level;
    document.getElementById("difficulty").innerHTML = difficulty;
    
    if (difficulty === 'easy') {
        maxBombs = 5;
        maxHints = 5;
    } else if (difficulty === 'medium') {
        maxBombs = 3;
        maxHints = 3;
    } else if (difficulty === 'hard') {
        maxBombs = 2;
        maxHints = 1;
    }
    
    bombCounter = 0;
    hintCounter = 0;

    startGame();
}

function giveHint() {
    if (gameEnded || !canUseHint || hintCounter >= maxHints) {
        return;
    }
    
    hintCounter++;
    updateHintDisplay();
    
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
        
        // Update score for hint
        score += 10;
        document.getElementById('score').textContent = score;
        
        displayWord();
        
        // Check win condition only after updating display
        setTimeout(checkWin, 100);
    }
    
    // Disable hint button if no more hints or no more letters to reveal
    if (hintCounter >= maxHints || unguessedLetters.length <= 1) {
        document.getElementById('hintButton').disabled = true;
    }
}

function giveBombe() {
    if (gameEnded || !canUseBomb || bombCounter >= maxBombs) {
        return;
    }
    
    bombCounter++;
    updateBombDisplay();
    
    let incorrectLetters = Array.from(document.querySelectorAll('.key'))
        .filter(key => !currentWord.includes(key.getAttribute('data-letter')) && !key.disabled);

    incorrectLetters.sort(() => 0.5 - Math.random());

    let lettersToRemove = incorrectLetters.slice(0, 3);
    lettersToRemove.forEach(letterButton => {
        letterButton.disabled = true;
        letterButton.classList.add('disabled');
    });

    if (bombCounter >= maxBombs || incorrectLetters.length <= 3) {
        document.getElementById('bombButton').disabled = true;
    }
}

function updateBombDisplay() {
    document.getElementById("countBombe").innerHTML = maxBombs - bombCounter;
}

function updateHintDisplay() {
    document.getElementById("countHint").innerHTML = maxHints - hintCounter;
}

function startGame() {
    // Reset game state
    gameEnded = false;
    guessedLetters = [];
    attemptsLeft = maxAttempts;
    canUseBomb = true;
    canUseHint = true;
    
    document.getElementById('message').textContent = '';
    document.getElementById('hangman').textContent = '';
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    document.getElementById("countBombe").innerHTML = maxBombs - bombCounter;
    document.getElementById("countHint").innerHTML = maxHints - hintCounter;
    
    generateKeyboard();
    selectWord();

    const keyboardButtons = document.querySelectorAll('#keyboard button');
    keyboardButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove('disabled', 'correct', 'incorrect');
    });

    document.getElementById('hintButton').disabled = false; 
    document.getElementById('bombButton').disabled = false;

    document.addEventListener('keydown', handleKeyboardInput);
}

function selectWord() {
    const difficultyWords = words[difficulty];
    currentWord = difficultyWords[Math.floor(Math.random() * difficultyWords.length)].toUpperCase();
    
    if (difficulty === 'easy') {
        // Automatically reveal the first letter for easy difficulty
        guessedLetters.push(currentWord[0]);
        
        // Update the keyboard button for the first letter
        const firstLetterButton = document.querySelector(`button.key[data-letter="${currentWord[0]}"]`);
        if (firstLetterButton) {
            firstLetterButton.classList.add('correct');
            firstLetterButton.querySelector('.icon').textContent = '✔️';
            firstLetterButton.disabled = true;
        }
    }

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
    if (gameEnded) return;
    
    const letter = event.key.toUpperCase();
    if (letter >= 'A' && letter <= 'Z') {
        handleGuess(letter);
    }
}

function handleGuess(letter) {
    if (gameEnded) return;
    
    letter = letter.toUpperCase(); 

    if (guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);

    const keyButton = document.querySelector(`button.key[data-letter="${letter}"]`);
    
    if (!keyButton) {
        console.error(`Button for letter ${letter} not found.`);
        return;
    }

    const icon = keyButton.querySelector('.icon');
    const correctSound = document.getElementById('correctSound');
    const incorrectSound = document.getElementById('incorrectSound');

    if (currentWord.includes(letter)) {
        score += 10;
        keyButton.classList.add('correct');
        icon.textContent = '✔️';
        document.getElementById('score').textContent = score;
        if (correctSound) correctSound.play();
    } else {
        attemptsLeft--;
        keyButton.classList.add('incorrect');
        icon.textContent = '❌';
        if (incorrectSound) incorrectSound.play();
        updateHangman();
        if (attemptsLeft === 0) {
            endGame(false);
            return;
        }
    }

    keyButton.disabled = true; 
    displayWord();
    
    // Check win condition after a small delay to ensure display is updated
    setTimeout(checkWin, 50);
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
    if (gameEnded) return;
    
    // Check if all letters of the word have been guessed
    let allLettersGuessed = true;
    for (let letter of currentWord) {
        if (!guessedLetters.includes(letter)) {
            allLettersGuessed = false;
            break;
        }
    }
    
    if (allLettersGuessed) {
        endGame(true);
    }
}

function endGame(won) {
    if (gameEnded) return;
    
    gameEnded = true;
    const message = document.getElementById('message');
    const keyboardButtons = document.querySelectorAll('#keyboard button');
    
    keyboardButtons.forEach(button => {
        button.disabled = true; 
        button.classList.add('disabled'); 
    });
    
    // Disable hint and bomb buttons
    document.getElementById('hintButton').disabled = true;
    document.getElementById('bombButton').disabled = true;

    if (won) {
        message.textContent = 'You won! Moving to next level...';
        message.style.color = 'green';
        level++;
        document.getElementById('level').textContent = level;
        setTimeout(() => {
            startGame();
        }, 2000);
    } else {
        message.textContent = 'Game Over! The word was: ' + currentWord;
        document.getElementById('restartButton').style.display = 'block';
        message.style.color = 'red';
        level = 1;
        score = 0;
    }
}

// Initialize game when page loads
window.onload = fetchWords;

// Event listeners for difficulty buttons
document.getElementById('easyButton').addEventListener('click', () => setDifficulty('easy'));
document.getElementById('mediumButton').addEventListener('click', () => setDifficulty('medium'));
document.getElementById('hardButton').addEventListener('click', () => setDifficulty('hard'));

// Event listeners for game buttons
document.getElementById('bombButton').addEventListener('click', giveBombe);
document.getElementById('hintButton').addEventListener('click', giveHint);