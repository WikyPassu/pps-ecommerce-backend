const db = require("../models/db");
const mercadopago = require ('mercadopago');
mercadopago.configure({
  access_token: 'TEST-8145171060277886-110105-845001e4473950c8bdb5f96ec41e17c5-256136854'
});

//REALIZAR PAGO
exports.realizarPago = (req, res) => {
    if(!req.body.productos || !req.body.cliente){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'productos' o 'cliente'." 
        });
        return;
    }
    let productos = req.body.productos;
    let cliente = req.body.cliente;
    let preference = {
        auto_return: "approved",
        items: [],
        payer: {
            name: cliente.nombre,
            surname: cliente.apellido,
            email: cliente.correo,
            phone: {
                area_code: "+54",
                number: cliente.telefono
            },
            identification: {
                number: cliente.dni,
                type: "DNI"
            },
            adress: {
                zip_code: cliente.codigoPostal,
                street_name: cliente.domicilio
            }
        },
        back_urls: {
            failure: "http://localhost:3000/caja/resultado/fallido",
            pending: "http://localhost:3000/caja/resultado/pendiente",
            success: "http://localhost:3000/caja/resultado/exitoso"
        }
    };
    productos.forEach(item => {
        preference.items.push({
            title: item.item.nombre,
            unit_price: item.item.precio,
            quantity: item.cantidad
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