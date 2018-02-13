import React, { Component } from 'react';
import { SafeAreaView, KeyboardAvoidingView ,TextInput,AppRegistry, Picker, StyleSheet, Text, TouchableHighlight, View, Image, ImageBackground, ListView, Platform, Dimensions, TouchableOpacity} from 'react-native';
import { RTCPeerConnection, RTCMediaStream, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStreamTrack, getUserMedia, } from 'react-native-webrtc';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { SocialIcon, Icon, Button, Input } from 'react-native-elements';
import {firebase} from '../../services/firebase';


const logo = require('../../images/one.jpg')

export default class Login extends Component { 
    constructor(props) {
      super(props)
      this.state = {
        email: '',
        password:''
      }
    }
    

    static navigationOptions = {
      title: 'FacebookLogin'
    }

    login = () => {
     
     try {
         if (this.state.email === "") {
             throw new Error("Please provide an email address.");
         }
         if (this.state.password === "") {
             throw new Error("Please provide a password.");
         }
         else if (firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)) {
           //alert('successful login')
           this.props.navigation.navigate('ClassList')     
         }
     } 

     catch(e) {
         alert(e);
     }
   }

   
     /* _fbAuth() {
         LoginManager.logInWithReadPermissions(['public_profile']).then(
            function(result) {
               if (result.isCancelled) {
                  alert('Login cancelled');
               } //else {
                  //alert('Login success with permissions: '
                  //+result.grantedPermissions.toString());
                  //props.navigation.navigate('secondScreen')
                  //navigate('secondScreen');

                  

               //}
            },
            function(error) {
               alert('Login fail with error: ' + error);
            },

         );
      }*/
      resetNavigation(targetRoute) {
       const resetAction = NavigationActions.reset({
         index: 0,
         actions: [
           NavigationActions.navigate({ routeName: targetRoute }),
         ],
       });
       this.props.navigation.dispatch(resetAction);
     }
      //onPress={() => this.props.navigation.navigate('secondScreen')}
      //{() => navigate('secondScreen')}
   
      render() {
       
       const {navigate} = this.props.navigation;
       return(
           <ImageBackground style = {loginstyles.container} source = {logo}>
               <View style = {loginstyles.buttonContainer} keyboardVerticalOffset = {10}>
                   <Text style = {loginstyles.miniHeader}>
                     GET STARTED

                   </Text>

                   <Text style = {loginstyles.header}>
                     Login

                   </Text>
                   
                   <Input
                   containerStyle={loginstyles.input}
                   keyboardType="email-address"
                   autoCorrect = {false}
                   placeholder='Email'
                   placeholderTextColor = '#FFF'
                   onChangeText={(text) => this.setState({email: text})} 
                   value = {this.state.email}
                   textColor = '#FFF'
                   />

                   <Input
                   containerStyle = {loginstyles.input}
                   secureTextEntry = {true}
                   placeholder='Password'
                   placeholderTextColor = '#FFF'
                   onChangeText={(text) => this.setState({password: text})} 
                   value = {this.state.password}
                   />

                   <Button 
                   text = 'Login'
                   raised
                   backgroundColor = '#FFF'
                   small
                   textStyle = {{fontWeight: 'bold'}}
                   onPress = {this.login}
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
     //justifyContent: 'space-between'
   },
   
   loginButton: {
     //justifyContent: 'flex-start',
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
     marginRight: 195,
     paddingBottom: 10,

   }
 });
