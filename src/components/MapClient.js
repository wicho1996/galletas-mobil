import * as React from 'react';
import * as Location from 'expo-location';
import { View , StyleSheet, Dimensions, Text } from 'react-native';
import { Colors } from '../constants/colors';
import { globalStyles } from '../styles/global';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../screens/Splash';
import { restoreGPS, deleteGPS} from '../features/auth/auth';
import { ActivityIndicator} from 'react-native';
import { setLat, setLon, } from '../features/auth/auth';

export default function Home() {

   const dispatch = useDispatch();
  const carImage = require('../../assets/image/tienda4.png')
  const [origin, setOrigin] = React.useState({

    latitude:         0.0,
    longitude:        1.0

  });


  React.useEffect(() => {
    getLocationPermission();
  
  }, [])

 //Gurda localmente ubicación el usuario
 async function setLongitude(value) {
  try {
    await AsyncStorage.setItem('@longstore',''+value);
    dispatch(setLon(value));
    console.log('Longitud local ='+ value);
  } catch (error) {
    console.log(error);
  }
}

async function setLatitude(value) {
  try {
    await AsyncStorage.setItem('@latistore',''+value);
    dispatch(setLat(value));
    console.log('Latitud local='+ value);
  } catch (error) {
    console.log(error);
  }
}


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
    setLatitude(current.latitude);
    setLongitude(current.longitude);
    
  }

  return (

    <View style={globalStyles.screenContainer}>
     <View style={styles.card}>


     { origin.latitude != 0
        
      ? <MapView 
        style={styles.map}
            initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,

            
            }}
      
      >
      <Marker 
            draggable
            coordinate={origin}
            image={carImage}
            onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
          />

      </MapView> 


: null
}

      <Text style={globalStyles.title}>             Cargando...                        </Text>
      <ActivityIndicator size="large" />
    </View>
    
    </View>
    


  );
}

//Estilo Card
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'snow',
    height: '100%',
    width: '100%',
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
  map: {


    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
