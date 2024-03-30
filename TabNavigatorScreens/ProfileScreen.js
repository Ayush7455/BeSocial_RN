import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Text, View, ActivityIndicator, ScrollView, RefreshControl, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import NoImage from "../assets/images/noimg.png";
import { StatusBar } from "react-native";
import { NativeBaseProvider, useToast,Skeleton } from "native-base"
import { Feather } from '@expo/vector-icons';
import { AuthContext } from "../navigation/AuthProvider";
import firestore from '@react-native-firebase/firestore';
import Feed from "../Components/Feed";
import { AntDesign } from '@expo/vector-icons';
import ContactLoader from "../Components/ContactLoader";

const ProfileScreen = ({ navigation, route }) => {
    const { user, logout } = useContext(AuthContext)
    const width = Dimensions.get("window").width
    const [userData, setUserData] = useState(null)
    const [refresh, setRefresh] = useState(false);
    const toast = useToast();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    
    const fetchPosts = async () => {
        setLoading(true)
        try {
          const list = [];
    
          await firestore()
          .collection('posts')
          .where('userId', '==', route.params ? route.params.userId : user.uid)
          .orderBy('postTime', 'desc')
          .get()
            .then((querySnapshot) => {
    
              querySnapshot.forEach((doc) => {
                const {
                  userId,
                  post,
                  postImg,
                  postTime,
                  likes,
                  comments,
                  userName,
                  userImg,
                  userEmail
                } = doc.data();
                list.push({
                  id: doc.id,
                  userId,
                  userName,
                  userImg,
                  postTime,
                  post,
                  postImg,
                  liked: false,
                  likes,
                  comments,
                  userEmail
                });
              });
            });
    
          setPosts(list);
          setLoading(false)
        } catch (e) {
          console.log(e);
          setLoading(false)
        }
      };
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          fetchPosts();
        });
        return unsubscribe;
      }, [navigation]);

    const onRefresh = async () => {
        setRefresh(true);
        await fetchPosts();
        setRefresh(false);
    };
    
    return (
        <NativeBaseProvider>
            <StatusBar
                backgroundColor={"white"}
                barStyle={"dark-content"}
            />
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, paddingTop: 20 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={onRefresh}
                        />
                    }
                    style={{ padding: 8 }}
                >
                    <View style={{ alignItems: "center" }}>
                        <View style={{ width: 100, height: 100, borderRadius: 50, overflow: "hidden", marginTop: 10 }}>
                            <Image source={{ uri: route.params ?route.params.userImg:user.photoURL }} style={{ flex: 1, width: undefined, height: undefined }} />
                        </View>
                        <View style={{ alignSelf: "center", alignItems: "center", marginTop: 16 }}>
                            <Text style={{ fontWeight: "200", fontSize: 36 }}>{route.params ?route.params.userName:user.displayName}</Text>
                            <Text style={{ fontSize: 14, color: "#AEB5BC" }}>{userData?.about}</Text>
                        </View>
                        {route.params ? <>
                            {route.params.userId !== user.uid ? <View style={{ flexDirection: "row", marginVertical: 15 }}>
                                <TouchableOpacity style={{ height: 40, width: 110, borderWidth: 2, marginRight: 20, alignItems: "center", justifyContent: "center", borderColor: "#3584EF" }}>
                                    <Text style={{ color: "#3584EF" }}>Message</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ height: 40, width: 90, borderWidth: 2, alignItems: "center", justifyContent: "center", borderColor: "#3584EF" }}>
                                    <Text style={{ color: "#3584EF" }}>Follow</Text>
                                </TouchableOpacity>

                            </View> : <View style={{ flexDirection: "row", marginVertical: 15 }}>
                                <TouchableOpacity style={{ height: 40, width: 110, borderWidth: 2, marginRight: 20, alignItems: "center", justifyContent: "center", borderColor: "#3584EF" }} onPress={() => navigation.navigate("EditProfileScreen")}>
                                    <Text style={{ color: "#3584EF" }}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ height: 40, width: 90, borderWidth: 2, alignItems: "center", justifyContent: "center", borderColor: "#3584EF" }} onPress={() => logout()}>
                                    <Text style={{ color: "#3584EF" }}>Logout</Text>
                                </TouchableOpacity>

                            </View>
                            }
                        </> : <View style={{ flexDirection: "row", marginVertical: 15 }}>
                            <TouchableOpacity style={{ height: 40, width: 110, borderWidth: 2, marginRight: 20, alignItems: "center", justifyContent: "center", borderColor: "#3584EF" }} onPress={() => navigation.navigate("EditProfileScreen")}>
                                <Text style={{ color: "#3584EF" }}>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ height: 40, width: 90, borderWidth: 2, alignItems: "center", justifyContent: "center", borderColor: "#3584EF" }} onPress={() => logout()}>
                                <Text style={{ color: "#3584EF" }}>Logout</Text>
                            </TouchableOpacity>

                        </View>
                        }


                        <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 16 }}>
                            <View style={{ alignItems: "center", flex: 1 }}>
                                <Text style={{ fontSize: 24 }}>{posts?.length}</Text>
                                <Text style={{ fontSize: 12, color: "#AEB5BC", textTransform: "uppercase", fontWeight: "500" }}>Posts</Text>
                            </View>
                            <View style={{ alignItems: "center", flex: 1, borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }}>
                                <Text style={{ fontSize: 24 }}>10</Text>
                                <Text style={{ fontSize: 12, color: "#AEB5BC", textTransform: "uppercase", fontWeight: "500" }}>Followers</Text>
                            </View>
                            <View style={{ alignItems: "center", flex: 1 }}>
                                <Text style={{ fontSize: 24 }}>50</Text>
                                <Text style={{ fontSize: 12, color: "#AEB5BC", textTransform: "uppercase", fontWeight: "500" }}>Following</Text>
                            </View>
                        </View>
                    </View>
{loading?       <View>
        <View style={{height:300,width:"100%",marginTop:10,padding:8,backgroundColor:"white",elevation:2}}>
          <View style={{flexDirection:"row",alignItems:"center"}}>
    <View style={{height:40,width:40}}>
    <Skeleton h="100%" w="100%" borderColor="coolGray.200" endColor="warmGray.50"/>
    </View>
    <Skeleton.Text w="85%" lines={2} ml="5" mr="5"/>
    </View>
    <View style={{height:230,width:"100%",marginTop:10}}>
    <Skeleton h="100%" w="100%"/>
    </View>

        </View>
        <View style={{height:100,width:"100%",marginTop:10,padding:8,backgroundColor:"white",elevation:2}}>
          <View style={{flexDirection:"row",alignItems:"center"}}>
    <View style={{height:40,width:40}}>
    <Skeleton h="100%" w="100%" borderColor="coolGray.200" endColor="warmGray.50"/>
    </View>
    <Skeleton.Text w="85%" lines={2} ml="5" mr="5"/>
    </View>
    <View style={{height:230,width:"100%",marginTop:10}}>
    <Skeleton h="100%" w="100%"/>
    </View>

        </View>
        </View>:
                    <View style={{ marginTop: 20 }}>
                        {posts.map((post) => (
                            <Feed
                                key={post.id}
                                userName={post.userName}
                                userImg={post.userImg}
                                userEmail={post.userEmail}
                                postTime={post.postTime}
                                post={post.post}
                                postImg={post.postImg}
                                liked={post.liked}
                                likes={post.likes}
                                comments={post.comments}
                                id={post.userId}
                                postId={post.id}
                                
                                
                            />
                        ))}
                    </View>
}

                </ScrollView>

            </SafeAreaView>
            </NativeBaseProvider>
    )
}
export default ProfileScreen;
