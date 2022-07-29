import { View , StyleSheet, Dimensions} from 'react-native';
import { Colors } from '../constants/colors';
import { globalStyles } from '../styles/global';
import React from 'react';
import MapView from 'react-native-maps';

export default function Home() {
  return (
    <View style={globalStyles.screenContainer}>
     <View style={styles.card}>

     <MapView style={styles.map} />
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
