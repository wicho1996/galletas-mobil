import { useState } from 'react';
import { StyleSheet,Text, View } from 'react-native';
import MyButton from '../../components/MyButton';
import MyInput from '../../components/MyInput';
import { globalStyles } from '../../styles/global';
import { useDispatch } from 'react-redux';
import { signIn } from '../../features/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import Mapa from '../../components/MapClient';


export default function AddClient({ navigation }) {


//Retorno de login.js
  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Nombre de la tienda</Text>
      <MyInput  label="Nombre de tienda" />
      <Mapa/>
       <MyButton title="Registrar" onPress={() => submitLogin } />
    </View>
  );
}



