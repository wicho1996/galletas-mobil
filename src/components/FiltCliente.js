import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/colors';
import MyInput from './MyInput';


 export default function AddContact({ onAddContact }) {
 const [name, setName] = React.useState('');

  function handleAdd() {
    setName('');
    onAddContact(name);
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '80%' }}>
        <MyInput label={'Nombre de la tienda'} value={name} onChangeText={setName} />
      </View>
      <Button title="Buscar" color={Colors.primary} onPress={handleAdd} />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: '5%',
    alignItems: 'center',
  },
});
