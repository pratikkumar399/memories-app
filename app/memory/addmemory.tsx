import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { CLOUDINARY_URL } from '@/expo-env';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const UPLOAD_PRESET = 'memories'; // Set in Cloudinary

export default function AddMemoryScreen() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<any>();
    const [showImage, setShowImage] = useState<any>();
    const [uploading, setUploading] = useState(false);
    const [description, setDescription] = useState('');


    const navigation = useNavigation();
    const router = useRouter();

    // Pick an image


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result.assets?.[0]);
            setShowImage(result.assets?.[0].uri);
        }
    };


    console.log(image);
    // Upload image to Cloudinary
    const uploadImage = async () => {
        if (!image) return null;

        const source = {
            uri: image?.uri,
            type: image?.mimeType,
            name: image?.fileName || 'image.jpg',
        }

        setUploading(true);
        console.log("Uploading Image:", source);

        try {
            const data = new FormData();

            data.append('file', source?.uri)
            data.append('name', source?.name)
            data.append('upload_preset', UPLOAD_PRESET)


            console.log("Uploading to Cloudinary...");

            const response = await axios.post(CLOUDINARY_URL, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log('Cloudinary Upload Response:', response.data);

            setUploading(false);
            return response.data.secure_url;
        } catch (error) {
            console.error('Upload Error:', error);
            setUploading(false);
            Alert.alert('Upload Failed', 'Could not upload the image. Try again.');
            return null;
        }
    };
    // Save memory to Firestore
    const addMemory = async () => {
        if (!title || !image) {
            Alert.alert('Missing Fields', 'Please enter a title and select an image.');
            return;
        }

        console.log('Uploading Image...');

        const imageUrl = await uploadImage();
        if (!imageUrl) return;

        try {
            await addDoc(collection(db, 'memories'), {
                title,
                description,
                imageUrl,
                createdAt: new Date().toISOString(),
            });

            Alert.alert('Success', 'Memory Added Successfully!');
            setTitle('');
            setDescription('');
            setImage(null);
            router.replace("/memory/memories")
        } catch (error) {
            console.error('Firestore Error:', error);
            Alert.alert('Error', 'Failed to save memory.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#ff4d5a" />
            </TouchableOpacity>
            <TextInput
                placeholder="Memory Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />

            <TextInput
                placeholder="About Memory"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, { height: 100 }]}
                multiline
            />

            <View style={styles.upload}>
                <Button title="Pick an Image" onPress={pickImage} color="#ff4d9a" />
            </View>

            {showImage && <Image source={{ uri: showImage }} style={styles.image} />}

            <Button
                title={uploading ? "Uploading..." : "Add Memory"}
                onPress={addMemory}
                color="#ff4d6a"
                disabled={uploading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff0f6' },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
        backgroundColor: '#ffe6eb',
        borderRadius: "50%",
    },
    input: { height: 50, borderWidth: 1, borderColor: '#ff4d5a', borderRadius: 8, padding: 10, marginBottom: 10 },
    upload: { marginBottom: 10 },
    image: { width: '100%', height: 200, borderRadius: 10, marginTop: 10, marginBottom: 10 },
});
