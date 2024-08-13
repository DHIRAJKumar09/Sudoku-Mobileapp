// screens/DifficultyScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DifficultyScreen = ({ navigation }) => {
    const handleDifficultySelect = (level) => {
        navigation.navigate('Sudoku', { difficulty: level });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Difficulty</Text>
            <Button title="Easy" onPress={() => handleDifficultySelect('easy')} />
            <Button title="Medium" onPress={() => handleDifficultySelect('medium')} />
            <Button title="Hard" onPress={() => handleDifficultySelect('hard')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        marginVertical: 10,
    },
});

export default DifficultyScreen;
