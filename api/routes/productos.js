var express = require('express');
var router = express.Router();
var Producto = require("../models/modelo_producto.js");

router.post('/', async function (req, res, next) {
  const producto = new Producto({
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
  });
  await producto.save();
  res.send(producto);
});

router.get('/', async function (req, res) {
  const productos = await Producto.find();
  res.send(productos);
});

router.get('/:id', async function (req, res) {
  const producto = await Producto.findById(req.params.id);
  res.send(producto);
});

router.put('/', async function (req, res) {
  await Producto.findOneAndUpdate({
    _id: req.body._id,
  }, {
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
  });
  res.send(true);
});

router.delete('/:id', async function (req, res) {
  await Producto.findOneAndDelete({ _id: req.params.id });
  res.send(true);
});

module.exports = router;