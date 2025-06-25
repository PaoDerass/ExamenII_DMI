const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const sequelize = new Sequelize('examenmovil', 'root', 'root123', {
  host: '127.0.0.1',
  dialect: 'mysql'
});
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa');
  })
  .catch(err => {
    console.error('error en la conexion:', err);
  });

  const Producto = sequelize.define('Producto', {
  nombre: DataTypes.STRING,
  descripcion: DataTypes.TEXT,
  precio: DataTypes.FLOAT,
  estado: DataTypes.STRING,
  categoria: DataTypes.STRING,
  url_fotografia: DataTypes.STRING
}, {
  tableName: 'productos',
  timestamps: true
});


app.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'No se pueden obtener los productos' });
  }
});


app.post('/productos', async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'No se puede crear el producto' });
  }
});


app.delete('/productos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await Producto.destroy({
      where: { id: id }
    });
    
    if (eliminado) {
      res.json({ mensaje: 'Producto eliminado' });
    } else {
      res.status(404).json({ error: 'No se encuentra el producto' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se puede eliminar el producto' });
  }
});


const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});