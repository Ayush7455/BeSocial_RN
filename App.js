import React, { useState, useEffect,useContext} from 'react';
import { LogBox} from 'react-native';
LogBox.ignoreAllLogs()
import Providers from "./navigation"
export default function App() {   
  return <Providers />;
}