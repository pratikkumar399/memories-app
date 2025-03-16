import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

interface Memory {
  id: string;
  title: string;
  imageUrl: string;
}

export default function MemoriesScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const fetchMemories = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, 'memories'));
      const memoriesList: Memory[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Memory[];
      setMemories(memoriesList);
      setIsLoading(false);
    };

    fetchMemories();
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Our Memories ❤️</Text>
      <FlatList
        data={memories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/memory/${item.id}`)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/memory/addmemory')}>
        <Text style={styles.buttonText}>Add Memory</Text>
      </TouchableOpacity>
    </View>
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
  card: { backgroundColor: '#ffe6eb', padding: 15, borderRadius: 10, marginBottom: 10 },
  image: { width: '100%', height: 200, borderRadius: 10 },
  title: { fontSize: 18, color: '#ff4d5a', fontFamily: 'SpaceMono', marginTop: 8 },
  button: { backgroundColor: '#ff4d5a', padding: 10, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});
