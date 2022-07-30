import * as React from 'react';
import * as Location from 'expo-location';
import { View , StyleSheet, Dimensions} from 'react-native';
import { Colors } from '../constants/colors';
import { globalStyles } from '../styles/global';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function Home() {

  const carImage = require('../../assets/image/tienda4.png')

  
  const [origin, setOrigin] = React.useState({
    latitude:   0.0,
    longitude:  0.0,
  });

  React.useEffect(() => {
    getLocationPermission();
  }, [])

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current);
  }



  return (
    <View style={globalStyles.screenContainer}>
     <View style={styles.card}>

     <MapView 
      style={styles.map}
      initialRegion={{
      latitude: origin.latitude,
      longitude: origin.longitude,
      latitudeDelta: 20.620392,
      longitudeDelta: -100.421120


    }}
    >
     <Marker 
          draggable
          coordinate={origin}
          image={carImage}
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
        />

    </MapView>
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
