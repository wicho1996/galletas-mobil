import * as React from 'react';
import * as Location from 'expo-location';
import { View , StyleSheet, Dimensions, Text } from 'react-native';
import { Colors } from '../constants/colors';
import { globalStyles } from '../styles/global';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../screens/Splash';

export default function Home() {

  const { LongUbication, isLoading  } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  
  const carImage = require('../../assets/image/tienda4.png')
  const [origin, setOrigin] = React.useState({

    latitude:         0.0,
    longitude:        1.0,
    latitudeDelta:    0.1,
    longitudeDelta:   0.2,


  });


  React.useEffect(() => {
    getValue();
    getLocationPermission();
    setOrigin({ ...origin, latitude: LongUbication?.latitude || 0, longitude: LongUbication?.longitude || 0 });
    console.log('Latitud ='+ LongUbication?.latitude || '');
    console.log('Longitud ='+ LongUbication?.longitude || '');
  
  }, [])








  async function getValue() {
    try {


      const [value] = React.useState({

        valueLatitu : await AsyncStorage.getItem('@latistore'),
        valuelong : await AsyncStorage.getItem('@longstore')
    
    
      });
   
      if (value.valueLatitu !== null || value-longitude !== null) {
        console.log('data restored', value);

      
        //dispatch(restoreToken(value));
        return value;
      } else {
        console.log('no data');
        //dispatch(restoreToken(null));
      }
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
      latitudeDelta: Math.abs(Math.abs(origin.latitude)) + 20,
      longitudeDelta: Math.abs(Math.abs(origin.longitude)) + 20,
    }

    setOrigin(current);
  }


  if (isLoading) {
   
    return <Splash />;
  }

  return (
    <View style={globalStyles.screenContainer}>
     <View style={styles.card}>

     { origin.latitude != 0
        // ?<Text>Hola</Text>
        ? <MapView 
        style={styles.map}
            initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: origin.latitudeDelta/1.2,
            longitudeDelta: origin.longitudeDelta/1.2,

            
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
    </View>
    </View>



  );
}

//Estilo Card
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'snow',
    height: '100%',
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
