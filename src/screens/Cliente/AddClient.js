import React from 'react';
import { useState, useEffect } from 'react';
import {Text, View } from 'react-native';
import MyButton from '../../components/MyButton';
import MyInput from '../../components/MyInput';
import { globalStyles } from '../../styles/global';
import Mapa from '../../components/MapClient';


export default function AddClient({ navigation }) {


  //Variables para login
const [tiendainfo, setTiendaInfo] = useState({
  nombretienda: '',
  password: '',
});

const { nombretienda, password } = tiendainfo;

//Metodo para obtener  información 
const handleOnChangeText = (value, fieldName) => {
  setTiendaInfo({ ...tiendainfo, [fieldName]: value });
}


//Retorno de login.js
  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Nombre de la tienda</Text>
      <MyInput 
      label="Nombre de tienda" 
      value={nombretienda}
      onChangeText={value => handleOnChangeText(value, 'nombretienda')}
      autoCapitalize='none'
      />
      <Mapa/>
       <MyButton title="Registrar" onPress={() => submitLogin } />
    </View>
  );
}



