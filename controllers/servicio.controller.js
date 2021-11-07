const db = require("../models/db");

//AGREGAR
exports.agregarServicio = (req, res) => {
    if(!req.body.servicio){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'servicio'." 
        });
        return;
    }
    db.getInstance().collection("servicios").insertOne(req.body.servicio)
    .then(() => {
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Servicio agregado exitosamente."
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
exports.modificarServicio = (req, res) => {
    if(!req.body._id || !req.body.servicio){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id' o 'servicio'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("servicios").updateOne(
        { _id: ObjectID(req.body._id) }, { $set: req.body.servicio }
    )
    .then(data => {
        if(!data.modifiedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró el servicio."
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Servicio modificado exitosamente."
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
exports.eliminarServicio = (req, res) => {
    if(!req.body._id){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("servicios").deleteOne({ _id: ObjectID(req.body._id) })
    .then(data => {
        if(!data.deletedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró el servicio." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Servicio eliminado exitosamente."
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

//BUSCAR SERVICIOS
exports.buscarServicios = (req, res) => {
    if(!req.body.busqueda){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'busqueda'." 
        });
        return;
    }
    db.getInstance().collection("servicios").find({ $text: { $search: req.body.busqueda } })
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontraron servicios." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Servicios encontrados exitosamente.",
            servicios: data
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
exports.traerServicios = (req, res) => {
    db.getInstance().collection("servicios").find()
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontraron servicios." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Servicios traidos exitosamente.",
            servicios: data
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

//TRAER MAS VENDIDO
exports.traerMasVendido = (req, res) => {
    db.getInstance().collection("servicios").find()
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontraron servicios."
            });
            return;
        }
        let servicios = data;
        servicios.forEach(servicio => servicio.cantidad = 0);
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
            let facturas = data;
            let detalleFacturas = [];
            facturas.forEach(factura => detalleFacturas.push(...factura.detalleFactura));
            servicios.forEach(servicio => {
                detalleFacturas.forEach(detalle => {
                    if(servicio._id == detalle.producto._id){
                        servicio.cantidad += detalle.cantidad;
                    }
                });
            });
            let servicioMax;
            let flag = false;
            servicios.forEach(servicio => {
                if(!flag || servicio.cantidad > servicioMax.cantidad){
                    servicioMax = servicio;
                    flag = true;
                }
            });
            res.status(200).send({
                exito: true,
                status: 200,
                mensaje: "Servicio mas vendido encontrado.",
                servicio: servicioMax
            });
        })
        .catch(() => {
            res.status(500).send({
                exito: false,
                status: 500,
                mensaje: "Error interno en el servidor." 
            });
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

//TRAER MAS VENDIDOS
exports.traerMasVendidos = (req, res) => {
    db.getInstance().collection("servicios").find()
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontraron servicios."
            });
            return;
        }
        let servicios = data;
        servicios.forEach(servicio => servicio.cantidad = 0);
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
            let facturas = data;
            let detalleFacturas = [];
            facturas.forEach(factura => detalleFacturas.push(...factura.detalleFactura));
            servicios.forEach(servicio => {
                detalleFacturas.forEach(detalle => {
                    if(servicio._id == detalle.servicio._id){
                        servicio.cantidad += detalle.cantidad;
                    }
                });
            });
            servicio.sort((p1, p2) => {
                if(p1.cantidad < p2.cantidad){
                    return 1;
                }
                if(p1.cantidad > p2.cantidad){
                    return -1;
                }
                return 0;
            });
            res.status(200).send({
                exito: true,
                status: 200,
                mensaje: "Servicios mas vendidos encontrados y ordenados.",
                servicios: servicios
            });
        })
        .catch(() => {
            res.status(500).send({
                exito: false,
                status: 500,
                mensaje: "Error interno en el servidor." 
            });
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