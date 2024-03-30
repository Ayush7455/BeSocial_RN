import React from "react";
import {View,Text,StyleSheet,Dimensions} from "react-native"
import { Skeleton, VStack, HStack, Center, NativeBaseProvider } from "native-base";
const width = Dimensions.get("window").width;

const ContactLoader = () => {
  return (
    <View activeOpacity={1} onPress={()=>navigation.navigate("TaskDetailsScreen")}style={styles.container}>
    <HStack  space={4} rounded="md">
        <Skeleton style={styles.iconContainer} alignSelf="center" startColor="coolGray.100" />
        <VStack flex="2" space="1">
          <Skeleton.Text startColor="coolGray.100"/>
        </VStack>
      </HStack>
  </View>
    )
};
const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: "#F5F5F5",
      height: 70,
      marginVertical: 10,
      flexDirection: "row",
      alignSelf: "center",
      alignItems: "center",
      padding: 15,
      backgroundColor: "white",
    },
    iconContainer: {
      height: 60,
      width: 60,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
    },
    textContainer: {
      paddingHorizontal: 15,
    },
    activity: {
      fontSize: 14,
      fontWeight: "500",
      paddingBottom: 2,
    },
    detailsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    detailItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    detailText: {
      paddingHorizontal: 5,
    },
  });
  
export default ContactLoader
    