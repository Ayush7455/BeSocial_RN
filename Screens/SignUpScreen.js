import React,{useContext, useState} from "react";
import {Text,SafeAreaView,StatusBar,View, TextInput, TouchableOpacity, Image, ScrollView} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import google from '../assets/images/google.png'
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../navigation/AuthProvider";
const SignUpScreen=()=>{
    const navigation=useNavigation()
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");

  const {register}=useContext(AuthContext)
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
               <StatusBar
   backgroundColor={"white"}
   barStyle={"dark-content"}
   />
        <ScrollView>
            <Text style={{paddingHorizontal:15,fontSize:30,fontWeight:600,paddingTop:30,paddingBottom:5}}>Sign Up</Text>
            <Text style={{paddingHorizontal:15,paddingTop:10,fontWeight:400}}>Please sign up to continue</Text>
            <View style={{height:5,width:60,backgroundColor:"#FF4133",marginHorizontal:15,marginTop:15}}></View>
            <View style={{marginHorizontal:15,marginTop:15}}>
                <Text style={{marginTop:40}}>Email</Text>
                <View style={{height:40,width:"95%",borderWidth:2,marginTop:15,flexDirection:"row",backgroundColor:"#F0F0F0",alignItems:"center",borderColor:"gray"}}>
                <View style={{height:40,width:40,borderRightWidth:2,alignItems:"center",justifyContent:"center",borderColor:"gray"}}>
                <AntDesign name="user" size={24} color="gray" />
                </View>
                <TextInput
                style={{flex:1,marginLeft:10,color:"gray"}}
                selectionColor={"gray"}
                onChangeText={(text)=>setEmail(text)}
                />


                </View>

                <Text style={{marginTop:40}}>Password</Text>
                <View style={{height:40,width:"95%",borderWidth:2,marginTop:15,flexDirection:"row",backgroundColor:"#F0F0F0",alignItems:"center",borderColor:"gray"}}>
                <View style={{height:40,width:40,borderRightWidth:2,alignItems:"center",justifyContent:"center",borderColor:"gray"}}>
                <AntDesign name="lock" size={24} color="gray" />
                </View>
                <TextInput
                style={{flex:1,marginLeft:10,color:"gray"}}
                secureTextEntry={true}
                selectionColor={"gray"}
                onChangeText={(text)=>setPassword(text)}
                />
                </View>

                <Text style={{marginTop:40}}>Confirm password</Text>
                <View style={{height:40,width:"95%",borderWidth:2,marginTop:15,flexDirection:"row",backgroundColor:"#F0F0F0",alignItems:"center",borderColor:"gray"}}>
                <View style={{height:40,width:40,borderRightWidth:2,alignItems:"center",justifyContent:"center",borderColor:"gray"}}>
                <AntDesign name="lock" size={24} color="gray" />
                </View>
                <TextInput
                style={{flex:1,marginLeft:10,color:"gray"}}
                secureTextEntry={true}
                selectionColor={"gray"}
                onChangeText={(text)=>setConfirmPassword(text)}
                />
                </View>
                <View style={{borderColor:"black",height:60,width:"95%",marginTop:80,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <TouchableOpacity style={{width:"45%",height:50,borderRadius:25,backgroundColor:"#FF4133",alignItems:"center",justifyContent:"center"}}onPress={()=>register(email,password,confirmPassword)}>

                  
                        <Text style={{fontSize:15,fontWeight:600,color:"white"}}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:"45%",borderWidth:2,height:50,borderRadius:25,borderColor:"#FF4133",alignItems:"center",justifyContent:"center"}}
                    onPress={()=>navigation.goBack()}
                    >
                    <Text style={{fontSize:15,fontWeight:600,color:"#FF4133"}}>Log In</Text>
                    </TouchableOpacity>
                 </View>

    
            
       
            </View>
            </ScrollView>
            </SafeAreaView>
    )
}
export default SignUpScreen