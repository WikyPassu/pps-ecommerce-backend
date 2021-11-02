const db = require("../models/db");
const mercadopago = require ('mercadopago');
mercadopago.configure({
  access_token: 'TEST-8145171060277886-110105-845001e4473950c8bdb5f96ec41e17c5-256136854'
});

//REALIZAR PAGO
exports.realizarPago = (req, res) => {
    if(!req.body.productos){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'productos'." 
        });
        return;
    }
    let productos = JSON.parse(req.body.productos);
    let preference = { items: [] };
    productos.forEach(producto => {
        preference.items.push({
            title: producto.descripcion,
            unit_price: producto.precio,
            quantity: producto.cantidad
        });
    });
    mercadopago.preferences.create(preference)
    .then(response => {
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Link de pago enviado exitosamente.",
            mercadoPago: response 
        });
    })
    .catch(() => {
        res.status(500).send({
            exito: false,
            status: 500,
            mensaje: "Error interno en el servidor." 
        });
    });
};