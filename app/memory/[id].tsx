import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

type Memory = {
  title: string;
  imageUrl: string;
}

export default function MemoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [memory, setMemory] = useState<Memory>({ title: '', imageUrl: '' });

  useEffect(() => {
    const fetchMemory = async () => {
      const docRef = doc(db, 'memories', id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setMemory(docSnap.data() as any);
    };

    fetchMemory();
  }, [id]);

  if (!memory) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#ff4d5a" />
      </TouchableOpacity>
      <Image source={{ uri: memory?.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{memory?.title}</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <Text style={styles.buttonText}>Back to Memories</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backButton: {
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    backgroundColor: '#ffe6eb',
    borderRadius: "50%",
  },
  image: { width: '100%', height: 300, borderRadius: 10 },
  title: { fontSize: 24, marginVertical: 10, fontWeight: 'bold' },
  button: { backgroundColor: '#ff4d5a', padding: 10, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});
