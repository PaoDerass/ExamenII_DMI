import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DetalleProducto({ route }: any) {
  const { producto } = route.params;

  return (
    <View style={styles.container}>
      {producto.url_fotografia && (
        <Image source={{ uri: producto.url_fotografia }} style={styles.imagen} />
      )}
      <Text style={styles.nombre}>{producto.nombre}</Text>
      <Text>Precio: ${producto.precio}</Text>
      <Text>Estado: {producto.estado}</Text>
      <Text>Categoría: {producto.categoria}</Text>
      <Text style={styles.descripcion}>{producto.descripcion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  imagen: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20 },
  nombre: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  descripcion: { marginTop: 10 },
});
