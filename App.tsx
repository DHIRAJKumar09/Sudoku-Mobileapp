import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DifficultyScreen from './src/Components/DifficultyScreen';
import HomeScreen from './src/Components/HomeScreen';
import SudokuPuzzle from './src/Components/sudokuPuzzle';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Difficulty" component={DifficultyScreen} />
        <Stack.Screen name="Sudoku" component={SudokuPuzzle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
