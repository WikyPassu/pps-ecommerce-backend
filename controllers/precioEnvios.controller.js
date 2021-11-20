const db = require("../models/db");

//AGREGAR
exports.agregarPrecioEnvios = (req, res) => {
    if(!req.body.precioEnvios){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'precioEnvios'." 
        });
        return;
    }
    db.getInstance().collection("precioEnvios").insertOne(req.body.precioEnvios)
    .then(() => {
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "PrecioEnvios agregado exitosamente."
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

//MODIFICAR
exports.modificarPrecioEnvios = (req, res) => {
    if(!req.body._id || !req.body.precioEnvios){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id' o 'precioEnvios'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("precioEnvios").updateOne(
        { _id: ObjectID(req.body._id) }, { $set: req.body.precioEnvios }
    )
    .then(data => {
        if(!data.modifiedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró el precioEnvios."
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "PrecioEnvios modificado exitosamente."
        });
    })
    .catch((err) => {
        res.status(500).send({
            exito: false,
            status: 500,
            mensaje: "Error interno en el servidor."
        });
    });
};

//ELIMINAR
exports.eliminarPrecioEnvios = (req, res) => {
    if(!req.body._id){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("precioEnvios").deleteOne({ _id: ObjectID(req.body._id) })
    .then(data => {
        if(!data.deletedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró el precioEnvios." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "PrecioEnvios eliminado exitosamente."
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

//TRAER TODOS
exports.traerPrecioEnvios = (req, res) => {
    db.getInstance().collection("precioEnvios").find()
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontraron precioEnvios." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "PrecioEnvios traidos exitosamente.",
            precioEnvioss: data
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
