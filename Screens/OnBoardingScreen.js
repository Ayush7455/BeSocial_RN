import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity,Button, SafeAreaView, StatusBar } from "react-native";
import {Text,View,Image} from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnBoardingScreen=()=>{
    const navigation=useNavigation()
    const Dots = ({selected}) => {
        let backgroundColor;
    
        backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
    
        return (
            <View 
                style={{
                    width:6,
                    height: 6,
                    marginHorizontal: 3,
                    marginBottom:250,
                    backgroundColor
                }}
            />
        );
    }
    
    const Skip = ({...props}) => (
        <TouchableOpacity
            style={{marginHorizontal:10}}
            {...props}
        >
            <Text style={{fontSize:16}}>Skip</Text>
        </TouchableOpacity>
    );
    
    const Next = ({...props}) => (
        <TouchableOpacity
            style={{marginHorizontal:10}}
            {...props}
        >
            <Text style={{fontSize:16}}>Next</Text>
        </TouchableOpacity>
    );
    
    const Done = ({...props}) => (
        <TouchableOpacity
            style={{marginHorizontal:10}}
            {...props}
        >
            <Text style={{fontSize:16}}>Done</Text>
        </TouchableOpacity>
    );
    
    return(
          <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
             <StatusBar
        backgroundColor={"white"}
        barStyle={"dark-content"}
        />
<Onboarding
    SkipButtonComponent={Skip}
    NextButtonComponent={Next}
    DoneButtonComponent={Done}
    DotComponent={Dots}
    bottomBarColor="white"
    onSkip={() => navigation.replace("LoginScreen")}
    onDone={() => navigation.navigate("LoginScreen")}
  pages={[
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/images/Onboarding1.png')} style={{height:150,width:150}}/>,
      title: 'UnitySphere',
      subtitle: 'Forge Connections, Share Moments',
    },
    {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/images/Onboarding2.png')} style={{height:150,width:150}}/>,
        title: 'LinkUp',
        subtitle: 'Connect. Share. Inspire',
      }
  ]}
/>
</SafeAreaView>
    )
}
export default OnBoardingScreen