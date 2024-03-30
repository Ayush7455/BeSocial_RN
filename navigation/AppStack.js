import React,{useContext, useEffect,useState} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {View,Text,Image} from "react-native"
import HomeScreen from "../Screens/HomeScreen";
import ProfileScreen from "../TabNavigatorScreens/ProfileScreen";
import MessagesScreen from "../TabNavigatorScreens/MessagesScreen";
import PostsScreen from "../TabNavigatorScreens/PostsScreen";
import { AuthContext } from "./AuthProvider";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Entypo } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
import EditProfileScreen from "../TabNavigatorScreens/EditProfileScreen";
import firestore from '@react-native-firebase/firestore';
import ChatRoom from "../Screens/ChatRoom";
const Stack=createNativeStackNavigator()


const FeedStack = ({navigation}) => (
  
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen
      name="PostsScreen"
      component={PostsScreen}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
    />
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
    <Stack.Screen name="ChatRoom" component={ChatRoom} />

  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
     <Stack.Screen
      name="EditProfileScreen"
      component={EditProfileScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const {user}=useContext(AuthContext)
    const Tab = createBottomTabNavigator();

    const getTabBarVisibility = (route) => {
      const routeName = route.state
        ? route.state.routes[route.state.index].name
        : '';
  
      if (routeName === 'ChatRoom') {
        return false;
      }
      return true;
    };


   
    const CustomTabLabel = ({ label, focused }) => (
      <Text style={{ fontSize: 12, fontWeight: focused ? 600 : 500, color: focused ? "#3584EF" : "#808080" }}>
        {label}
      </Text>
    );
  return (
    <Tab.Navigator
        
          screenOptions={({ route }) => ({
            tabBarStyle: { elevation: 0, borderTopWidth: 0, shadowOpacity: 0, height: 60, paddingBottom: 7,borderTopColor:"#F0F0F0",borderTopWidth:2,paddingVertical:5},
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <CustomTabLabel
                label={route.name}
                focused={focused}
              />
            )
  
          })}
        >
          <Tab.Screen name="Home"  component={FeedStack} options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />
            ),
            
          }} 
          />
          <Tab.Screen name="Messages" component={MessageStack} options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
            tabBarIcon: ({ color }) => (
                <MaterialIcons name="message" size={24} color={color} />
                ),
              })}
          />
          <Tab.Screen name="Profile" component={ProfileStack} options={{
            tabBarIcon: ({ color }) => (
              <Image source={{uri:user.photoURL}} style={{height:30,width:30,borderRadius:15}}/>
            ),
          }} />
        </Tab.Navigator>
  );
};

export default AppStack;