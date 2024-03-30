import React,{useState,useEffect, useContext} from "react";
import {Text,View,SafeAreaView,StatusBar,Image, TextInput, TouchableOpacity,Dimensions, ScrollView} from "react-native";
import noimg from "../assets/images/noimg.png"
import { Entypo } from '@expo/vector-icons';
import { Actionsheet, useDisclose,Box,NativeBaseProvider } from "native-base";
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { AuthContext } from "../navigation/AuthProvider";
const EditProfileScreen=()=>{
    const width=Dimensions.get("window").width
    const [image,setImage]=useState(null)
    const [uploading,setUploading]=useState(false)
    const [transferred,setTransferred]=useState(0)
    const [userData,setUserData]=useState(null)
    const {user}=useContext(AuthContext)
    const {
        isOpen,
        onOpen,
        onClose
      } = useDisclose();
      const saveImage=async(image)=>{
        try{
          setImage(image);
        }
        catch(error){
  
        }
      }
      const openCamera=async()=>{
        try{
          await ImagePicker.requestCameraPermissionsAsync()
          let result = await ImagePicker.launchCameraAsync({
            cameraType:ImagePicker.CameraType.front,
            allowsEditing:true,
            aspect:[1,1],
            quality:1,
          });
          if(!result.canceled){
            await saveImage(result.assets[0].uri);
            onClose()
          }
        }
        catch(error){
          console.log("Error uploading image"+error)
          onClose()
        }
      }
      const openGallery=async()=>{
        try{
           await ImagePicker.requestMediaLibraryPermissionsAsync()
           let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:1
           })
           if(!result.canceled){
            await saveImage(result.assets[0].uri);
            onClose()
          }
        }
        catch(error){
          console.log("Error uploading image"+error)
          onclose()
        }
      }
      const getUser = async() => {
        const currentUser = await firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
          if( documentSnapshot.exists ) {
            console.log('User Data', documentSnapshot.data());
            setUserData(documentSnapshot.data());
          }
        })
      }

      const handleUpdate = async() => {
        let imgUrl = await uploadImage();
    
        if( imgUrl == null && userData.userImg ) {
          imgUrl = userData.userImg;
        }
    
        firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          fname: userData.fname,
          lname: userData.lname,
          about: userData.about,
          phone: userData.phone,
          country: userData.country,
          city: userData.city,
          userImg: imgUrl,
        })
        .then(() => {
          console.log('User Updated!');
          Alert.alert(
            'Profile Updated!',
            'Your profile has been updated successfully.'
          );
        })
      }
    
      const uploadImage = async () => {
        if( image == null ) {
          return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
        // Add timestamp to File Name
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
    
        setUploading(true);
        setTransferred(0);
    
        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);
    
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
    
          setTransferred(
            Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
              100,
          );
        });
    
        try {
          await task;
    
          const url = await storageRef.getDownloadURL();
    
          setUploading(false);
          setImage(null);
    
          // Alert.alert(
          //   'Image uploaded!',
          //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
          // );
          return url;
    
        } catch (e) {
          console.log(e);
          return null;
        }
    
      };
    
      useEffect(() => {
        getUser();
      }, []);
    
    return(
        <NativeBaseProvider>
        <SafeAreaView style={{ flex: 1,backgroundColor:"white",alignItems:"center" }}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"#FFF"} />
        <View style={{flexDirection:"row",alignItems:"center",marginVertical: 20,height:150,width:150}}>
                      {image!==null?<Image source={{uri:image}} style={{height:150,width:150,borderRadius:75}} resizeMode="contain"/>:<>{userData?.userImg?<Image source={{uri:userData?.userImg}} style={{height:150,width:150,borderRadius:75}} resizeMode="contain"/>:<Image source={noimg} style={{height:150,width:150,borderRadius:75}} resizeMode="contain"/>}</>
                      }
                    </View>

            <TouchableOpacity style={{height:50,width:50,borderWidth:5,borderRadius:25,alignItems:"center",justifyContent:"center",position:"absolute",backgroundColor:"gray",borderColor:"white",top:35,right:width-290}}
             onPress={onOpen}
            >

            <Entypo name="image" size={20} color="white" />
            </TouchableOpacity>
            <ScrollView style={{flex:1,width:"100%",marginTop:10}}>
                <View  style={{paddingHorizontal:20}}>
                <Text style={{color:"gray"}}>FIRST NAME</Text>
                <View style={{borderBottomWidth:2,height:50,borderColor:"gray"}}>
                    <TextInput style={{flex:1,color:"#4C6A8C"}}
                    selectionColor={"gray"}
                    value={userData?userData.fname:''}
                    onChangeText={(txt) => setUserData({...userData, fname: txt})}
                    />
                </View>
                </View>


                <View  style={{paddingHorizontal:20,marginTop:10}}>
                <Text style={{color:"gray"}}>LAST NAME</Text>
                <View style={{borderBottomWidth:2,height:50,borderColor:"gray"}}>
                    <TextInput style={{flex:1,color:"#4C6A8C"}}
                    selectionColor={"gray"}
                    value={userData?userData.lname:''}
                    onChangeText={(txt) => setUserData({...userData, lname: txt})}
                    />
                </View>
                </View>



                <View  style={{paddingHorizontal:20,marginTop:10}}>
                <Text style={{color:"gray"}}>ABOUT ME</Text>
                <View style={{borderBottomWidth:2,height:50,borderColor:"gray"}}>
                    <TextInput style={{flex:1,color:"#4C6A8C"}}
                    selectionColor={"gray"}
                    onChangeText={(txt) => setUserData({...userData, about: txt})}
                    value={userData ? userData.about : ''}
                    />
                </View>
                </View>




                <View  style={{paddingHorizontal:20,marginTop:10}}>
                <Text style={{color:"gray"}}>PHONE</Text>
                <View style={{borderBottomWidth:2,height:50,borderColor:"gray"}}>
                    <TextInput style={{flex:1,color:"#4C6A8C"}}
                    selectionColor={"gray"}
                    value={userData ? userData.phone : ''}
                    onChangeText={(txt) => setUserData({...userData, phone: txt})}
                    />
                </View>
                </View>


                <View  style={{paddingHorizontal:20,marginTop:10}}>
                <Text style={{color:"gray"}}>COUNTRY</Text>
                <View style={{borderBottomWidth:2,height:50,borderColor:"gray"}}>
                    <TextInput style={{flex:1,color:"#4C6A8C"}}
                    selectionColor={"gray"}
                    value={userData ? userData.country : ''}
            onChangeText={(txt) => setUserData({...userData, country: txt})}
                    />
                </View>
                </View>


                <View  style={{paddingHorizontal:20,marginTop:10}}>
                <Text style={{color:"gray"}}>CITY</Text>
                <View style={{borderBottomWidth:2,height:50,borderColor:"gray"}}>
                    <TextInput style={{flex:1,color:"#4C6A8C"}}
                    selectionColor={"gray"}
                    value={userData ? userData.city : ''}
            onChangeText={(txt) => setUserData({...userData, city: txt})}
                    />
                </View>
                </View>

                <TouchableOpacity style={{height:50,width:"90%",backgroundColor:"#3584EF",marginTop:20,alignSelf:"center",justifyContent:"center",alignItems:"center"}}
                onPress={()=>handleUpdate()}
                >
                    <Text style={{color:"white",fontSize:18}}>Save</Text>
                </TouchableOpacity>
                
            </ScrollView>
        </SafeAreaView>

        <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={openCamera}><View style={{flexDirection:"row"}}><AntDesign name="camera" size={20} color="#3584EF" /><Text style={{color:"#3584EF",marginLeft:10}}>Take Photo</Text></View></Actionsheet.Item>
          <Actionsheet.Item onPress={openGallery}><View style={{flexDirection:"row"}}><FontAwesome name="file-photo-o"size={20} color="#3584EF" /><Text style={{color:"#3584EF",marginLeft:10}}>Choose From Library</Text></View></Actionsheet.Item>
          <Actionsheet.Item onPress={onClose}><Text style={{color:"#3584EF"}}>Cancel</Text></Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
        </NativeBaseProvider>
    )
}
export default EditProfileScreen