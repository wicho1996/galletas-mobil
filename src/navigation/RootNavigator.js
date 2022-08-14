import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MyDrawer from './MyDrawer';
import { useSelector, useDispatch } from 'react-redux';
import { restoreToken } from '../features/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../screens/Splash';;
import * as Location from 'expo-location';
import Rutas from './RootAx/rutas';
import { setLat, setLon } from '../features/auth/auth';


export default function RootNavigator() {

  const rutas = Rutas();

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



  const updateBD = async (id,latitud,longitud) => {

    rutas.actualizarGPS(
      res => {
        
      }, { latitud, longitud, id }
    );
  };



  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

    const current = {
      latitude: location.coords.latitude.toPrecision(20),
      longitude: location.coords.longitude.toPrecision(20),
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
  
    }

 
    setOrigin(current);
    setLatitude(current.latitude);
    setLongitude(current.longitude);

    const valuetiemporeal = await AsyncStorage.getItem('@token');
    const valueid = await AsyncStorage.getItem('@id');
   
    if (valuetiemporeal!==null){

      console.log(""+valueid);
      updateBD(valueid,current.latitude,current.longitude);
   
    }
   
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
  async function setLongitude(value) {
    try {
      await AsyncStorage.setItem('@longstore',''+value);
      dispatch(setLon(value));
    } catch (error) {
      console.log(error);
    }
  }
  
  async function setLatitude(value) {
    try {
      await AsyncStorage.setItem('@latistore',''+value);
      dispatch(setLat(value));
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
