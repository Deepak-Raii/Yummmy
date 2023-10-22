import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, Linking} from 'react-native'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';


const BASE_URL = 'https://spoonacular.com/recipeImages/';
export default function Details({route}) {
    const {responseData} = route.params;
    console.log("data : ", responseData);
  return (
    <SafeAreaView style={styles.mainView}>
        <View style={styles.cardView}>
            <Image source={{uri:`${BASE_URL}${responseData.image}`}} alt={'img'} style={styles.img}/>
            <Text style={{fontWeight:'bold'}}>{responseData ? responseData.title : 'Loading...'}</Text>
            <Text>Ready In Minutes : {responseData ? responseData.readyInMinutes : 'Loading...'}</Text>
            <Text style={{color:'blue'}} onPress={() => Linking.openURL(responseData.sourceUrl)}>{responseData.sourceUrl}</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainView:{
        height:'100%',
        width:responsiveScreenWidth(100),
        backgroundColor:'orange',
        flex:1,
        alignItems:"center",
        justifyContent:'center',

    },
    img:{
        height:responsiveScreenHeight(30),
        width:responsiveScreenWidth(70),
        borderRadius:20,
        objectFit:'fill'
    },
    cardView:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:responsiveScreenWidth(95),
        backgroundColor:"white",
        paddingVertical:30,
        paddingHorizontal:20,
        borderRadius:30,
        marginBottom:50,
        gap:10,
        elevation:5

    }
})
