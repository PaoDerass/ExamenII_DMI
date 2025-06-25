import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const API_URL = 'http://192.168.1.195:5000/productos';

export default function AgregarProducto({ navigation }: any) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState('disponible');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('');

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso necesario', 'Necesitamos acceso a tu galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setImagen(result.assets[0].uri);
  };

  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso necesario', 'Necesitamos acceso a tu cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setImagen(result.assets[0].uri);
  };

  const guardarProducto = async () => {
    if (!nombre || !precio) {
      Alert.alert('Error', 'Nombre y precio son obligatorios');
      return;
    }

    try {
      const nuevoProducto = {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        estado,
        categoria,
        url_fotografia: imagen
      };
      await axios.post(API_URL, nuevoProducto);
      navigation.goBack();
      Alert.alert('Éxito', 'Producto agregado correctamente');
    } catch (error) {
      console.error('Error al guardar producto:', error);
      Alert.alert('Error', 'No se pudo guardar el producto');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} multiline />
      <TextInput style={styles.input} placeholder="Precio" value={precio} onChangeText={setPrecio} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Categoría" value={categoria} onChangeText={setCategoria} />

      <View style={styles.botonesImagen}>
        <Button title="Seleccionar imagen" onPress={seleccionarImagen} />
        <Button title="Tomar foto" onPress={tomarFoto} />
      </View>

      {imagen && <Image source={{ uri: imagen }} style={styles.imagenPreview} />}
      <Button title="Guardar Producto" onPress={guardarProducto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#fff',
  },
  input: {
    height: 40, borderColor: 'gray', borderWidth: 1,
    marginBottom: 10, paddingHorizontal: 10, borderRadius: 5,
  },
  botonesImagen: {
    flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10,
  },
  imagenPreview: {
    width: 200, height: 200, borderRadius: 5,
    alignSelf: 'center', marginVertical: 10,
  },
});
