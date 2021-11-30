const db = require("../models/db");
const axios = require("axios");
const mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: 'TEST-8145171060277886-110105-845001e4473950c8bdb5f96ec41e17c5-256136854'
});

//REALIZAR PAGO
exports.realizarPago = (req, res) => {
    if (!req.body.productos || !req.body.cliente || !req.body.back_urls) {
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'productos', 'cliente' o 'back url'."
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
                number: cliente.dni + "",
                type: "DNI"
            },
            adress: {
                zip_code: cliente.codigoPostal,
                street_name: cliente.domicilio
            }
        },
        back_urls: req.body.back_urls
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
        .catch((err) => {
            console.log(err)
            res.status(500).send({
                exito: false,
                status: 500,
                mensaje: "Error interno en el servidor."
            });
        });
};

exports.getPayerByPaymentId = async (req, res) => {
    try {
        //CONSIGO PAYMENT
        let resPayment = await axios({
            method: 'get',
            url: 'https://api.mercadopago.com/v1/payments/' + req.body.paymentId,
            headers: {
                Authorization: "Bearer TEST-8145171060277886-110105-845001e4473950c8bdb5f96ec41e17c5-256136854"
            }
        })
        console.log("ORDER ID", resPayment.data.order.id);

        //CONSIGO ORDER
        let resOrder = await axios({
            method: 'get',
            url: 'https://api.mercadopago.com/merchant_orders/' + resPayment.data.order.id,
            headers: {
                Authorization: "Bearer TEST-8145171060277886-110105-845001e4473950c8bdb5f96ec41e17c5-256136854"
            }
        });
        console.log("PREFERENCE ID", resOrder.data.preference_id);

        //CONSIGO PREFERENCE
        let resPreference = await axios({
            method: 'get',
            url: 'https://api.mercadopago.com/checkout/preferences/' + resOrder.data.preference_id,
            headers: {
                Authorization: "Bearer TEST-8145171060277886-110105-845001e4473950c8bdb5f96ec41e17c5-256136854"
            }
        });

        //RETORNA QUIEN SOLICITO LA COMPRA
        console.log("PAYAER", resPreference.data.payer);
        res.json(resPreference.data.payer);
    }
    catch (err) {
        console.log(err)
        res.end();
    }
}

exports.getAllPaymentsByEmail = async (req, res) => {
    try {
        console.log("body", req.body);
        //CONSIGO PREFERENCE
        let preferences = await axios({
            method: 'get',
            url: 'https://api.mercadopago.com/checkout/preferences/?payer_email=' + req.body.email,
            headers: {
                Authorization: "Bearer TEST-8145171060277886-110105-845001e4473950c8bdb5f96ec41e17c5-256136854"
            }
        });
        preferencesId = preferences.data.elements?.map((c)=>{
            return c.id
        });
        console.log("lista preference id: ", preferencesId);


        let orders = await axios({
            method: 'get',
            url: 'https://api.mercadopago.com/merchant_orders/',
            headers: {
                Authorization: "Bearer TEST-8145171060277886-110105-845001e4473950c8bdb5f96ec41e17c5-256136854"
            }
        });
        orders = orders.data.elements?.filter((c)=>{
            return preferencesId.find((e)=>e === c.preference_id) ? true : false;
        }).map((c)=>{
            return c.id;
        })

        console.log("lista orders id: ", orders);

        let payments = await axios({
            method: 'GET',
            url: 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc',
            headers: {
                Authorization: "Bearer TEST-8145171060277886-110105-845001e4473950c8bdb5f96ec41e17c5-256136854"
            }
        });

        payments = payments.data.results.filter((c)=>{
            return orders.find((e) => e == c.order.id) ? true : false;
        });

        console.log("lista payments ", payments);

        res.json(payments) 
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Ocurrio un error interno",
            details:error.message
        })
    }
}
