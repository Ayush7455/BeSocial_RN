import React, {useState, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import OnBoardingScreen from "../Screens/OnBoardingScreen"
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  
    GoogleSignin.configure({
      webClientId: '883878913335-lhuoqe0gc96nja8aku6rsrqfp2u96dr0.apps.googleusercontent.com',
    });

  
  }, []);

  if (isFirstLaunch === null) {
    return null
  } else if (isFirstLaunch == true) {
    routeName = 'OnboardingScreen';
  } else {
    routeName = 'LoginScreen';
  }
   
  return (
    <Stack.Navigator initialRouteName={routeName} screenOptions={{ headerShown: false,animation:"fade" }}>
    <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false}} />
  </Stack.Navigator>
  )
}
export default AuthStack