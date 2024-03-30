import React, { useState ,useContext, useEffect} from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import avatar1 from "../assets/images/avatar1.png";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Contacts from "../Data/Contacts";
import ContactItem from "../Components/ContactItem";
import { AuthContext } from "../navigation/AuthProvider";
import { Entypo } from '@expo/vector-icons';
import { NativeBaseProvider,Modal} from "native-base";
import AddUser from "../Components/AddUser";
import axios from 'axios';
import ContactLoader from "../Components/ContactLoader";
import no_chat from "../assets/images/no_chat.png"

const ChatScreen = ({navigation}) => {
  const {user}=useContext(AuthContext)
  const [contacts,setContacts]=useState([]);
  const [searchEnable,setSearchEnable]=useState(false)
  const [addUserVisible,setAddUserVisible]=useState(false)
  const [search,setSearch]=useState("")
  const [searchResults, setSearchResults] = useState([]);
  const email=user.email
  const [contactLoading,setContactLoading]=useState(false)
  const [searchLoading,setSearchLoading]=useState(false)

  // const [cameraOpen, setCameraOpen] = useState(false);
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  // const openCamera = () => {
  //   requestPermission()
  //   setCameraOpen(true);
  // };

  // const closeCamera = () => {
  //   setCameraOpen(false);
  // };

  // if (cameraOpen) {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <Camera
  //         style={{ flex: 1 }}
  //         type={CameraType.back}
  //         onCameraReady={() => {
  //           // Camera is ready
  //         }}
  //       >
  //         <TouchableOpacity
  //           style={{ position: "absolute", top: 20, right: 20 }}
  //           onPress={closeCamera}
  //         >
  //           <AntDesign name="close" size={30} color="white" />
  //         </TouchableOpacity>


  //         <TouchableOpacity
  //           style={{ position: "absolute", bottom: 20,alignSelf:"center",backgroundColor:"white",height:80,width:80,borderRadius:40,alignItems:"center",justifyContent:"center"}}
  //         >
  //           <AntDesign name="camerao" size={40} color="black" />
  //         </TouchableOpacity>
  //       </Camera>
  //     </View>
  //   );
  // }
  const fetchRooms = async () => {
    setContactLoading(true)
    try {
      const response = await axios.get(`http://13.232.220.47:3001/getRooms/${email}`);
      setContacts(response.data);
      console.log("items",contacts)
      setContactLoading(false)
    } catch (error) {
      console.error(error);
      setContactLoading(false)
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchRooms();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const getallusers = async () => {
      setSearchLoading(true)
      if (search.length > 0) {
        try {
          const response = await axios.get(`http://13.232.220.47:3001/getUserByEmail?keyword=${search}`);
    
          const data = response.data;
    
          if (data.error) {
            setSearchResults([]);
            setSearchLoading(false)
          } else if (data.message === 'User Found') {
            console.log(data);
            setSearchResults(data.user);
            setSearchLoading(false)
          }
        } catch (error) {
          setSearchResults([]);
          setSearchLoading(false)
          console.error("Error fetching user data:", error);
        }
      } else {
        setSearchResults([]);
        setSearchLoading(false)
      }
    };
    
    getallusers();
  }, [search]);
  

  return (
    <NativeBaseProvider>
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

      {!searchEnable?
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
          borderBottomWidth: 2,
          borderBottomColor: "#F5F5F5",
        }}
      >
        <Image source={{uri:user.photoURL}} style={{ height: 40, width: 40,borderRadius:20}} />
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: "#F5F5F5",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 10,
          }}
          onPress={()=>setSearchEnable(true)}
        >
          <AntDesign name="search1" size={18} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, paddingHorizontal: 70, flex: 1 }}>
          Chat
        </Text>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: "#F5F5F5",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={()=>setAddUserVisible(true)}
        >
          <Feather name="user-plus" size={18} color="black" />
        </TouchableOpacity>
      </View>: <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
          borderBottomWidth: 2,
          borderBottomColor: "#F5F5F5",
        }}
      >
        <Image source={{uri:user.photoURL}} style={{ height: 40, width: 40,borderRadius:20}} />
        <View style={{flex:1,height:40,marginLeft:10,backgroundColor:"#F0F0F0",borderRadius:10,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
          <TouchableOpacity style={{marginLeft:4,alignItems:"center",justifyContent:"center"}} >
        <AntDesign name="arrowleft" size={20} color="black" onPress={()=>setSearchEnable(false)}/>
        </TouchableOpacity>
        <TextInput
        placeholder="Search"
        style={{alignItems:"center",justifyContent:"center",flex:1,marginLeft:4}}
        />
        <TouchableOpacity style={{backgroundColor:"white",borderRadius:20,marginRight:4}}onPress={()=>setSearchEnable(false)}>
        <Entypo name="cross" size={15} color="black" />
        </TouchableOpacity>
        </View>
        </View>
}
{contactLoading?
  <View style={{ flex: 1 }}>
<ContactLoader/>
<ContactLoader/>
<ContactLoader/>
<ContactLoader/>
<ContactLoader/>
<ContactLoader/>
<ContactLoader/>
<ContactLoader/>
</View>:
      <View style={{ flex: 1}}>
        {contacts.length==0?<View style={{alignItems:"center",justifyContent:"center"}}>
          <Image source={no_chat} style={{height:150,width:150}}/>
          <Text style={{paddingVertical:20,fontWeight:500,fontSize:20}}>No Messages, yet.</Text>
          <Text style={{paddingHorizontal:80}}>No messages in your inbox, yet! Start</Text>
          <Text style={{paddingHorizontal:80}}>chatting with people you know</Text>
          <TouchableOpacity style={{height:40,width:140,borderWidth:2,marginTop:20,borderRadius:20,alignItems:"center",justifyContent:"center"}} onPress={()=>setAddUserVisible(true)}>
          <Text>Explore</Text>
          </TouchableOpacity>

        </View>:
        <FlatList
          data={contacts}
          renderItem={({ item }) => <ContactItem item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
}
      </View>
}
      {/* <Modal isOpen={addUser} onClose={() => setAddUser(false)}>
          <Modal.Content>

            <Modal.Body>
              <Text style={Styles.modalHeader}>Add User</Text>
              <Text>Search your friends using their email!.</Text>
              <View style={Styles.editCategoryModalContainer}>
                <TextInput placeholder="Email" style={{ marginLeft: 10, flex: 1 }} onChangeText={(text)=>setSearch(text)} />
              </View>
            </Modal.Body>
            {searchLoading?<ActivityIndicator style={{height: 120}}/>:
            <FlatList
          style={{ height: 120 }}
          data={searchResults}
          renderItem={({ item }) => <AddUser item={item}/>}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
            }
          </Modal.Content>
        </Modal> */}
         <Modal isOpen={addUserVisible} onClose={() => setAddUserVisible(false)}>
         <Modal.Content>

<Modal.Body>
  <Text style={Styles.modalHeader}>Add User</Text>
  <Text>Search your friends using their email!.</Text>
  <View style={Styles.editCategoryModalContainer}>
    <TextInput placeholder="Email" style={{ marginLeft: 10, flex: 1 }} onChangeText={(text)=>setSearch(text)} />
  </View>
</Modal.Body>
{searchLoading?<ActivityIndicator style={{height: 120}}/>:
<FlatList
style={{ height: 120 }}
data={searchResults}
renderItem={({ item }) => <AddUser item={item}/>}
keyExtractor={(item) => item.id}
showsVerticalScrollIndicator={false}
/>
}
</Modal.Content>
      </Modal>


    </SafeAreaView>
     </NativeBaseProvider>
  );
};
const Styles=StyleSheet.create({
  title:{
      fontSize:24,
      lineHeight: 32,
      color:"#2D9D75",
      marginHorizontal:20,
      marginTop:113
  },
  image:{
      height:325,
      width:320,
      marginTop:56,
      alignSelf:"center"
  },
  bottomContainer:{
    marginTop:80,
      flex:1,
      backgroundColor:"#2D9D75",
      borderTopRightRadius:16,
      borderTopLeftRadius:16
  },
  subBottomContainer:{
      flexDirection:"row",
      height:48,
      width:320,
      backgroundColor:"white",
      alignSelf:"center",
      marginTop:16,
      borderRadius:10,
      alignItems:"center",
      justifyContent:"center"
  },
  subBottomContainerImage:{
      height:32,
      width:32,
      marginRight:14
  },
  subBottomContainerText1:{
      textAlign:"center",
      marginVertical:16,
      color:"white",
      fontSize:12
  },
  subBottomContainerText2:{
      textAlign:"center",
      color:"white",
      fontSize:14
  },
  modalHeader: {
    paddingBottom: "10%",
    fontSize: 16,
  },
  modalConfirmationOptionsContainer: {
    alignSelf: "flex-end",
    paddingTop: 20,
    flexDirection: "row"
  },
  editCategoryModalContainer: {
    flex: 1,
    flexDirection: "row",
    height: 44,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginTop: 20
  }
})
export default ChatScreen;
