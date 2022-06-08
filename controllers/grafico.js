const Grafico = require('../models/grafico');
const https = require('https');
const express = require('express');
const api = express.Router();

//Añade un precio al array, si la grafica esta creada sino la crea y si se pasa del limite borra el dato mas antiguo e ingesta el nuevo
async function anadirPrecio(req, res) {
  try {
    const id = req.params.id;
    const precio = req.body.precio;

    let grafico = await Grafico.findOne({ id: id });

    if (grafico && precio.date != grafico.precios[0].date) {
      //si el grafico es tiene 5 registros borra el mas antiguo y añade el nuevo
      if (grafico.precios.length > 4) {
        //deberia buscar el que coincida con el id, borrar el ultimo dato y meter el nuevo
        grafico = await Grafico.findOneAndUpdate(
          { id: id },
          { $pop: { precios: 1 } }
        );
        grafico = await Grafico.findOneAndUpdate(
          { id: id },
          { $push: { precios: precio } }
        );
        res.status(200).send(grafico);
      } else {//Si no hay 5 registros añade el nuevo sin mas
        grafico = await Grafico.findOneAndUpdate(
          { id: id },
          { $push: { precios: precio } }
        );
        res.status(200).send(grafico);
      }
      //Si la fecha es la misma que el primer precio no hace nada
    } else if (precio.date == grafico.precios[0].date) {
      res.status(200).send({ msg: 'Precio ya actualizado' });
    } else {
      //crea el mazo si no existe
      grafico = new Grafico();
      grafico.id = id;
      grafico.precio = precio;
      grafico.save();
      res.status(200).send(grafico);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Para exportar las funciones get,post,delete,update
module.exports = {
  anadirPrecio,
};
