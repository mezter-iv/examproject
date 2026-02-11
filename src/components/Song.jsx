import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View , Text, Image} from 'react-native';

const Song = ({song}) => {
    const router = useRouter()

    return (
        <Pressable style={styles.card}
            onPress={() => router.push(`/song/${song.id}`)}
        >
            <Image source={{uri: song.image}} style={styles.image}/>
            <View style={styles.textview}>
                <Text style={styles.uppertext}>{song.title}</Text>
                <Text>{song.author}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        gap: 10,
        boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 5
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 5
    },
    uppertext: {
        fontSize: 16,
        fontWeight: "bold",
    },
    textview: {
        alignSelf: "center"
    }
})

export default Song;
