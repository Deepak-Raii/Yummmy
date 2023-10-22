import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, FlatList } from 'react-native';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = 'b36162e7af244d988d3b97f454f2136b';
const BASE_URL = 'https://spoonacular.com/recipeImages/';

export default function Home() {
    const [recipe, setRecipe] = useState(null);
    const [query, setQuery] = useState('');
    const [favorites, setFavorites] = useState([]); // Initialize as an empty array
    const navigation = useNavigation();

    useEffect(() => {
        fetchRecipes();
        AsyncStorage.getItem('favorites').then(results => {
            setFavorites(results ? JSON.parse(results) : []); // Check for null values
        })
    }, [query]);

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/search', {
                params: {
                    apiKey: API_KEY,
                    query: query,
                },
            });

            setRecipe(response.data.results);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = (item) => {
        try {
            navigation.navigate('Details', { responseData: item });
            setQuery('');

        }
        catch (err) {
            console.log(err);
        }
    };

    const handleFavorite = async (item) => {
        try {
            const existingFavorites = [...favorites];
            const index = existingFavorites.findIndex((favItem) => favItem.id === item.id);

            if (index !== -1) {
                existingFavorites.splice(index, 1);
            } else {
                existingFavorites.push(item);
            }
            setFavorites(existingFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(existingFavorites));
        }
        catch (err) {
            console.log(err);
        }

    }

    const favoriteList = () => {
        navigation.navigate('Favorite');
    }

    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.brandView}>
                <Text style={styles.brandName}>Yummy</Text>
                <TouchableOpacity onPress={favoriteList} activeOpacity={0.7}><Text style={{ color: "white", fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>Favorite</Text></TouchableOpacity>
            </View>
            <View style={styles.inputView}>
                <TextInput value={query} onChangeText={(value) => setQuery(value)} style={styles.textInput} placeholder='Search' />
            </View>

            <View style={styles.flatView}>
                {recipe !== null ? (
                    <FlatList
                        data={recipe}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <View style={{ display: "flex", justifyContent: "start", alignItems: "start" }}>
                                    <Image
                                        source={{ uri: `${BASE_URL}${item.image}` }}
                                        style={styles.img}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => handleClick(item)}>
                                    <Text style={{ fontSize: responsiveFontSize(1.5), textAlign: 'center', fontWeight: 'bold', color: "black" }}>{item.title}</Text>
                                </TouchableOpacity>
                                <View style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                                    <TouchableOpacity onPress={() => handleFavorite(item)}>
                                        <AntDesign
                                            name={favorites.some((favItem) => favItem.id === item.id) ? 'heart' : 'hearto'}
                                            size={30}
                                            color={favorites.some((favItem) => favItem.id === item.id) ? 'red' : 'black'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                ) : <Text style={{ color: 'white' }}>Loading...</Text>}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "orange",
        paddingBottom: 60
    },
    brandView: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        width: responsiveScreenWidth(95),
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    brandName: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 'bold',
        color: 'white',
    },
    inputView: {
        backgroundColor: "whitesmoke",
        width: responsiveScreenWidth(95),
        borderRadius: 20,
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
    },
    textInput: {
        height: responsiveScreenHeight(5),
    },
    flatView: {
        marginTop: 10,
        width: responsiveScreenWidth(100),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 50,
    },
    card: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        width: responsiveScreenWidth(47),
        gap: 5,
        elevation: 2,
        borderRadius: 10,
        marginHorizontal: 2
    },
    img: {
        height: responsiveScreenHeight(15),
        width: responsiveScreenWidth(40),
        objectFit: 'fill',
    },
});
