'use strict';
import React, { Component } from 'react';
import { SafeAreaView, KeyboardAvoidingView ,TextInput  ,AppRegistry, Picker, StyleSheet, Text, TouchableHighlight, View, Image, ImageBackground, ListView, Platform, Dimensions, TouchableOpacity} from 'react-native';
import SocketIOClient from 'socket.io-client';
import { RTCPeerConnection, RTCMediaStream, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStreamTrack, getUserMedia, } from 'react-native-webrtc';
import FBSDK, { LoginManager, LoginButton } from 'react-native-fbsdk';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { SocialIcon, Icon, Button, Input } from 'react-native-elements';
import InCallManager from 'react-native-incall-manager';
import {firebase} from './services/firebase';
import Login from './app/screens/Login';
import ClassStream from './app/screens/ClassStream';
import ClassList from './app/screens/ClassList';

export const DefaultNav = StackNavigator({
  Login: {
      screen: Login,
      navigationOptions: {
          title: 'Sign Up',
          gesturesEnabled: false,
          
      }
  },
  ClassList: {
      screen: ClassList,
      navigationOptions: {
          title: 'Class Selection',
          gesturesEnabled: false,
      }
  },
  ClassStream: {
    screen: ClassStream,
    navigationOptions: {
      title: 'Class Stream'
    }
  },
});

/*---------------------------------------------------------------------------------------
        EXPORT APP CLASS ONLY SO NAVIGATOR CAN USE SCREEN PROPERTIES AS PROPS 
  ---------------------------------------------------------------------------------------*/
export default class App extends Component {
  
  render() {
    
    return <DefaultNav />;
  }
}


/*            <Picker.item label = "CAL 103A: Writing And Communications Colloquium" value = "CAL103A"/>
              <Picker.item label = "CAL 103B: Writing And Communications Colloquium" value = "CAL103B"/>
              <Picker.item label = "CAL 105A: Knowledge, Nature, Culture" value = "CAL105A"/>
              <Picker.item label = "CAL 105A1: Knowledge, Nature, Culture" value = "CAL105A1"/>
              <Picker.item label = "CAL 105A2: Knowledge, Nature, Culture" value = "CAL105A2"/>
              <Picker.item label = "CAL 105A3: Knowledge, Nature, Culture" value = "CAL105A3"/>
              <Picker.item label = "CAL 105A4: Knowledge, Nature, Culture" value = "CAL105A4"/>
              <Picker.item label = "CAL 105A5: Knowledge, Nature, Culture" value = "CAL105A5"/>
              <Picker.item label = "CAL 105A6: Knowledge, Nature, Culture" value = "CAL105A6"/>
              <Picker.item label = "CAL 105A7: Knowledge, Nature, Culture" value = "CAL105A7"/>
              <Picker.item label = "CAL 105A8: Knowledge, Nature, Culture" value = "CAL105A8"/>
              <Picker.item label = "CAL 105B: Knowledge, Nature, Culture" value = "CAL105B"/>
              <Picker.item label = "CAL 105C: Knowledge, Nature, Culture" value = "CAL105C"/>
              <Picker.item label = "CAL 105D: Knowledge, Nature, Culture" value = "CAL105D"/>
              <Picker.item label = "CAL 105E: Knowledge, Nature, Culture" value = "CAL105E"/>
              <Picker.item label = "CAL 105F: Knowledge, Nature, Culture" value = "CAL105F"/>
              <Picker.item label = "CAL 105G: Knowledge, Nature, Culture" value = "CAL105G"/>
              <Picker.item label = "CAL 105H: Knowledge, Nature, Culture" value = "CAL105H"/>
              <Picker.item label = "CAL 105I: Knowledge, Nature, Culture" value = "CAL105I"/>
              <Picker.item label = "CAL 105J: Knowledge, Nature, Culture" value = "CAL105J"/>
              <Picker.item label = "CAL 105K: Knowledge, Nature, Culture" value = "CAL105K"/>
              <Picker.item label = "CAL 105L: Knowledge, Nature, Culture" value = "CAL105L"/>
              <Picker.item label = "CAL 105M: Knowledge, Nature, Culture" value = "CAL105M"/>
              <Picker.item label = "CAL 105N: Knowledge, Nature, Culture" value = "CAL105N"/>
              <Picker.item label = "CAL 105O: Knowledge, Nature, Culture" value = "CAL105O"/>
              <Picker.item label = "CAL 105P: Knowledge, Nature, Culture" value = "CAL105P"/>
              <Picker.item label = "CAL 105Q: Knowledge, Nature, Culture" value = "CAL105Q"/>
              <Picker.item label = "CAL 105R: Knowledge, Nature, Culture" value = "CAL105R"/>
              <Picker.item label = "CAL 105S: Knowledge, Nature, Culture" value = "CAL105S"/>
              <Picker.item label = "CAL 105T: Knowledge, Nature, Culture" value = "CAL105T"/>
              <Picker.item label = "CAL 105U: Knowledge, Nature, Culture" value = "CAL105U"/>
              <Picker.item label = "CAL 105V: Knowledge, Nature, Culture" value = "CAL105V"/>
              <Picker.item label = "CAL 105W: Knowledge, Nature, Culture" value = "CAL105W"/>
              <Picker.item label = "CAL 105X: Knowledge, Nature, Culture" value = "CAL105X"/>
              <Picker.item label = "CAL 105Y: Knowledge, Nature, Culture" value = "CAL105Y"/>
              <Picker.item label = "CAL 105Z: Knowledge, Nature, Culture" value = "CAL105Z"/>
              
              <Picker.item label = "E 122E: Engineering Design II" value = "E122E"/>
              <Picker.item label = "E 122F: Engineering Design II" value = "E122F"/>
              <Picker.item label = "E 122G: Engineering Design II" value = "E122G"/>
              <Picker.item label = "E 122I: Engineering Design II" value = "E122I"/>
              <Picker.item label = "E 122K: Engineering Design II" value = "E122K"/>
              <Picker.item label = "E 122M: Engineering Design II" value = "E122M"/>
              <Picker.item label = "E 122N: Engineering Design II" value = "E122N"/>
              <Picker.item label = "E 122O: Engineering Design II" value = "E122O"/>
              <Picker.item label = "E 122R: Engineering Design II" value = "E122R"/>
              <Picker.item label = "E 122S: Engineering Design II" value = "E122S"/>
              <Picker.item label = "E 122V: Engineering Design II" value = "E122V"/>
              <Picker.item label = "E 122W: Engineering Design II" value = "E122W"/>
              
              <Picker.item label = "MGT 103A: Intro to Entrepreneurial Thinking" value = "MGT103A"/>
              <Picker.item label = "MGT 103B: Intro to Entrepreneurial Thinking" value = "MGT103B"/>
              <Picker.item label = "MGT 103C: Intro to Entrepreneurial Thinking" value = "MGT103C"/>
              <Picker.item label = "MGT 103D: Intro to Entrepreneurial Thinking" value = "MGT103D"/>
              <Picker.item label = "MGT 103E: Intro to Entrepreneurial Thinking" value = "MGT103E"/>
              <Picker.item label = "MGT 103F: Intro to Entrepreneurial Thinking" value = "MGT103F"/>
              <Picker.item label = "MGT 103G: Intro to Entrepreneurial Thinking" value = "MGT103G"/>
              <Picker.item label = "MGT 103H: Intro to Entrepreneurial Thinking" value = "MGT103H"/>
              <Picker.item label = "MGT 103I: Intro to Entrepreneurial Thinking" value = "MGT103I"/>
              <Picker.item label = "MGT 103J: Intro to Entrepreneurial Thinking" value = "MGT103J"/>
              <Picker.item label = "MGT 103K: Intro to Entrepreneurial Thinking" value = "MGT103K"/>
              <Picker.item label = "MGT 103L: Intro to Entrepreneurial Thinking" value = "MGT103L"/>
              <Picker.item label = "MGT 103M: Intro to Entrepreneurial Thinking" value = "MGT103M"/>
              <Picker.item label = "MGT 103N: Intro to Entrepreneurial Thinking" value = "MGT103N"/>
              <Picker.item label = "MGT 103O: Intro to Entrepreneurial Thinking" value = "MGT103O"/>
              <Picker.item label = "MGT 103P: Intro to Entrepreneurial Thinking" value = "MGT103P"/>
              <Picker.item label = "MGT 103Q: Intro to Entrepreneurial Thinking" value = "MGT103Q"/>
              <Picker.item label = "MGT 103R: Intro to Entrepreneurial Thinking" value = "MGT103R"/>*/