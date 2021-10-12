const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/db');

db.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('MongoDB Conectado');
})

const corsOptions = {
    origin: "*"
};

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/', require('./routes/index'));
app.use('/producto', require('./routes/producto'));
app.use('/servicio', require('./routes/servicio'));
app.use('/turno', require('./routes/turno'));
app.use('/factura', require('./routes/factura'));
app.use('/usuarioRegistrado', require('./routes/usuarioRegistrado'));
app.use('/empleado', require('./routes/empleado'));
app.use('/reseña', require('./routes/resenia'));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App activa en el puerto ${port}`));