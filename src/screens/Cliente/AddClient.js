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
  
  const lati = await AsyncStorage.getItem('@latistore');
  const long = await AsyncStorage.getItem('@longstore');
  const latim = await AsyncStorage.getItem('@latistoremove');
  const longm = await AsyncStorage.getItem('@longstoremove');


  if(lati !== latim || long !== longm ){

    console.log("Nombre tienda "+ tiendainfo.nombretienda);
    console.log("tienda lati "+ latim);
    console.log("tienda long "+ longm );

    rutas.newClient(
      res => {
      
          console.log(res.mensaje);
          alert(res.mensaje);
   
      }, {tipot: 1 ,tienda: tiendainfo.nombretienda , status: 1,lat: latim, long: longm }
    );

  }else{

    
  
    console.log("Nombre tienda "+ tiendainfo.nombretienda);
    console.log("tienda lati "+ lati);
    console.log("tienda long "+ long );

    rutas.newClient(
      res => {
      
          console.log(res.mensaje);
          alert(res.mensaje);
   
      }, {tipot: 1 ,tienda: tiendainfo.nombretienda , status: 1,lat: lati, long: long }
    );
    

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




