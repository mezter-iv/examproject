import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import LikedReducer from '../reducer/LikedReducer';
import { types } from '../reducer/likedreducertypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const likedContext = createContext([])

const LikedProvider = ({children}) => {

    const [liked, dispatch ] = useReducer(LikedReducer, [])

    const addToLiked = song => dispatch({type: types.ADD_ITEM, payload: song})
    const removeLiked = id => dispatch({type: types.REMOVE_ITEM, payload: id})

    useEffect(() => {
        const LoadData = async () => {
            const saved = await AsyncStorage.getItem("liked");
            if (saved) {
                dispatch({type: types.SET_ITEMS, payload: JSON.parse(saved)})
            }
        }
        LoadData()   
    }, [])
    useEffect(() => {
        const SaveData = async () => {
            try {
                await AsyncStorage.setItem("liked", JSON.stringify(liked))
            }
            catch (error) {
                console.log(error)
            }
        }
        SaveData() 
    }, [liked])

    const value = {
        liked,
        addToLiked,
        removeLiked,
    }

    return (
        <likedContext.Provider value={value}>
            {children}
        </likedContext.Provider>
    );
}

const styles = StyleSheet.create({})

export const useLiked = () => useContext(likedContext)

export default LikedProvider;
