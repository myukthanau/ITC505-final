// Set up the 5x5 grid
const grid = document.getElementById('grid');
let squares = [];

// Timer variables
let seconds = 0;
let minutes = 0;
let timerInterval;

// Move counter
let moveCount = 0;

// Create squares and add to grid
for (let i = 0; i < 25; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('click', function() {
        toggleSquare(i);
        incrementMoveCounter();
    });
    grid.appendChild(square);
    squares.push(square);
}

// Timer function
function startTimer() {
    timerInterval = setInterval(function() {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        document.getElementById('timer').textContent = formatTime(minutes, seconds);
    }, 1000);
}

// Format time to "MM:SS"
function formatTime(minutes, seconds) {
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Toggle function for a given square and its adjacent squares
function toggleSquare(index) {
    // Toggle the clicked square
    squares[index].classList.toggle('is-on');
    
    // Toggle the adjacent squares (left, right, top, bottom)
    const directions = [
        {x: -1, y: 0}, // Left
        {x: 1, y: 0},  // Right
        {x: 0, y: -1}, // Up
        {x: 0, y: 1},  // Down
    ];

    const row = Math.floor(index / 5);
    const col = index % 5;

    directions.forEach(direction => {
        const newRow = row + direction.y;
        const newCol = col + direction.x;
        const newIndex = newRow * 5 + newCol;
        
        // Check if the adjacent square is within bounds
        if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
            squares[newIndex].classList.toggle('is-on');
        }
    });
}

// Function to randomly generate a solvable puzzle
function randomizeBoard() {
    // Randomly toggle squares to create a solvable configuration
    for (let i = 0; i < 25; i++) {
        if (Math.random() > 0.5) {
            toggleSquare(i);  // Randomly toggle squares to create a puzzle
        }
    }
}

// Randomize the board on page load
randomizeBoard();

// Check if the game is solved
function checkIfSolved() {
    const isSolved = squares.every(square => !square.classList.contains('is-on'));
    if (isSolved) {
        // Display the pop-up message when the game is won
        clearInterval(timerInterval);  // Stop the timer
        window.alert('You win! Time: ' + formatTime(minutes, seconds) + ' Moves: ' + moveCount);
    }
}

// Increment move counter and update the display
function incrementMoveCounter() {
    moveCount++;
    document.getElementById('moveCounter').textContent = moveCount;
}

// Optional: Set an interval to check for the win condition
setInterval(checkIfSolved, 500);

// Start the timer when the page loads
startTimer();
