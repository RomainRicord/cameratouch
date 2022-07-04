import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import PicturesScreen from '../screens/PicturesScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer  >
            <Stack.Navigator screenOptions={ {headerShown:false} } initialRouteName='HomeScreen'   >
                <Stack.Screen name="HomeScreen" component={HomeScreen}  />
                <Stack.Screen name="PicturesScreen" component={PicturesScreen}  />
            </Stack.Navigator>
            
        </NavigationContainer>)
}

export default Navigation