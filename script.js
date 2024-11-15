"use strict";

// Player classes for X and O
const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'circle';

// Winning combinations for Tic Tac Toe
const WINNING_COMBINATIONS = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// DOM Elements
const cellElements = document.querySelectorAll('[data-cell]'); // All cells
const boardElement = document.getElementById('board');         // Board container
const winningMessageElement = document.getElementById('winningMessage'); // Winning message container
const restartButton = document.getElementById('restartButton');          // Restart button
const winningMessageTextElement = document.getElementById('winningMessageText'); // Text for the winning message
let isPlayer_O_Turn = false; // Tracks whose turn it is (false = X, true = O)

// Start the game
startGame();

// Add event listener to the restart button
restartButton.addEventListener('click', startGame);

// Initialize the game
function startGame() {
    isPlayer_O_Turn = false; // X starts first
    // Reset all cells
    cellElements.forEach(cell => {
        cell.classList.remove(PLAYER_X_CLASS);
        cell.classList.remove(PLAYER_O_CLASS);
        cell.removeEventListener('click', handleCellClick); // Remove old event listener
        cell.addEventListener('click', handleCellClick, { once: true }); // Add new click listener
    });
    setBoardHoverClass(); // Set initial hover state
    winningMessageElement.classList.remove('show'); // Hide winning message
}

// Handle a player's move
function handleCellClick(e) {
    const cell = e.target;
    const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS; // Determine the current player's class
    placeMark(cell, currentClass); // Mark the cell
    if (checkWin(currentClass)) { // Check if the current player won
        endGame(false); // End the game with a winner
    } else if (isDraw()) { // Check for a draw
        endGame(true); // End the game with a draw
    } else {
        swapTurns(); // Switch turns
        setBoardHoverClass(); // Update board hover state
    }
}

// End the game
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a draw!"; // Show draw message
    } else {
        winningMessageTextElement.innerText = `Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`; // Show winner message
    }
    winningMessageElement.classList.add('show'); // Display the winning message
}

// Check if the game is a draw
function isDraw() {
    return [...cellElements].every(cell => {
        // Check if all cells are filled
        return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS);
    });
}

// Mark a cell with the current player's class
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass); // Add class to the cell
}

// Switch turns between X and O
function swapTurns() {
    isPlayer_O_Turn = !isPlayer_O_Turn; // Toggle the player's turn
}

// Update the board hover state based on the current player
function setBoardHoverClass() {
    boardElement.classList.remove(PLAYER_X_CLASS); // Remove X hover
    boardElement.classList.remove(PLAYER_O_CLASS); // Remove O hover
    if (isPlayer_O_Turn) {
        boardElement.classList.add(PLAYER_O_CLASS); // Add O hover
    } else {
        boardElement.classList.add(PLAYER_X_CLASS); // Add X hover
    }
}

// Check if the current player has won
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        // Check if all cells in a winning combination have the current class
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}
