import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SONGS } from '../../data/songs';
import Song from '../../src/components/Song';

const Index = () => {
    return (
        <SafeAreaView style={styles.card}>
            <FlatList
                data={SONGS}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={styles.row}
                renderItem={({item}) => <Song song={item}/>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    overflow: "hidden",
  },
});

export default Index;
