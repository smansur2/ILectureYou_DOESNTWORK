'use strict';
import React, { Component } from 'react';
import { StatusBar,Picker, SafeAreaView, KeyboardAvoidingView ,TextInput, AppRegistry, StyleSheet, Text, TouchableHighlight, View, Image, ImageBackground, ListView, Platform, Dimensions, TouchableOpacity} from 'react-native';
import SocketIOClient from 'socket.io-client';
import { RTCPeerConnection, RTCMediaStream, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStreamTrack, getUserMedia, } from 'react-native-webrtc';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { SocialIcon, Icon, Button, Input } from 'react-native-elements';
import InCallManager from 'react-native-incall-manager';

const socket = SocketIOClient.connect('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']}); 
const pcPeers = {};
const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

let container;
let localStream;

const logo = require('../../images/one.jpg')



export default class ClassList extends Component {
    
      constructor(props){
        super(props)
    
        //this.onPress = this.onPress.bind(this);
        this.state = {
          videoURL: null,
          isFront: true,
          info: 'Initializing',
          status: 'init',
          roomID: 'BIO281A',
          selfViewSrc: null,
          remoteList: {},
          textRoomConnected: false,
          textRoomData: [],
          textRoomValue: '',
          PickerValue: '',
        }
    
      }


      selectClass = () => {
        this.props.navigation.navigate('ClassStream',  
        { roomID: this.state.roomID, 
          remoteList: this.state.remoteList, 
          videoURL: this.state.videoURL, 
          isFront: this.state.isFront, 
          info: this.state.info, 
          selfViewSrc: this.state.selfViewSrc,
          status: this.state.status} );

      }
      
      //DECLARE EACH STATE TO PASS DATA THROUGH LATER
     
    
      componentDidMount() {
        
          container = this;
          //const {navigate} = this.props.navigation;
    
        }
    
       
        
        /*style={{height: 40, textAlign: 'center',}}
        ref='roomID'
        autoCorrect={false}
        placeholder={"Enter room"} placeholderTextColor={"#888"} 
        onChangeText={(text) => this.setState({roomID: text})}
        value={this.state.roomID}*/
    
        //onPress={this.onPress.bind(this)}
      //ACTUALLY SHOW THE VIDEO HERE AND DO STYLING
      render() {
        //const {navigate} = this.props.navigation;
        return (
           
           <ImageBackground source = {logo} style = {styles.background}>
            <StatusBar barStyle="light-content"/>
            
          
              <Text style={styles.titleText}>CHOOSE A CLASS</Text>
              <Picker
                  itemStyle={{color: '#F0FFFF'}}
                  style={{width:'80%'}}
                  selectedValue={this.state.roomID}
                  onValueChange={(itemValue, itemIndex) => this.setState({roomID : itemValue})}>
                  <Picker.Item label = "BIO 281A: Biology and Biotechnology" value = "BIO281A"/>
                  <Picker.Item label = "BIO 281B: Biology and Biotechnology" value = "BIO281B"/>
                  <Picker.Item label = "CH 116A: General Chemistry II" value = "CH116A"/>
                  <Picker.Item label = "CH 116B: General Chemistry II" value = "CH116B"/>
                  <Picker.Item label = "CH 116C: General Chemistry II" value = "CH116C"/>
                  <Picker.Item label = "CH 116D: General Chemistry II" value = "CH116D"/>
                  <Picker.Item label = "CH 116E: General Chemistry II" value = "CH116E"/>
                  <Picker.Item label = "CH 116F: General Chemistry II" value = "CH116F"/>
                  <Picker.Item label = "CH 116G: General Chemistry II" value = "CH116G"/>
                  <Picker.Item label = "MA 123A: Series, Vectors, Functions, and Surfaces" value = "MA123A"/>
                  <Picker.Item label = "MA 123B: Series, Vectors, Functions, and Surfaces" value = "MA123B"/>
                  <Picker.Item label = "MA 123C: Series, Vectors, Functions, and Surfaces" value = "MA123C"/>
                  <Picker.Item label = "MA 123D: Series, Vectors, Functions, and Surfaces" value = "MA123D"/>
                  <Picker.Item label = "MA 123E: Series, Vectors, Functions, and Surfaces" value = "MA123E"/>
                  <Picker.Item label = "MA 123F: Series, Vectors, Functions, and Surfaces" value = "MA123F"/>
                  <Picker.Item label = "MA 123G: Series, Vectors, Functions, and Surfaces" value = "MA123G"/>
                  <Picker.Item label = "MA 123H: Series, Vectors, Functions, and Surfaces" value = "MA123H"/>
                  <Picker.Item label = "MA 123I: Series, Vectors, Functions, and Surfaces" value = "MA123I"/>
                  <Picker.Item label = "PEP 111A: Mechanics" value = "PEP111A"/>
                  <Picker.Item label = "PEP 111B: Mechanics" value = "PEP111B"/>
                  <Picker.Item label = "PEP 111C: Mechanics" value = "PEP111C"/>
                  <Picker.Item label = "PEP 111D: Mechanics" value = "PEP111D"/>
                  <Picker.Item label = "PEP 111E: Mechanics" value = "PEP111E"/>
                  <Picker.Item label = "PEP 111S: Mechanics" value = "PEP111S"/>
              </Picker>
              <View style={{padding:40}}>
              <Button 
              outline 
              rounded 
              large 
              text="Join Class" 
              icon={
                <Icon
                name='tv'
                size={15}
                color='white'
                />
                } 
              onPress ={this.selectClass}
              />
              
              </View>
            
          </ImageBackground>
           
        );
    
      }
    
    
    
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',




  },
  button: {
    //backgroundColor:'#1496BB',
    //borderRadius:15,
    overflow: 'hidden',
    paddingHorizontal: 30,
    

  },

  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    

  },
  backgroundImage1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  selfView: {
    width: 200,
    height: 150,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  remoteView: {
    position: "absolute",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
   
    resizeMode: 'cover',

  },

  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: 'transparent',
    color: '#F0FFFF',
  }
});

