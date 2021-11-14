const db = require("../models/db");

//AGREGAR
exports.agregarUsuarioRegistrado = (req, res) => {
    if(!req.body.usuarioRegistrado){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'usuarioRegistrado'." 
        });
        return;
    }
    db.getInstance().collection("usuariosRegistrados").insertOne(req.body.usuarioRegistrado)
    .then(() => {
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Usuario agregado exitosamente.",
            usuario: res.json()
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
exports.modificarUsuarioRegistrado = (req, res) => {
    if(!req.body._id || !req.body.usuarioRegistrado){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id' o 'usuarioRegistrado'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("usuariosRegistrados").updateOne(
        { _id: ObjectID(req.body._id) }, { $set: req.body.usuarioRegistrado }
    )
    .then(data => {
        if(!data.modifiedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró el usuario."
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Usuario modificado exitosamente."
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
exports.eliminarUsuarioRegistrado = (req, res) => {
    if(!req.body._id){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("usuariosRegistrados").deleteOne({ _id: ObjectID(req.body._id) })
    .then(data => {
        if(!data.deletedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró el usuario." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Usuario eliminado exitosamente."
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
exports.traerUsuariosRegistrados = (req, res) => {
    db.getInstance().collection("usuariosRegistrados").find()
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontraron usuarios." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Usuarios traidos exitosamente.",
            usuariosRegistrados: data
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

//LOGIN
exports.login = (req, res) => {
    if(!req.body.correo || !req.body.clave){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'correo' o 'clave'." 
        });
        return;
    }
    db.getInstance().collection("usuariosRegistrados").find({ correo: req.body.correo, clave: req.body.clave })
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No existe un usuario con ese correo y clave." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Inicio de sesión exitoso.",
            usuario: data
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