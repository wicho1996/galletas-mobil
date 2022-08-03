import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import MyButton from '../../components/MyButton';
import MyInput from '../../components/MyInput';
import { globalStyles } from '../../styles/global';
import { useDispatch } from 'react-redux';
import { setLat, setLon, SetUbication, signIn } from '../../features/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import Rutas from './LoginAx/rutas';

export default function Login({ navigation }) {


  
  useEffect(() => {
    getLocationPermission();
  }, []);

  const [origin, setOrigin] = useState({

    latitude:     20.5931,
    longitude:   100.392,
    latitudeDelta:    0.1,
    longitudeDelta:   0.2,


  });

//Variables para login
  const [userInfo, setUserInfo] = useState({
    usuario: '',
    password: '',
  });

  const { usuario, contraseña } = userInfo;

//Metodo para obtener  información 
  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };


  //ejemplo de lista de empleados
  const [empleados, setEmpleados] = useState([]);

  const rutas = Rutas();


  const getEmpleados = () => {
    rutas.getClientes(
      res => {
        setEmpleados(res.usuarios);
      }, { empleados: empleados, }
    );
  };

//const inciarSesion = () => {
//    rutas.inciarSesion(
//      res => {
//        console.log(res);
//      }, { usuario: 'wicho', contraseña: '869DB0DF3CD744C87C34C80B4DAB1CAB' }
//    );
//  };





  //Guardado Local
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

    //token Usuario
    async function save(value) {
      try {
        await AsyncStorage.setItem('@token', value);
        dispatch(signIn(value));
        console.log('data saved');
      } catch (error) {
        console.log(error);
      }
    }

 //Gurda localmente ubicación el usuario
 async function setLongitude(value) {
  try {
    await AsyncStorage.setItem('@longstore',''+value);
    dispatch(setLon(value));
    console.log('Longitud ='+ value);
  } catch (error) {
    console.log(error);
  }
}

async function setLatitude(value) {
  try {
    await AsyncStorage.setItem('@latistore',''+value);
    dispatch(setLat(value));
    console.log('Latitud ='+ value);
  } catch (error) {
    console.log(error);
  }
}


  //AxiosConexion
  const submitLogin = async () => {

    rutas.inciarSesion(
      res => {
        alert(res.mensaje);
      }, { usuario: userInfo.usuario, contraseña: userInfo.contraseña }
    );

    // try {
    //   // if (res.data.success) {
    //   //   setUserInfo({ user: '', password: '' });
      
    //   // }

    //   // console.log(res.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };


  async function getLocationPermission() {


    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: Math.abs(Math.abs(origin.latitude)) + 20,
      longitudeDelta: Math.abs(Math.abs(origin.longitude)) + 20,
    }

    setOrigin(current);
    setLongitude(current.longitude);
    setLatitude(current.latitude);
   
  
  }

  //Retorno de login.js
  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Login</Text>
      <MyInput 
      label="Usuario" 
      value={usuario}
      onChangeText={value => handleOnChangeText(value, 'usuario')}
      autoCapitalize='none'
      />
      <MyInput 
      label="Password" 
      secureTextEntry 
      value={contraseña}
      onChangeText={value => handleOnChangeText(value, 'contraseña')}
      placeholder='********'
      autoCapitalize='none'
      />
      <MyButton title="Login" onPress={() => save(usuario)} />
      <MyButton title="BD" onPress={submitLogin} />
      <MyButton title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}
