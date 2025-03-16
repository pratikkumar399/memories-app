import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Baby ❤️</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push("./memory/memories")}>
        <Text style={styles.buttonText}>Take me in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff0f6',
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
