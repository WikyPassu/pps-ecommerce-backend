const db = require("../models/db");

//AGREGAR
exports.agregarConsumible = (req, res) => {
    if(!req.body.consumible){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'consumible'." 
        });
        return;
    }
    db.getInstance().collection("consumibles").insertOne(req.body.consumible)
    .then((response) => {
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Consumible agregado exitosamente.",
            consumible: response.ops[0]
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
exports.modificarConsumible = (req, res) => {
    if(!req.body._id || !req.body.consumible){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id' o 'consumible'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("consumibles").updateOne(
        { _id: ObjectID(req.body._id) }, { $set: req.body.consumible }
    )
    .then(data => {
        if(!data.modifiedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró el consumible."
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Consumible modificado exitosamente."
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

//ELIMINAR
exports.eliminarConsumible = (req, res) => {
    if(!req.body._id){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("consumibles").deleteOne({ _id: ObjectID(req.body._id) })
    .then(data => {
        if(!data.deletedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró el consumible." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Consumible eliminado exitosamente."
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
exports.traerConsumibles = (req, res) => {
    db.getInstance().collection("consumibles").find()
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontraron consumibles." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Consumibles traidos exitosamente.",
            consumibles: data
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

exports.actualizarConsumible = (req, res) => {
    if(!req.body._id || !req.body.cantidadUsada){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id' o 'cantidadUsada'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("consumibles").findOne({ _id: ObjectID(req.body._id) })
    .then(data => {
        if(!data){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró el consumible." 
            });
            return;
        }
        let consumible = data;
        let existenciaActualizada = consumible.existencia - req.body.cantidadUsada;
        consumible.existencia = existenciaActualizada;
        db.getInstance().collection("consumibles").updateOne(
            { _id: ObjectID(req.body._id) }, { $set: consumible }
        )
        .then(() => {
            res.status(200).send({
                exito: true,
                status: 200,
                mensaje: "Cantidad usada del consumible actualizada exitosamente."
            });
            return;
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