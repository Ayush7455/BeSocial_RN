import React, { createContext, useState } from 'react';
import {Alert} from "react-native"
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
  const [user, setUser] = useState(null);
  const [gLoading,setGLoading]=useState(false)
  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e.message)
    } 
  };

  const googleLogin = async () => {
    setGLoading(true);
    try {
  
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        await auth().signInWithCredential(googleCredential);
        setGLoading(false);

    }
    catch (e) {
        console.log(e);
        setGLoading(false)
    }
  };

  const register=async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore().collection('users').doc(auth().currentUser.uid)
        .set({
            fname: '',
            lname: '',
            email: email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: null,
        })
        .catch(error => {
            console.log('Something went wrong with added user to firestore: ', error);
        })
      })
      .catch(error => {
          console.log('Something went wrong with sign up: ', error);
      });
    } catch (e) {
      console.log(e);
    }
  }
  const reset = async (email) => {
    try {
      setLoading(true);
      await auth()
        . sendPasswordResetEmail(email).then(()=>{
            Alert.alert("Check your Email")
          })
          .catch((error)=>{
            Alert.alert("You are not an Admin")
          })
    } catch (e) {
      Alert.alert("Something went wrong",e.message)
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await auth().signOut();
      await GoogleSignin.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        googleLogin,
        register,
        logout,
        reset,
        gLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
