import React, { useContext, useRef, useState,useEffect } from "react";
import { Entypo } from '@expo/vector-icons';
import { Image, SafeAreaView, StatusBar, Text, TextInput, View, TouchableOpacity ,Alert,RefreshControl, ActivityIndicator} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../navigation/AuthProvider";
import Feed from "../Components/Feed";
import { ScrollView } from "react-native";
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { NativeBaseProvider,Menu,Pressable,Center,Skeleton,HStack,VStack, Fab } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage"

const Posts = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../assets/users/user-3.jpg'),
      postTime: '4 mins ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-3.jpg'),
      liked: true,
      likes: '14',
      comments: '5',
    },
    {
      id: '2',
      userName: 'John Doe',
      userImg: require('../assets/users/user-2.jpg'),
      postTime: '2 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-3.jpg'),
      liked: false,
      likes: '8',
      comments: '0',
    },
    {
      id: '3',
      userName: 'Ken William',
      userImg: require('../assets/users/user-4.jpg'),
      postTime: '1 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-2.jpg'),
      liked: true,
      likes: '1',
      comments: '0',
    },
    {
      id: '4',
      userName: 'Selina Paul',
      userImg: require('../assets/users/user-6.jpg'),
      postTime: '1 day ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-4.jpg'),
      liked: true,
      likes: '22',
      comments: '4',
    },
    {
      id: '5',
      userName: 'Christy Alex',
      userImg: require('../assets/users/user-7.jpg'),
      postTime: '2 days ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-5.jpg'),
      liked: false,
      likes: '0',
      comments: '0',
    },
  ];
const PostsScreen = ({navigation}) => {
    const { user } = useContext(AuthContext);
    const scrollViewRef = useRef(null);
    const[posts,setPosts]=useState([])
    const [post,setPost]=useState(null)
    const[loading,setLoading]=useState(false)
    const [deleted, setDeleted] = useState(false);
    useScrollToTop(scrollViewRef);
    const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPosts();
    setRefreshing(false);
  }, []);
  //   const submitPost = async () => {
  //     const uploadUri = image;
  //     let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  //     try {
  //         const response = await fetch(uploadUri);
  //         const blob = await response.blob();
  //         const reader = new FileReader();
  //         reader.onload = async () => {
  //             const base64Data = reader.result.split(',')[1]; 
  //             try {
  //                 await storage().ref(fileName).putString(base64Data, 'base64');
  //                 console.log("Image uploaded successfully");
  //             } catch (e) {
  //                 console.log(e.message);
  //             }
  //         };
  //         reader.readAsDataURL(blob); 
  //     } catch (error) {
  //         console.log(error.message);
  //     }
      
  //     setImage(null);
  // };
  const postImage = async () => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;


    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      Alert.alert(
        'Image uploaded!',
        'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };
  const submitPost = async () => {
    if(post===null){
      Alert.alert("Please enter something to be posted")
    }
    else{
    setLoading(true)
    const imageUrl = await postImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);

    firestore()
    .collection('posts')
    .add({
      userId: user.uid,
      post: post,
      postImg: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
      userName:user.displayName,
      userImg:user.photoURL,
      userEmail:user.email
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      fetchPosts()
      setPost(null);
      setImage(null);
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
      console.log('Something went wrong with added post to firestore.', error);
    });
  }
  }
    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };
    const [image,setImage]=useState()
    const saveImage=async(image)=>{
      try{
        setImage(image);
      }
      catch(error){

      }
    }
    const uploadImage=async()=>{
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
        }
      }
      catch(error){
        console.log("Error uploading image"+error)
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
        }
      }
      catch(error){
        console.log("Error uploading image"+error)
      }
    }
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const list = [];
  
        await firestore()
          .collection('posts')
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
      fetchPosts();
    }, []);

    useEffect(() => {
      fetchPosts();
      setDeleted(false);
    }, [deleted]);
    const handleDelete = (postId) => {
      Alert.alert(
        'Delete post',
        'Are you sure?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed!'),
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => deletePost(postId),
          },
        ],
        {cancelable: false},
      );
    };
  
    const deletePost = (postId) => {
      console.log('Current Post Id: ', postId);
  
      firestore()
        .collection('posts')
        .doc(postId)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const {postImg} = documentSnapshot.data();
  
            if (postImg != null) {
              const storageRef = storage().refFromURL(postImg);
              const imageRef = storage().ref(storageRef.fullPath);
  
              imageRef
                .delete()
                .then(() => {
                  console.log(`${postImg} has been deleted successfully.`);
                  deleteFirestoreData(postId);
                })
                .catch((e) => {
                  console.log('Error while deleting the image. ', e);
                });
            } else {
              deleteFirestoreData(postId);
            }
          }
        });
    };
    const deleteFirestoreData = (postId) => {
      firestore()
        .collection('posts')
        .doc(postId)
        .delete()
        .then(() => {
          Alert.alert(
            'Post deleted!',
            'Your post has been deleted successfully!',
          );
          setDeleted(true);
        })
        .catch((e) => console.log('Error deleting posst.', e));
    };
  
  const handleReset=()=>{
    setPost(null)
    setImage(null)
  }
    return (
        <NativeBaseProvider>
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={"dark-content"} backgroundColor={"#F0F0F0"} />
            <View>
                <View style={{ height: 50, width: "95%", alignItems: "center", justifyContent: "space-between", flexDirection: "row", alignSelf: "center" }}>
                    <Entypo name="menu" size={24} color="black" />
                    <Text style={{ fontStyle: "italic", fontWeight: "500", fontSize: 20, color: "#3584EF" }}>BeSocial</Text>
                    <AntDesign name="search1" size={24} color="black" />

                </View>
                <Text style={{ padding: 15, fontSize: 25, fontWeight: 500 }}>Activities</Text>
            </View>

            <ScrollView
          style={{ flex: 1, padding: 8 }}
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
                <View style={{ width: "100%", height: 190, backgroundColor: "white", alignSelf: "center", marginTop: 15, elevation: 2, padding: 8, marginBottom: 5 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={{ uri: user.photoURL }} style={{ height: 50, width: 50 }} />
                        <Text style={{ marginLeft: 10, fontSize: 18 }}>What's Happening ?</Text>
                    </View>
                    <View style={{ height: 60, width: "100%", marginTop: 10, alignSelf: "center", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flex: 0.8, backgroundColor: "#f0f0f0" }}>
                            <TextInput
                                style={{ flex: 1, padding: 5 }}
                                placeholder="Write here....."
                                onChangeText={(text)=>setPost(text)}
                                value={post}
                            />

                        </View>
                         <Menu w="180" mr="15" mt="5" trigger={triggerProps => {
      return <Pressable accessibilityLabel="More options menu" {...triggerProps}   style={{ flex: 0.16, backgroundColor: "#64BEFD", justifyContent: "center", alignItems: "center" }}>
                <AntDesign name="plus" size={24} color="white" />
            </Pressable>;
    }}>
        <Menu.Item onPress={()=>uploadImage()}><AntDesign name="camera" size={20} color="#3584EF" /><Text style={{color:"#3584EF"}}>Take Photo</Text></Menu.Item>
        <Menu.Item onPress={()=>openGallery()} ><FontAwesome name="file-photo-o"size={20} color="#3584EF" /><Text style={{color:"#3584EF"}}>Choose Photo</Text></Menu.Item>
      </Menu>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",marginTop: 10}}>
                      {image&&<View><Image source={{uri:image}} style={{height:40,width:40,marginRight:10}}/>
                      {/* <View style={{height:10,width:10,backgroundColor:"black",position:"absolute",top:0,right:8,borderRadius:5}}></View> */}
                      </View>}
                      {image&&<TouchableOpacity  style={{ height: 40, width: 90, padding: 8, alignItems: "center", justifyContent: "center", backgroundColor: "#64BEFD" ,marginRight:5}}onPress={()=>handleReset()}
                    disabled={loading}
                    >
                      {loading?<ActivityIndicator color={"white"}/>:
                        <Text style={{ color: "white" }}>Reset</Text>
                      }
                    </TouchableOpacity>
}
                    <TouchableOpacity  style={{ height: 40, width: 90, padding: 8, alignItems: "center", justifyContent: "center", backgroundColor: "#64BEFD" }}onPress={()=>submitPost()}
                    disabled={loading}
                    >
                      {loading?<ActivityIndicator color={"white"}/>:
                        <Text style={{ color: "white" }}>Post</Text>
                      }
                    </TouchableOpacity>
                    </View>
                </View>

                {loading?
                <View>
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
        </View>:<View>
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
                    onDelete={handleDelete}
                    onPress={()=>navigation.navigate("HomeProfile",{userId:post.userId,userName:post.userName,userImg:post.userImg})}
                    
                    />
                ))}
                </View>
}
            </ScrollView>
        </SafeAreaView>
        </NativeBaseProvider>
    )
}

export default PostsScreen;
