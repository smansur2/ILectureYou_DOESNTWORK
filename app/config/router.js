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
          header: null
          
      }
  },
  ClassList: {
      screen: ClassList,
      navigationOptions: {
          title: 'Class Selection',
          
          header: null,

      }
  },
  ClassStream: {
    screen: ClassStream,
    navigationOptions: {
      title: 'Class Stream'
    }
  },
});