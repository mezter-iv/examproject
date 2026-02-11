import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import LikedProvider from '../context/LikedContext';

const RootLayout = () => {
    return (
        <LikedProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="song/[id]" options={{
                    title: ""
                }}/>
            </Stack>
        </LikedProvider>
    );
}

const styles = StyleSheet.create({})

export default RootLayout;
