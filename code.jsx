# react
import React, { useState, useEffect } from 'react';
import './App.css';

const numRows = 10;
const numCols = 10;
const numMines = 10;

const App = () => {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  const createGrid = () => {
    const newGrid = Array(numRows).fill().map(() => Array(numCols).fill(0));
    let mineCount = 0;

    while (mineCount < numMines) {
      const row = Math.floor(Math.random() * numRows);
      const col = Math.floor(Math.random() * numCols);

      if (newGrid[row][col] === 0) {
        newGrid[row][col] = 'M';
        mineCount++;
      }
    }

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (newGrid[row][col] !== 'M') {
          let count = 0;

          if (row > 0 && col > 0 && newGrid[row - 1][col - 1] === 'M') count++;
          if (row > 0 && newGrid[row - 1][col] === 'M') count++;
          if (row > 0 && col < numCols - 1 && newGrid[row - 1][col + 1] === 'M') count++;
          if (col > 0 && newGrid[row][col - 1] === 'M') count++;
          if (col < numCols - 1 && newGrid[row][col + 1] === 'M') count++;
          if (row < numRows - 1 && col > 0 && newGrid[row + 1][col - 1] === 'M') count++;
          if (row < numRows - 1 && newGrid[row + 1][col] === 'M') count++;
          if (row < numRows - 1 && col < numCols - 1 && newGrid[row + 1][col + 1] === 'M') count++;

          newGrid[row][col] = count;
        }
      }
    }

    setGrid(newGrid);
  };

  const handleClick = (row, col) => {
    if (gameOver || isWinner) return;

    const value = grid[row][col];
    const newGrid = [...grid];
    newGrid[row][col] = value + '';

    if (value === 'M') {
      setGameOver(true);
    } else if (value === 0) {
      const queue = [[row, col]];
      const visited = new Set(queue);

      while (queue.length > 0) {
        const [r, c] = queue.shift();

        if (grid[r][c] !== 0) {
          newGrid[r][c] = grid[r][c] + '';
          continue;
        }

        newGrid[r][c] = '';

        if (r > 0 && c > 0 && !visited.has(`${r - 1},${c - 1}`)) {
          queue.push([r - 1, c - 1]);
          visited.add(`${r - 1},${c - 1}`);
        }
        if (r > 0 && !visited.has(`${r - 1},${c}`)) {
          queue.push([r - 1, c]);
          visited.add(`${
