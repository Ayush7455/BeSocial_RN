import React, { useContext } from "react";
import { Button, SafeAreaView, StatusBar,Image } from "react-native";
import {Text,View} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessagesScreen from "../TabNavigatorScreens/MessagesScreen";
import PostsScreen from "../TabNavigatorScreens/PostsScreen";
import ProfileScreen from "../TabNavigatorScreens/ProfileScreen";
import { AuthContext } from "../navigation/AuthProvider"
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
const HomeScreen = () => { 
    const {user}=useContext(AuthContext)
    const Tab = createBottomTabNavigator();
    const CustomTabLabel = ({ label, focused }) => (
      <Text style={{ fontSize: 12, fontWeight: focused ? 600 : 500, color: focused ? "#3584EF" : "#808080" }}>
        {label}
      </Text>
    );
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
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
          <Tab.Screen name="Home" component={PostsScreen} options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />
            ),
            
          }} 
          />
          <Tab.Screen name="Messages" component={MessagesScreen} options={{
            tabBarIcon: ({ color }) => (
                <MaterialIcons name="message" size={24} color={color} />
            ),
          }} 
          />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon: ({ color }) => (
              <Image source={{uri:user.photoURL}} style={{height:30,width:30,borderRadius:15}}/>
            ),
          }} />
        </Tab.Navigator>
      </SafeAreaView>
    )
        }
export default HomeScreen