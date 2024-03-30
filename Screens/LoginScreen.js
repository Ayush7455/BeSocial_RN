import React, {useContext, useState} from "react";
import {Text,SafeAreaView,StatusBar,View, TextInput, TouchableOpacity, Image,Alert, ActivityIndicator} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import google from '../assets/images/google.png'
import loginimg from '../assets/images/Login.png'
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
const LoginScreen=()=>{
    const navigation=useNavigation()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

  const {login,googleLogin,gLoading}=useContext(AuthContext)
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
        <StatusBar
   backgroundColor={"white"}
   barStyle={"dark-content"}
   />
            <Text style={{paddingHorizontal:15,fontSize:30,fontWeight:600,paddingTop:30,paddingBottom:5,fontStyle:"italic",color:"#3584EF"}}>BeSocial</Text>
            <Text style={{paddingHorizontal:15,paddingTop:10,fontWeight:400,fontStyle:"italic",color:"#3584EF"}}>Connect, Share, Thrive: BeSocial, Where Every Moment Counts!</Text>
            <View style={{marginHorizontal:15,marginTop:15}}>
                <Image
                source={loginimg}
                style={{height:300,width:300,alignSelf:"center",margin:40}}
                />
                {/* <Text style={{marginTop:40}}>Email</Text>
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
                <TouchableOpacity>
                <Text style={{alignSelf:"flex-end",paddingHorizontal:15,paddingTop:10,color:"#FF1433"}}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={{borderColor:"black",height:60,width:"95%",marginTop:80,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                    <TouchableOpacity style={{width:"45%",borderWidth:2,height:50,borderRadius:25,borderColor:"#FF4133",alignItems:"center",justifyContent:"center"}}
                    onPress={()=>navigation.navigate("SignUpScreen")}
                    >
                        <Text style={{fontSize:15,fontWeight:600,color:"#FF4133"}}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:"45%",height:50,borderRadius:25,backgroundColor:"#FF4133",alignItems:"center",justifyContent:"center"}}
                    onPress={()=>login(email,password)}
                    >
                    <Text style={{fontSize:15,fontWeight:600,color:"white"}}>Log In</Text>
                    </TouchableOpacity>
                 </View> */}

    
            
       
            </View>
          

            <View style={{
      marginTop:80,
        backgroundColor:"#3584EF",
        borderTopRightRadius:16,
        borderTopLeftRadius:16,
        alignSelf:"flex-end",
        flex:1,
        alignSelf:"center",
        width:"100%",
        justifyContent:"center"
    }}>
             {gLoading? <View style={{
        flexDirection:"row",
        height:48,
        width:320,
        backgroundColor:"white",
        alignSelf:"center",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    }} ><ActivityIndicator/></View>:<TouchableOpacity disabled={gLoading} style={{
        flexDirection:"row",
        height:48,
        width:320,
        backgroundColor:"white",
        alignSelf:"center",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    }} 
    onPress={()=>googleLogin()}
    >
                
                    <Image source={google} resizeMode="contain" style={{
        height:32,
        width:32,
        marginRight:14
    }}></Image>
                    <Text style={{fontWeight:600,fontSize:16}}>Continue with Google</Text>
                </TouchableOpacity>
}
                <Text style={{
        textAlign:"center",
        marginVertical:16,
        color:"white",
        fontWeight:400,
        fontSize:12
    }}>By continuing, you agree to our</Text>
                <Text style={{
        textAlign:"center",
        color:"white",
        fontWeight:700,
        fontSize:14
    }}>Terms & conditions and Privacy Policy</Text>
            </View>
        </SafeAreaView>
    )
}
export default LoginScreen