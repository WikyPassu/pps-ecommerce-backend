const db = require("../models/db");

//AGREGAR
exports.agregarResenia = (req, res) => {
    if(!req.body.resenia){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'resenia'." 
        });
        return;
    }
    db.getInstance().collection("resenias").insertOne(JSON.parse(req.body.resenia))
    .then(() => {
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Resenia agregada exitosamente."
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
exports.modificarResenia = (req, res) => {
    if(!req.body._id || !req.body.resenia){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id' o 'resenia'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("resenias").updateOne(
        { _id: ObjectID(req.body._id) }, { $set: JSON.parse(req.body.resenia) }
    )
    .then(data => {
        if(!data.modifiedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró la resenia."
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Resenia modificada exitosamente."
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
exports.eliminarResenia = (req, res) => {
    if(!req.body._id){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("resenias").deleteOne({ _id: ObjectID(req.body._id) })
    .then(data => {
        if(!data.deletedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró la resenia." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "resenia eliminado exitosamente."
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

//VERIFICAR COMPRA PREVIA
/*(exports.verificarCompraPrevia = (req, res) => {
    if(!req.body.resenia){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'resenia'." 
        });
        return;
    }
    db.getInstance().collection("resenias").insertOne(JSON.parse(req.body.resenia))
    .then(() => {
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Resenia agregada exitosamente."
        });
    })
    .catch(() => {
        res.status(500).send({
            exito: false,
            status: 500,
            mensaje: "Error interno en el servidor." 
        });
    });
};*/