import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import MyButton from '../../components/MyButton';
import MyInput from '../../components/MyInput';
import { globalStyles } from '../../styles/global';
import { useDispatch } from 'react-redux';
import { signIn } from '../../features/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Rutas from './LoginAx/rutas';

export default function Login({ navigation }) {
  const [empleados, setEmpleados] = useState([]);

  const rutas = Rutas();

  useEffect(() => {
    inciarSesion();
  }, []);

  const getEmpleados = () => {
    rutas.getClientes(
      res => {
        setEmpleados(res.usuarios);
      }, { empleados: empleados, }
    );
  };

  const inciarSesion = () => {
    rutas.inciarSesion(
      res => {
        console.log(res);
      }, { usuario: 'wicho', contraseña: '869DB0DF3CD744C87C34C80B4DAB1CAB' }
    );
  };

  //Guardado Local
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

  //AxiosConexion
  const submitLogin = async () => {
    try {
      const res = await client.post('Login/validarUsuario', { ...userInfo });

      if (res.data.success) {
        setUserInfo({ user: '', password: '' });
        setProfile(res.data.user);
        setIsLoggedIn(true);
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  //Retorno de login.js
  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Login</Text>
      <MyInput onChangeText={setToken} value={token} label="Usuario" />
      <MyInput label="Password" secureTextEntry />
      <MyButton title="Login" onPress={() => save(token)} />
      <MyButton title="BD" onPress={() => submitLogin} />
      <MyButton title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}
