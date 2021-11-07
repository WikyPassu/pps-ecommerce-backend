const db = require("../models/db");

//AGREGAR
exports.agregarFactura = (req, res) => {
    if(!req.body.factura){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'factura'." 
        });
        return;
    }
    db.getInstance().collection("facturas").insertOne(req.body.factura)
    .then(() => {
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Factura agregada exitosamente."
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
exports.modificarFactura = (req, res) => {
    if(!req.body._id || !req.body.factura){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id' o 'factura'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("facturas").updateOne(
        { _id: ObjectID(req.body._id) }, { $set: req.body.factura }
    )
    .then(data => {
        if(!data.modifiedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró la factura."
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Factura modificada exitosamente."
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
exports.eliminarFactura = (req, res) => {
    if(!req.body._id){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("facturas").deleteOne({ _id: ObjectID(req.body._id) })
    .then(data => {
        if(!data.deletedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró la factura." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Factura eliminada exitosamente."
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

//TRAER TODAS
exports.traerFacturas = (req, res) => {
    db.getInstance().collection("facturas").find()
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontraron facturas." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Facturas traidas exitosamente.",
            facturas: data
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

//BUSCAR FACTURAS USUARIO
exports.traerFacturasUsuario = (req, res) => {
    if(!req.body._id){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("facturas").find({ idUsuarioRegistrado: ObjectID(req.body._id) })
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontraron facturas." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Facturas encontradas exitosamente.",
            facturas: data
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

//BUSCAR FACTURAS TEMPORADA
exports.traerFacturasTemporada = (req, res) => {
    if(!req.body.temporada){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'temporada'." 
        });
        return;
    }
    db.getInstance().collection("facturas").find()
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontraron facturas." 
            });
            return;
        }
        let facturas = [{enero: []}, {febrero: []}, {marzo: []}, {abril: []}, {mayo: []}, {junio: []}, {julio: []}, {agosto: []}, {septiembre: []}, {octubre: []}, {noviembre: []}, {diciembre: []}];
        data.forEach(element => {
            let fecha = new Date(element.fecha);
            let anio = fecha.getFullYear();
            let mes = fecha.getMonth();
            if(anio == req.body.temporada){
                switch(mes){
                    case 1:
                        facturas[0]["enero"].push(element);
                        break;
                    case 2:
                        facturas[1]["febrero"].push(element);
                        break;
                    case 3:
                        facturas[2]["mayo"].push(element);
                        break;
                    case 4:
                        facturas[3]["abril"].push(element);
                        break;
                    case 5:
                        facturas[4]["mayo"].push(element);
                        break;
                    case 6:
                        facturas[5]["junio"].push(element);
                        break;
                    case 7:
                        facturas[6]["julio"].push(element);
                        break;
                    case 8:
                        facturas[7]["agosto"].push(element);
                        break;
                    case 9:
                        facturas[8]["septiembre"].push(element);
                        break;
                    case 10:
                        facturas[9]["octubre"].push(element);
                        break;
                    case 11:
                        facturas[10]["noviembre"].push(element);
                        break;
                    case 12:
                        facturas[11]["diciembre"].push(element);
                        break;
                }
            }
        });
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Facturas encontradas exitosamente.",
            facturas: facturas
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