import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/components/Home';
import Details from './src/components/Details';
import FavoriteList from './src/components/FavoriteList';
import { LogBox } from 'react-native';
const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="Details" component={Details} options={{ headerShown: true,headerStyle: {
      backgroundColor: 'orange',
    },}} />
    <Stack.Screen name="Favorite" component={FavoriteList} options={{ headerShown: true,headerStyle: {
      backgroundColor: 'orange',
    },}} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
