import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen 
                name='index'
                options={{
                    headerShown: false,
                    title: "Home", tabBarIcon: ({color}) => 
                    <Entypo name="home" size={24} color={color} 
                    />
                }}    
            />
            <Tabs.Screen 
                name='liked'
                options={{
                    headerShown: false,
                    title: "Liked", tabBarIcon: ({color}) => 
                    <MaterialIcons name="favorite" size={24} color={color}  />
                }}    
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({})

export default TabsLayout;
