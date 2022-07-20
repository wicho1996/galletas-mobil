import { useState } from 'react';
import { Text, View } from 'react-native';
import MyButton from '../../components/MyButton';
import MyInput from '../../components/MyInput';
import { globalStyles } from '../../styles/global';
import { useDispatch } from 'react-redux';
import { signIn } from '../../features/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {



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
      <MyInput label="Password"   secureTextEntry />
       <MyButton title="Login" onPress={() => save(token)} />
       <MyButton title="BD" onPress={() => submitLogin } />
      <MyButton title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}
