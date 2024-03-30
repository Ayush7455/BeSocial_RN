import React, { useEffect, useState, useCallback, useContext } from "react";
import { Text, View, TouchableOpacity, StatusBar, SafeAreaView, Image,ScrollView,TextInput,Button, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "../navigation/AuthProvider";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import { NativeBaseProvider, Skeleton } from "native-base";

const ChatRoom = ({ route }) => {

  const {user}=useContext(AuthContext)
  const { receiverEmail,receiverImage,email, room, socket,image,name,receiverName} = route.params;
  console.log("iteajfdhsakjfhsdakjfhsadkjfhask",receiverEmail,receiverImage,email, room,image,name,receiverName)
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatLoading,setChatLoading]=useState(false)
  const [messageList, setMessageList] = useState([]);
  const fetchMessages = async () => {
    setChatLoading(true)
    try {
      const response = await axios.get(`http://13.232.220.47:3001/getMessages/${room}`);
      setChatLoading(false)
    
      setMessageList(response.data.messages);
    } catch (error) {
      setChatLoading(false)
      console.error(error);
    }
  };
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        email:email,
        message: currentMessage,
        image: image,
        name: name,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
        receiverEmail:receiverEmail,
        receiverImage:receiverImage,
        receiverName:receiverName
      };
      await socket.emit('send_message', messageData);
      setCurrentMessage('');
    }
  };
  useEffect(()=>{
    fetchMessages()
  },[])
  useEffect(() => {
    socket.on('receive_message', async(data) => {
      setMessageList((list) => [data,...list]);
    });
  }, [socket]);
  console.log(messageList)
  const renderMessageItem = ({ item }) => (
    <View style={{marginLeft:5}}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: email === item.email ? 'flex-end' : 'flex-start',
        marginLeft:email === item.email ? 60:10,
        marginRight:email === item.email ?10:60,
        marginVertical:5,
        padding:10
      }}>
      <View
        style={{
          backgroundColor: email === item.email ? '#4399FF' : '#DCE8FF',
          borderTopRightRadius: 8,
          borderTopLeftRadius:8,
          borderBottomLeftRadius:email === item.email ?8:0,
          borderBottomRightRadius:email === item.email ?0:8,
          paddingRight:email !== item.email ?25:10,
          paddingLeft:email !== item.email?10:25,
          paddingVertical:8
        }}>
        <Text style={{ color: email === item.email ?"white":"black"}}>{item.message}</Text>
        <Text style={{fontSize:10,fontSize:10,color:email === item.email ?"white":"black",marginTop:10,alignSelf:email === item.email ?"flex-end":"flex-start"}}>{item.time}</Text>
    </View>
    </View>
      {item.email===email?<Image
      source={{uri:item.image}}
      style={{height:25,width:25,position:"absolute",right:5,bottom:0,borderRadius:20}}
      />:<Image
      source={{uri:item.image}}
      style={{height:25,width:25,position:"absolute",left:0,bottom:0,borderRadius:20}}
      />
      }
</View>
  );
  return (
    <NativeBaseProvider>
    <SafeAreaView style={{ flex: 1,backgroundColor:"white"}}>
    <View style={{height:70,borderBottomWidth:2,flexDirection:"row",alignItems:"center",borderBottomColor:"#f0f0f0",backgroundColor:"white"}}>
    <AntDesign name="left" size={18} color="black" style={{marginHorizontal:10}} />
    <Image src={receiverImage} style={{height:40,width:40,borderRadius:20}}/>
   <Text style={{fontWeight:"bold",marginLeft:5}}>{name}</Text>
    </View>
  {chatLoading?<Skeleton.Text style={{flex:1}} lines={28}/>:
    <FlatList
      data={messageList}
      renderItem={renderMessageItem}
      inverted={true}
      showsVerticalScrollIndicator={false}
    />
  }
   {

    !chatLoading&&<View style={{height:60,backgroundColor:"#DCE8FF",flexDirection:"row",alignItems:"center",marginVertical:15,width:"92%",alignSelf:"center",borderRadius:30}}>
      <TouchableOpacity style={{marginHorizontal:10,backgroundColor:"#4399FF",height:40,width:40,borderRadius:25,alignItems:"center",justifyContent:"center"}}>
      <AntDesign name="plus" size={24} color="white" />
    </TouchableOpacity>
    <TextInput
    style={{flex:1}}
    placeholder="Message"
    onChangeText={(text)=>setCurrentMessage(text)}
    value={currentMessage}
    />
    {!currentMessage?
    <TouchableOpacity style={{marginHorizontal:10}}>
      <MaterialIcons name="insert-emoticon" size={25} color="gray" />
       </TouchableOpacity>:
       <TouchableOpacity style={{marginHorizontal:10}} onPress={()=>sendMessage()}>
       <Ionicons name="send-sharp" size={25} color="#4399FF" />
       </TouchableOpacity>
}
    </View>
}
 
  </SafeAreaView>
  </NativeBaseProvider>
  );
};


export default ChatRoom;
