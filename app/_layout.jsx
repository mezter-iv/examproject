import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';

const RootLayout = () => {
    return (
        
        <Stack>
            <Stack.Screen name="(tabs)" options={{
                headerShown: false
            }}/>
            <Stack.Screen name="song/[id]" options={{
                title: ""
            }}/>
        </Stack>
    );
}

const styles = StyleSheet.create({})

export default RootLayout;
