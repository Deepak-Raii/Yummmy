import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

const BASE_URL = 'https://spoonacular.com/recipeImages/';

export default function FavoriteList() {
    const [data, setData] = useState(null);
    console.log(data)
    useEffect(() => {
        AsyncStorage.getItem('favorites').then(result => {
            {result !== '[]' ? setData(JSON.parse(result)) : setData(null)}       
            console.log("Saved Items : ", JSON.parse(result));
        });
    }, []);

    return (
        <View style={styles.mainView}>
            {data ? (<FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={{ width: responsiveScreenWidth(28) }}><Image source={{ uri: `${BASE_URL}${item.image}` }} style={styles.img} /></View>
                        <View style={{ width: responsiveScreenWidth(55) }}>
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.title}</Text>
                            <Text style={{ color: 'black', marginTop: 5 }}>Ready In Minutes : {item.readyInMinutes}</Text>
                        </View>
                    </View>
                )}
            />) : (<Text style={{color : 'black'}}>No Item</Text>)}
            


        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        paddingBottom: 10,
    },

    favText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(3),
        marginTop: 30,
    },

    card: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: responsiveScreenWidth(95),
        borderRadius: 20,
        marginTop: 5,
        elevation: 5

    },

    img: {
        height: responsiveScreenHeight(15),
        width: responsiveScreenWidth(30),
        objectFit: 'fill',
        borderRadius: 10
    }
})
