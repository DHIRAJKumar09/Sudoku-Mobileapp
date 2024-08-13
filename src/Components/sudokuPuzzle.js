import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Text, StyleSheet } from 'react-native';
import Sudoku from 'sudoku-umd';

const generateRandomSudoku = (difficulty) => {
  const puzzle = Sudoku.generate(difficulty);
  return Sudoku.board_string_to_grid(puzzle);
};

const SudokuPuzzle = ({ route }) => {
  const { difficulty } = route.params;  // Get the difficulty level from the route
  const [initialPuzzle, setInitialPuzzle] = useState([]);
  const [puzzle, setPuzzle] = useState([]);
  const [solvedPuzzle, setSolvedPuzzle] = useState([]);
  const [validationResult, setValidationResult] = useState('');

  useEffect(() => {
    const newPuzzle = generateRandomSudoku(difficulty);
    setInitialPuzzle(newPuzzle);
    setPuzzle(JSON.parse(JSON.stringify(newPuzzle)));
  }, [difficulty]);

  const validatePuzzle = () => {
    const isPuzzleValid =
      JSON.stringify(puzzle) === JSON.stringify(solvedPuzzle);
    setValidationResult(isPuzzleValid ? 'Correct' : 'Incorrect');
  };

  const solveSudoku = (board) => {
    const flattenedBoard = board
      .flat()
      .map(cell => (cell === 0 ? '.' : cell))
      .join('');

    const solved = Sudoku.solve(flattenedBoard);
    if (solved) {
      const solvedGrid = Sudoku.board_string_to_grid(solved);
      return solvedGrid.map(row =>
        row.map(cell => (cell === '.' ? 0 : parseInt(cell))),
      );
    } else {
      console.log('Puzzle is not solvable.');
      return board;
    }
  };

  const solvePuzzle = () => {
    const solved = solveSudoku(puzzle);
    setPuzzle(solved);
    setSolvedPuzzle(solved);
  };

  const resetPuzzle = () => {
    const newPuzzle = generateRandomSudoku(difficulty);
    setInitialPuzzle(newPuzzle);
    setPuzzle(JSON.parse(JSON.stringify(newPuzzle)));
    setSolvedPuzzle([]);
    setValidationResult('');
  };

  const handleCellChange = (value, row, col) => {
    const newPuzzle = puzzle.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? +value : cell,
      ),
    );
    setPuzzle(newPuzzle);
  };

  const clearCell = (row, col) => {
    const newPuzzle = puzzle.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? 0 : cell,
      ),
    );
    setPuzzle(newPuzzle);
  };

  return (
    <View style={styles.container}>
      {puzzle.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, columnIndex) => (
            <TextInput
              key={columnIndex}
              style={[
                styles.cell,
                (rowIndex + columnIndex) % 2 === 0
                  ? styles.lightBackground
                  : styles.darkBackground,
              ]}
              value={cell !== 0 ? String(cell) : ''}
              onChangeText={value =>
                handleCellChange(value, rowIndex, columnIndex)
              }
              keyboardType="numeric"
              maxLength={1}
              onFocus={() => clearCell(rowIndex, columnIndex)}
            />
          ))}
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <Button title="Validate" onPress={validatePuzzle} />
        <Button title="Solve" onPress={solvePuzzle} />
        <Button title="Reset" onPress={resetPuzzle} />
      </View>
      {validationResult !== '' && (
        <Text
          style={
            validationResult === 'Correct'
              ? styles.correctText
              : styles.incorrectText
          }>
          {validationResult}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EAED',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#1E1F28',
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  lightBackground: {
    backgroundColor: '#F0F3F5',
  },
  darkBackground: {
    backgroundColor: '#D1D8DD',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 30,
  },
  correctText: {
    marginTop: 20,
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
  },
  incorrectText: {
    marginTop: 20,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SudokuPuzzle;
