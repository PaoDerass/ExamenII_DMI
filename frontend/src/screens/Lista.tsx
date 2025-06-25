import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Button, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000/productos';

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: string;
  categoria: string;
  url_fotografia: string;
};

export default function ListaProductos({ navigation }: any) {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(API_URL);
      setProductos(response.data);
    } catch (error) {
      console.error('No se pueden obtener los productos:', error);
    }
  };

  const eliminarProducto = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      obtenerProductos();
      Alert.alert('Producto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      Alert.alert('No se pudo eliminar el producto');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Agregar Producto" onPress={() => navigation.navigate('AgregarProducto')} />

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.url_fotografia && (
              <Image source={{ uri: item.url_fotografia }} style={styles.imagen} />
            )}
            <View style={styles.info}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>Precio: ${item.precio}</Text>
              <Text>Estado: {item.estado}</Text>
              <TouchableOpacity style={styles.botonEliminar} onPress={() => eliminarProducto(item.id)}>
                <Text style={styles.textoBoton}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botonEliminar, { backgroundColor: 'blue', marginTop: 10 }]}
                onPress={() => navigation.navigate('DetalleProducto', { producto: item })}
              >
                <Text style={styles.textoBoton}>Ver Detalle</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  imagen: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonEliminar: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  textoBoton: {
    color: 'white',
  },
});
