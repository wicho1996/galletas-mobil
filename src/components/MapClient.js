import * as React from 'react';
import { View , StyleSheet, Dimensions, Text } from 'react-native';
import { Colors } from '../constants/colors';
import { globalStyles } from '../styles/global';
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator} from 'react-native';
import {  setLonmove, setLatmove } from '../features/auth/auth';

export default function Home() {

  const carImage = require('../../assets/image/tienda4.png')
  const dispatch = useDispatch();
  const [origin, setOrigin] = React.useState({

    latitude:         0.0,
    longitude:        1.0

  });
 


  React.useEffect(() => {

   
    getLocationPermission();



  }, [])




  async function getLocationPermission() {


   const lati = await AsyncStorage.getItem('@latistore');
   const long = await AsyncStorage.getItem('@longstore')
   
    const current = {
      latitude: parseFloat(lati),
      longitude:parseFloat(long),
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
  
    }

 
    setOrigin(current);
  
  
    
  }

  async function Markerefesh() {

 
    const current = {
      latitude: 0.0,
      longitude:0.0,
    }

 
    setOrigin(current);

  }


  async function updateMarker(markerpsition) {


    const lati = await AsyncStorage.getItem('@latistore');
    const long = await AsyncStorage.getItem('@longstore')


    setLatitude(markerpsition.latitude);
    setLongitude(markerpsition.longitude);

    const interval = setInterval(() => {
      getLocationPermission();
      Markerefesh();
      setLatitude(lati);
      setLongitude(long);
      clearInterval(interval);
    }, 11000);
  }

  async function setLongitude(value) {
    try {
      await AsyncStorage.setItem('@longstoremove',''+value);
      dispatch(setLonmove(value));
    
    } catch (error) {
      console.log(error);
    }
  }
  
  async function setLatitude(value) {
    try {
      await AsyncStorage.setItem('@latistoremove',''+value);
      dispatch(setLatmove(value));
     
    } catch (error) {
      console.log(error);
    }
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
            onDragEnd={(direction) => updateMarker(direction.nativeEvent.coordinate)}
    
          
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
