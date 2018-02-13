'use strict';
import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import Login from '../screens/Login'
import ClassStream from '../screens/ClassStream';
import ClassList from '../screens/ClassList';

export const DefaultNav = StackNavigator({
  Login: {
      screen: Login,
      navigationOptions: {
          title: 'Sign Up',
          gesturesEnabled: false,
          header: null
          
      }
  },
  ClassList: {
      screen: ClassList,
      navigationOptions: {
          title: 'Class Selection',
          gesturesEnabled: false,
          header: null,
          gesturesEnabled: false
      }
  },
  ClassStream: {
    screen: ClassStream,
    navigationOptions: {
      title: 'Class Stream'
    }
  },
});