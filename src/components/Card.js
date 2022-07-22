import { View, Text, StyleSheet, Image , Button } from 'react-native';
import { Colors } from '../constants/colors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signOut } from '../features/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from './MyButton';

export default function Card() {

  const dispatch = useDispatch();

  const { userToken } = useSelector(state => state.auth);

  function doSomething() {
    console.log('1');
    console.log('2');
  }

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={require('../../assets/memojis/11.png')}
          style={styles.img}
        />
        <Text style={styles.name}>¡Bienvenido!</Text>
        <Text style={styles.name}>{userToken}</Text>
      </View>
      <MyButton  
        title="Cerrar sesión"
        onPress={async () => {
          await AsyncStorage.removeItem('@token');
          dispatch(signOut());
        }}
      />
    </View>
  );
}


//Estilo Card
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'snow',
    width: '85%',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.primary,
  },
  img: {
    width: 100,
    height: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
