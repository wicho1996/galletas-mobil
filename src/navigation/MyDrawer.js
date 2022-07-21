import { createDrawerNavigator } from '@react-navigation/drawer';
import Notifications from '../screens/Notifications';
import Home from '../screens/Home';
import Cliente from '../screens/Cliente/AddClient';
import Venta from '../screens/Venta/AddVenta';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Inicio" component={Home} />
      <Drawer.Screen name="Nuevo Cliente" component={Cliente} />
      <Drawer.Screen name="Nueva Venta" component={Venta} />
    </Drawer.Navigator>
  );
}
