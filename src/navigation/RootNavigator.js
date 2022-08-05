import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MyDrawer from './MyDrawer';
import { useSelector, useDispatch } from 'react-redux';
import { restoreToken } from '../features/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../screens/Splash';;
import * as Location from 'expo-location';

export default function RootNavigator() {

  const [origin, setOrigin] = React.useState({

    latitude:         0.0,
    longitude:        1.0

  });


  const { userToken, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getValue();
    setInterval(getLocationPermission, 9000);
  

  }, []);


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
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
  
    }

 
    setOrigin(current);
    console.log("Latitud tiempo real " + current.latitude);
    console.log("Longitud tiempo real " + current.longitude);

  }


  async function getValue() {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        console.log('data restored', value);
        dispatch(restoreToken(value));
        return value;
      } else {
        console.log('no data');
        dispatch(restoreToken(null));
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      {userToken ? <MyDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
}
