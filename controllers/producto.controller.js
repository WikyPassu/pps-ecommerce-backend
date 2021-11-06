const db = require("../models/db");

//AGREGAR
exports.agregarProducto = (req, res) => {
    if(!req.body.producto){

        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'producto'." 
        });
        return;
    }
    db.getInstance().collection("productos").insertOne(req.body.producto)
    .then(() => {
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Producto agregado exitosamente."
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

//MODIFICAR
exports.modificarProducto = (req, res) => {
    if(!req.body._id || !req.body.producto){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id' o 'producto'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("productos").updateOne(
        { _id: ObjectID(req.body._id) }, { $set: req.body.producto }
    )
    .then(data => {
        if(!data.modifiedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró el producto."
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Producto modificado exitosamente."
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
exports.eliminarProducto = (req, res) => {
    if(!req.body._id){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro '_id'." 
        });
        return;
    }
    let ObjectID = require('mongodb').ObjectID;
    db.getInstance().collection("productos").deleteOne({ _id: ObjectID(req.body._id) })
    .then(data => {
        if(!data.deletedCount){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontró el producto." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Producto eliminado exitosamente."
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

//BUSCAR PRODUCTOS
exports.buscarProductos = (req, res) => {
    if(!req.body.busqueda){
        res.status(400).send({
            exito: false,
            status: 400,
            mensaje: "Petición errónea. Falta parámetro 'busqueda'." 
        });
        return;
    }
    db.getInstance().collection("productos").find({ $text: { $search: req.body.busqueda } })
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontraron productos." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Productos encontrados exitosamente.",
            productos: data
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
exports.traerProductos = (req, res) => {
    db.getInstance().collection("productos").find()
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontraron productos." 
            });
            return;
        }
        res.status(200).send({
            exito: true,
            status: 200,
            mensaje: "Productos traidos exitosamente.",
            productos: data
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
    db.getInstance().collection("productos").find()
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(404).send({
                exito: false,
                status: 404,
                mensaje: "No se encontraron productos."
            });
            return;
        }
        let productos = data;
        productos.forEach(producto => producto.cantidad = 0);
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
            productos.forEach(producto => {
                detalleFacturas.forEach(detalle => {
                    if(producto._id == detalle.producto._id){
                        producto.cantidad += detalle.cantidad;
                    }
                });
            });
            let productoMax;
            let flag = 0;
            productos.forEach(producto => {
                if(!flag || producto.cantidad > productoMax.cantidad){
                    productoMax = producto;
                    flag = 1;
                }
            });
            res.status(200).send({
                exito: true,
                status: 200,
                mensaje: "Producto mas vendido encontrado.",
                producto: productoMax
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