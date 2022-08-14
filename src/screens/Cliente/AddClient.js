import React from 'react';
import { useState, useEffect } from 'react';
import {Text, View } from 'react-native';
import MyButton from '../../components/MyButton';
import MyInput from '../../components/MyInput';
import { globalStyles } from '../../styles/global';
import Mapa from '../../components/MapClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Rutas from './AddClAx/rutas';

export default function AddClient({ navigation }) {

 
  const rutas = Rutas();

  //Variables para login
const [tiendainfo, setTiendaInfo] = useState({
  nombretienda: ''
});

const { nombretienda, password } = tiendainfo;

//Metodo para obtener  información 
const handleOnChangeText = (value, fieldName) => {
  setTiendaInfo({ ...tiendainfo, [fieldName]: value });
}



//AxiosConexion
const registrarTienda = async () => {

if(tiendainfo.nombretienda !== ""){
  
  const lati = await AsyncStorage.getItem('@latistore');
  const long = await AsyncStorage.getItem('@longstore');
  const latim = await AsyncStorage.getItem('@latistoremove');
  const longm = await AsyncStorage.getItem('@longstoremove');


  if(latim !== null || longm !== null ){

    rutas.newClient(
      res => {
      
    

        setTiendaInfo("");
        navigation.goBack();
        alert("se registro correctamente");
   
      }, {tipot: 1 ,tienda: tiendainfo.nombretienda , status: 1,lat: latim, long: longm}
    );

  }else{

  
    rutas.newClient(
      res => {
      
         
          setTiendaInfo("");
          navigation.goBack();
          alert("se registro correctamente");
      
          navigation.openDrawer();
      }, {tipot: 1 ,tienda: tiendainfo.nombretienda , status: 1,lat: lati, long: long }
    );
    

  }
}else{

  alert("Agregar nombre del la tienda");
}

};



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
       <MyButton title="Registrar" onPress={registrarTienda} />
    </View>
  );
}




