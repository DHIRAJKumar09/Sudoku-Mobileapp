// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button,TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
      <Text style={styles.title}>Sudoku Master</Text>
      <Text style={styles.subtitle}>
        Challenge your mind with different difficulty levels.
      </Text>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('Difficulty')}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      padding: 20,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      color: '#555',
      textAlign: 'center',
      marginBottom: 40,
    },
    getStartedButton: {
      backgroundColor: '#3A6EA5',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
    },
    getStartedText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  

export default HomeScreen;
