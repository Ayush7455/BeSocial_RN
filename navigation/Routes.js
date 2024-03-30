import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from "axios"

const Routes = () => {
  const Stack = createNativeStackNavigator();
  
  const addUser = async (email,image,name) => {
    if(email!=null&&image!=null){
        try {
          const response = await axios.post('http://13.232.220.47:3001/addUser', { email,image,name });
        } catch (error) {
          console.error(error);
        }
  }
  };
  const{user,setUser}=useContext(AuthContext);
  const[initializing, setInitializing]=useState(true);
  
  const onAuthStateChanged=(user)=>{
    setUser(user);
    addUser(user?.email,user?.photoURL,user?.displayName)
    if(initializing) setInitializing(false);
  }

  useEffect(()=>{
    const subscriber=auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);

if(initializing) return null;
  
  return(
 <NavigationContainer>
    { user ?<AppStack/> : <AuthStack/>}
 </NavigationContainer> 
 
  );
};

export default Routes;