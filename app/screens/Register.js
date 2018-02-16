import React, { Component } from 'react';
import {  StatusBar, SafeAreaView, KeyboardAvoidingView ,AppRegistry, Picker, StyleSheet, Text, TouchableHighlight, View, Image, ImageBackground, ListView, Platform, Dimensions, TouchableOpacity} from 'react-native';
import { RTCPeerConnection, RTCMediaStream, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStreamTrack, getUserMedia, } from 'react-native-webrtc';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { SocialIcon, Icon, Button, Input} from 'react-native-elements';
import {firebase} from '../../services/firebase';


const logo = require('../../images/one.jpg')

export default class Register extends Component { 
    constructor(props) {
      super(props)
      this.state = {
        email: '',
        password:'',
        password2: ''
      }
    }
    

    

    register = () => {
     
     try {
         if (this.state.email === "") {
             throw new Error("Please provide an email address.");
         }
         if (this.state.password === "") {
             throw new Error("Please provide a password.");
         }

         if (this.state.password !== this.state.password2) {
             throw new Error("Passwords do not match");
         }

         else if (this.state.password === this.state.password2){
             firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
             this.props.navigation.navigate('ClassList');
         }
         
     } 
     

     catch(e) {
         alert(e);
     }
   }

   back = () => {
       this.props.navigation.goBack();
   }


      resetNavigation(targetRoute) {
       const resetAction = NavigationActions.reset({
         index: 0,
         actions: [
           NavigationActions.navigate({ routeName: targetRoute }),
         ],
       });
       this.props.navigation.dispatch(resetAction);
     }
   
      render() {
       
       const {navigate} = this.props.navigation;
       return(
           <ImageBackground style = {loginstyles.container} source = {logo}>
            <StatusBar barStyle="light-content"/>

               <View style = {loginstyles.buttonContainer} keyboardVerticalOffset = {10}>
                   <Text style = {loginstyles.miniHeader}>
                     GET STARTED

                   </Text>

                   <Text style = {loginstyles.header}>
                     Register

                   </Text>
                   
                   <Input
                   containerStyle={loginstyles.input}
                   keyboardType="email-address"
                   autoCorrect = {false}
                   placeholder='Email'
                   placeholderTextColor = '#FFF'
                   onChangeText={(text) => this.setState({email: text})} 
                   value = {this.state.email}
                   color = '#FFF'
                   />

                   <Input
                   containerStyle = {loginstyles.input}
                   secureTextEntry = {true}
                   placeholder='Password'
                   placeholderTextColor = '#FFF'
                   onChangeText={(text) => this.setState({password: text})} 
                   value = {this.state.password}
                   color = '#FFF'
                   />

                   <Input
                   containerStyle = {loginstyles.input}
                   secureTextEntry = {true}
                   placeholder='Confirm Password'
                   placeholderTextColor = '#FFF'
                   onChangeText={(text) => this.setState({password2: text})} 
                   value = {this.state.password2}
                   color = '#FFF'
                   />


                   <Button 
                   text = 'Register'
                   raised
                   backgroundColor = '#FFF'
                   small
                   textStyle = {{fontWeight: 'bold'}}
                   onPress = {this.register}
                   buttonStyle={loginstyles.loginButton} /> 

                   <Button 
                   text = 'Back'
                   clear
                   //backgroundColor = '#3BA9FF'
                   small
                   textStyle = {{fontWeight: 'bold', color: '#909497', fontSize: 15}}
                   onPress = {this.back} />

               </View>
               


           </ImageBackground>
       );
   }
}

const loginstyles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#FFFFFF',  
   },
   
   loginContainer: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center'
   },
   
   loginButton: {
     backgroundColor: "#3BA9FF",
     width: 300,
     height: 45,
     borderColor: "transparent",
     borderWidth: 0,

   }, 
  
   buttonContainer: {
     alignItems: 'center',
     flexDirection: 'column',
     top: 40
   },

   input: {
     borderWidth: 1,
     width: 300,
     borderColor: '#F2F3F4',
     margin: 10,
     height: 50,
     paddingLeft: 10,
     
   },

   color: {
     color: 'white'
   },

   miniHeader: {
     fontWeight: '900', 
     color: '#909497', 
     fontSize: 15,
     justifyContent: 'flex-start',
     marginRight: 195,
     marginTop: 15,
     paddingBottom: 5,
     

   },

   header: {
     fontWeight: '900', 
     color: '#FFF', 
     fontSize: 40,
     marginRight: 130,
     paddingBottom: 10,

   }
 });
