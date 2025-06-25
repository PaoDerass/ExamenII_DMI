import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListaProductos from './src/screens/Lista';
import AgregarProducto from './src/screens/Agregar';
import DetalleProducto from './src/screens/Detalle';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaProductos">
        <Stack.Screen name="ListaProductos" component={ListaProductos} options={{ title: 'Productos' }} />
        <Stack.Screen name="AgregarProducto" component={AgregarProducto} options={{ title: 'Agregar Producto' }} />
        <Stack.Screen name="DetalleProducto" component={DetalleProducto} options={{ title: 'Detalle Producto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
