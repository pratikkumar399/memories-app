import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';

export default function index() {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    // You can navigate to the next screen or show an alert here
    Alert.alert('Button Pressed', 'Let\'s go inside!');
    // If you have a "Take me in" screen, you can navigate like this:
    // navigation.navigate('TakeMeIn');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff0f6" />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome Baby ❤️</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>Take me in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff0f6', // Soft pink background for the romantic vibe
  },
  welcomeText: {
    fontSize: 30,
    fontFamily: 'SpaceMono', 
    color: '#ff4d5a', 
    marginBottom: 20,
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 3, 
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30, // Adjust this value to move the button higher or lower
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ff4d5a', // Romantic red color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'SpaceMono', 
  },
});
