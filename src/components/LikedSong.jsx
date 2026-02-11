import React from 'react';
import { StyleSheet, View } from 'react-native';

const LikedSong = () => {
    return (
        <Pressable style={styles.card}
            onPress={() => router.push(`/song/${song.id}`)}
        >
            <Image source={{uri: song.image}} style={styles.image}/>
            <View style={[styles.textview, {gap: 100, flexDirection: "row"}]}>
                <View>
                    <Text style={styles.uppertext}>{song.title}</Text>
                    <Text>{song.author}</Text>
                </View>

            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({})

export default LikedSong;
