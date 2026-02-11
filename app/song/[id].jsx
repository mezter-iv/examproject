import { router, useLocalSearchParams, useRootNavigationState, useRouter } from 'expo-router';
import {React, useEffect, useState} from 'react';
import { StyleSheet, View ,Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SONGS } from '../../data/songs';
import { Image } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Pressable } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLiked } from '../../context/LikedContext';

const Id = () => {
    const { id } = useLocalSearchParams();
    const song = SONGS.find(s => s.id === id);
    const [songStart, setSongStart] = useState(false);
    const [sound, setSound] = useState(null);
    const [status, setStatus] = useState(null);
    const {addToLiked, liked, removeLiked} = useLiked()
    const added = liked.find(item => item.id === id)
    const router = useRouter();


    const formatTime = (ms) => {
        if (!ms) return "0:00";
        const totalSeconds = ms/1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? "0" : ''}${seconds}`
    }
    const onPlaybackStatusUpdate = (playbackStatus) => {
        if (playbackStatus.isLoaded) {
            setStatus(playbackStatus);
            setSongStart(playbackStatus.isLoaded)
        }
    }

    const onSliderValueChange = async (value) => {
        if (sound && status?.isLoaded) {
            await sound.setPositionAsync(value);
        }
    }

    const timeLeft = status?.durationMillis ? status.durationMillis - status.positionMillis : 0;

    const playSound = async () => {
        try {
            if (sound) {
                await sound.playAsync();
            } else {
                const { sound: newSoundInstance } = await Audio.Sound.createAsync(
                    song.sound,
                    {shouldPlay: true},
                    onPlaybackStatusUpdate
                );
                setSound(newSoundInstance);
            }
            setSongStart(true);
        } catch (error) {
            console.log("Error playing sound:", error);
        }
    };

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
            setSongStart(false);
        }
    };

    useEffect(() => {
        return sound ? () => { sound.unloadAsync(); } : undefined;
    }, [sound]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image source={{ uri: song.image }} style={styles.image}/>
                <Text style={styles.title}>{song.title}</Text>
                <Text style={styles.author}>{song.author}</Text>
            </View>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={status?.durationMillis || 1}
                value={status?.positionMillis || 0}
                onSlidingComplete={onSliderValueChange}
                minimumTrackTintColor='#000000'
                maximumTrackTintColor="#000000"
                thumbTintColor="#000000"
            />
            <View style={styles.timeRow}>
                <Text>{formatTime(status?.positionMillis)}</Text>
                <Text>-{formatTime(timeLeft)}</Text>
            </View>

            <View style={styles.starter}>
                <Pressable onPress={songStart ? pauseSound : playSound}>
                    <FontAwesome6 
                        name={songStart ? "pause" : "play"} 
                        size={56} 
                        color="black" 
                    />
                </Pressable>
                <Pressable onPress={() => {
                    if (added) {
                        removeLiked(id)
                    }
                    else {
                        addToLiked(song) 
                        router.push("/liked")
                    }
                }} style={{position: "absolute", marginLeft: 100, marginTop: 10}}>
                    {added ?
                        <MaterialIcons name="favorite" size={36} color="black" /> :
                        <MaterialIcons name="favorite-outline" size={36} color="black" />
                        }
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
     container: { 
        flex: 1, 
        justifyContent: "space-between",
    },
    content: { 
        flex: 1, 
    },
    image: {
        width: 350,
        height: 350,
        overflow: "hidden",
        alignSelf: "center",
        borderRadius: 10
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 30,
        marginTop: 10
    },
    author: {
        fontSize: 16,
        marginLeft: 30,
    },
    starter: {
        alignSelf: "center",
        marginBottom: 20
    },
    slider: { width: '100%', height: 40 },
    timeRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 10 
    },
})

export default Id;
