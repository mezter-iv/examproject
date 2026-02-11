import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../../src/UI/input/AppTextInput';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Search = ({setFilter}) => {
    const [title, setTitle] = useState();

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}> 
                <AppTextInput 
                    placeholder="Search..." 
                    value={title} 
                    onChangeText={setTitle}
                /> 
            </View> 
            <Pressable onPress={() => setFilter(title)}>
                <FontAwesome name="search" size={36} color="black" style={{marginRight: 10}}/>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%',   
    }
})

export default Search;
