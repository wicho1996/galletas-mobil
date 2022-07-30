import * as React from 'react';
import {
  Button,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { Colors } from '../constants/colors';
import MyInput from './MyInput';
import { getRandomPhoto } from '../utils/randomPhoto';
import { FontAwesome } from '@expo/vector-icons';
import { contactsStore } from '../reducers/contactReducer';
import { globalStyles } from '../styles/global';


