import React,{useContext, useEffect, useState} from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from "../navigation/AuthProvider";
import { Entypo } from '@expo/vector-icons';
import { NativeBaseProvider,Menu,Pressable } from "native-base";
import firestore from '@react-native-firebase/firestore';
import moment from "moment";

const Feed = ({userName, userImg,postTime, post, postImg, liked, likes, comments,id,onDelete,postId ,onPress}) => {
    
    const {user}=useContext(AuthContext);
    const formattedTime = moment(postTime.toDate()).fromNow()
    const [userData,setUserData]=useState(null)
    const getUser = async() => {
        const currentUser = await firestore()
        .collection('users')
        .doc(id)
        .get()
        .then((documentSnapshot) => {
          if( documentSnapshot.exists ) {
            console.log('User Data', documentSnapshot.data());
            setUserData(documentSnapshot.data());
          }
        })
      }
      useEffect(()=>{
        getUser()
      },[])
    return (
        <NativeBaseProvider>
        <View style={{ padding: 8, backgroundColor: "white", marginTop: 10, elevation: 2 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={{uri:userImg}} style={{ height: 40, width: 40 }} />
                <View style={{ marginLeft: 10 ,flex:1}}>
                    <TouchableOpacity onPress={onPress}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{userName}</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 10 }}>{formattedTime}</Text>
                </View>
                {user.uid===id?<Menu w="120" mr="7"  trigger={triggerProps => {
      return <Pressable accessibilityLabel="More options menu" {...triggerProps}   style={{height:40,width:20,alignItems:"center",justifyContent:"center"}}>
               <Entypo name="dots-three-vertical" size={14} color="gray" />
            </Pressable>;
    }}>
        <Menu.Item onPress={()=>onDelete(postId)}><AntDesign name="delete" size={20} color="#3584EF" /><Text style={{color:"#3584EF"}}>Delete</Text></Menu.Item>
      </Menu>:null
}

            </View>
            <View style={{ height: 2, backgroundColor: "#F0F0F0", marginTop: 6 }}></View>
            <View style={{ flexDirection: 'column', marginTop: 6 }}>
                <Text style={{ color: "gray", marginVertical: 6 }}>{post}</Text>
                {postImg && (
                    <View style={{height:230,width:"100%",borderWidth:2,borderColor:"#f0f0f0"}}>
                    <Image
                        source={{uri:postImg}}
                        style={{resizeMode: 'contain',height:"100%",width:"100%"}}
                    />
                    </View>
                )}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {liked?
                        <AntDesign name="heart" size={20} color="red" style={{ marginRight: 5 }} />:
                        <AntDesign name="hearto" size={20} color="gray" style={{ marginRight: 5 }} />
}
                        <Text style={{ color: "gray", fontSize: 12 }}>{likes}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="message-circle" size={20} color="gray" style={{ marginRight: 5 }} />
                        <Text style={{ color: "gray", fontSize: 12 }}>{comments}</Text>
                    </View>
                </View>
            </View>
        </View>
        </NativeBaseProvider>
    )
}

export default Feed;
