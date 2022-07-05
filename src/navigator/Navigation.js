import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import PicturesScreen from '../screens/PicturesScreen';
import LoginScren from '../screens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer  >
            <Stack.Navigator screenOptions={ {headerShown:false} } initialRouteName='LoginScreen'   >
                <Stack.Screen name="HomeScreen" component={HomeScreen}  />
                <Stack.Screen name="PicturesScreen" component={PicturesScreen}  />
                <Stack.Screen name="LoginScreen" component={LoginScren}  />
            </Stack.Navigator>
            
        </NavigationContainer>)
}

export default Navigation