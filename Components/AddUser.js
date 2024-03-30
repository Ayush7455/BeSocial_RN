import React,{useContext,useEffect,useState} from "react";
import {Text,View,Image,TouchableOpacity} from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import io from 'socket.io-client';
import { AuthContext } from "../navigation/AuthProvider";
const socket = io.connect('http://13.232.220.47:3001');
const AddUser=({item})=>{
   
    const navigation=useNavigation()
    const { user } = useContext(AuthContext);
    const emailIds = [item.email, user.email];
    const sortedEmails = emailIds.sort();
    const room = sortedEmails.map(email => email.split('@')[0]).join('');
    console.log(room);
    console.log("Namefjsdkfskdfhskjd",user.displayName)
    const joinRoom = () => {
        if (user.email !== '' && room !== '') {
          socket.emit('join_room', room);
            navigation.navigate("ChatRoom",{receiverEmail:item.email,email:user.email,room,socket,receiverImage:item.image,name:item.name,image:user.photoURL,receiverName:user.displayName})
        }
      };
    return(
    <TouchableOpacity style={{height:80,borderBottomWidth:2,borderBottomColor:"#F5F5F5",justifyContent:"center"}} onPress={()=>joinRoom()}>
        <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:20}}>
            <Image source={{uri:item.image}} style={{height:40,width:40,borderRadius:25}}/>
            <View style={{paddingHorizontal:15}}>
            <Text style={{fontSize:16,fontWeight:500}}>{item.name}</Text>
            <Text>{item.email}</Text>
            </View>
</View>
    </TouchableOpacity>
    
    )
}
export default AddUser