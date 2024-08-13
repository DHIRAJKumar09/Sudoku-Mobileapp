import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';

const initial = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const getDeepCopy = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

const isSafe = (grid, row, col, num) => {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) return false;
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);
    if (grid[startRow + Math.floor(x / 3)][startCol + (x % 3)] === num) return false;
  }
  return true;
};

const findEmptyLocation = (grid, loc) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        loc[0] = row;
        loc[1] = col;
        return true;
      }
    }
  }
  return false;
};

const solver = (grid) => {
  const loc = [0, 0];
  if (!findEmptyLocation(grid, loc)) return true;

  const row = loc[0];
  const col = loc[1];

  for (let num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;
      if (solver(grid)) return true;
      grid[row][col] = 0; 
    }
  }
  return false;
};

const Sudookuu = () => {
  const [arr, setArr] = useState(getDeepCopy(initial));

  const onInputChange = (text, row, col) => {
    const val = parseInt(text) || 0;
    const grid = getDeepCopy(arr);

    if (val >= 1 && val <= 9) {
      grid[row][col] = val;
      if (!isSafe(grid, row, col, val)) {
        Alert.alert("Invalid move!", "This number causes a duplicate in the row, column, or 3x3 grid.");
      }
      setArr(grid);
    } else {
      grid[row][col] = 0;
      setArr(grid);
    }
  };

  const solveSudoku = () => {
    const sudoku = getDeepCopy(arr);
    solver(sudoku);
    setArr(sudoku);
  };

  const compareSudokus = (currentSudoku, solvedSudoku) => {
    let res = {
      isComplete: true,
      isSolved: true,
    };
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
          res.isSolved = false;
        }
        if (currentSudoku[i][j] === 0) {
          res.isComplete = false;
        }
      }
    }
    return res;
  };

  const checkSudoku = () => {
    let sudoku = getDeepCopy(initial);
    solver(sudoku);
    let compare = compareSudokus(arr, sudoku);

    if (compare.isComplete) {
      Alert.alert("Congratulations!", "You have solved the Sudoku.");
    } else if (compare.isSolved) {
      Alert.alert("Keep going!", "You're on the right track.");
    } else {
      Alert.alert("Oops!", "Sudoku can't be solved. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <View style={styles.grid}>
        {arr.map((row, rindex) => (
          <View key={rindex} style={styles.row}>
            {row.map((cell, cindex) => (
              <TextInput
                key={rindex + '-' + cindex}
                style={[
                  styles.cell,
                  (rindex + 1) % 3 === 0 ? styles.rowBorder : {},
                  (cindex + 1) % 3 === 0 ? styles.colBorder : {},
                ]}
                onChangeText={(text) => onInputChange(text, rindex, cindex)}
                value={cell === 0 ? '' : cell.toString()}
                keyboardType="numeric"
                maxLength={1}
                editable={initial[rindex][cindex] === 0}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={checkSudoku}>
          <Text style={styles.btnText}>Check</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={solveSudoku}>
          <Text style={styles.btnText}>Solve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#dc3545' }]}
          onPress={() => setArr(getDeepCopy(initial))}
        >
          <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5fcff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    grid: {
      width: '90%', 
      aspectRatio: 1,
      borderWidth: 2,
      borderColor: '#000',
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#000',
      textAlign: 'center',
      fontSize: 18,
      padding: 10,
      backgroundColor: '#fff',
      flexShrink: 0, 
    },
    rowBorder: {
      borderBottomWidth: 3,
    },
    colBorder: {
      borderRightWidth: 2,
    },
    btnContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
    },
    btn: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
      flex: 1,
      alignItems: 'center',
    },
    btnText: {
      color: '#fff',
      fontSize: 16,
    },
  });

export default Sudookuu;
