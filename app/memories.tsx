import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const memories = [
  {
    id: '1',
    title: 'Beach Sunset',
    image: 'https://source.unsplash.com/400x300/?beach,sunset',
  },
  {
    id: '2',
    title: 'First Trip Together',
    image: 'https://source.unsplash.com/400x300/?travel,couple',
  },
  {
    id: '3',
    title: 'Birthday Celebration 🎂',
    image: 'https://source.unsplash.com/400x300/?cake,party',
  },
  {
    id: '4',
    title: 'Candlelight Dinner',
    image: 'https://source.unsplash.com/400x300/?romantic,dinner',
  },
];

export default function MemoriesScreen() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View>
        <Text style={styles.header}>Our Memories ❤️</Text>
        <View style={styles.cardsParent}>
        <FlatList
          data={memories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
        />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f6',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontFamily: 'SpaceMono',
    color: '#ff4d5a',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsParent :{
    paddingBottom : 20
  },
  card: {
    backgroundColor: '#ffe6ea',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#ff4d5a',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 20,
    fontFamily: 'SpaceMono',
    color: '#ff4d5a',
    textAlign: 'center',
    padding: 10,
  },
});
