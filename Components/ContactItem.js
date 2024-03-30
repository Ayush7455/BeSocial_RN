import React, { useContext } from "react";
import {Text,View,Image, TouchableOpacity} from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../navigation/AuthProvider";
import io from 'socket.io-client';
const socket = io.connect('http://13.232.220.47:3001');
const ContactItem=({item})=>{
    const {user}=useContext(AuthContext)
    const navigation=useNavigation()
    const text="alkdfjlskajfdlaksdjflksadjflkasas,daskldjalskjdalksjdlaksjdlkasjdlkasjdlkasjdkwialskdjwilaskdjwialskdjwilaskdjwialskdjwialksdjwialksdjiwalksdjwial"

    const joinRoom = () => {
        if (user.email !== '' && item.room !== '') {
          socket.emit('join_room', item.room);
            navigation.navigate("ChatRoom",{receiverEmail:user.email===item.firstMessage.email?item.firstMessage.receiverEmail:item.firstMessage.email,email:user.email,room:item.room,socket,receiverImage:user.photoURL===item.firstMessage.image?item.firstMessage.receiverImage:item.firstMessage.image,name:user.displayName===item.firstMessage.name?item.firstMessage.receiverName:item.firstMessage.name,image:user.photoURL,receiverName:user.displayName})
        }
      };
    return(
    <TouchableOpacity style={{height:80,borderBottomWidth:2,borderBottomColor:"#F5F5F5",justifyContent:"center"}} onPress={()=>joinRoom()} >
        <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:20}}>
            <Image source={{uri:user.email===item.firstMessage.email?item.firstMessage.receiverImage:item.firstMessage.image}} style={{height:50,width:50,borderRadius:25}}/>
            <View style={{paddingHorizontal:15}}>
            <Text style={{fontSize:16,fontWeight:500}}>{user.displayName===item.firstMessage.name?item.firstMessage.receiverName:item.firstMessage.name}</Text>
            <View style={{flexDirection:"row",alignItems:"center"}}>
            <Ionicons name="send" size={12} color="#808080" style={{marginRight:5}} />
            <Text style={{fontSize:12,color:"#808080"}}>{item.firstMessage.message}</Text>
            </View>
            </View>
</View>
    </TouchableOpacity>
    
    )
    // {user.email===item.firstMessage.email?item.firstMessage.receiverEmail:item.firstMessage.email}
}
export default ContactItem