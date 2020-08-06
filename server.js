const express = require('express');

const app = express();

const comisiones = ['dwfs', 'dwa', 'bigdata'];

const alumnos = [
    { id: 1, name: 'Carlos', comision: 'dwfs' },
    { id: 2, name: 'Andres', comision: 'dwa' },
    { id: 3, name: 'Maria', comision: 'bigdata' },
    { id: 4, name: 'Julian', comision: 'dwfs' },
    { id: 5, name: 'Camila', comision: 'dwa' },
    { id: 6, name: 'Andrea', comision: 'bigdata' }
];

app.get('/acamica/:comision/alumnos', (req, res) => {
    const { comision } = req.params;
    const { nombre } = req.query;

    if (comisiones.includes(comision)) {
        if (nombre) {
            res.status(200)
                .json({ alumnos: alumnos.filter(alumno => alumno.comision === comision && alumno.name === nombre) });
        } else {
            res.status(200)
                .json({ alumnos: alumnos.filter(alumno => alumno.comision === comision) });
        }
    } else {
        res.status(404)
            .json({ message: "Esta comision no existe" });
    }
});

app.get('/acamica/:comision/alumnos/:alumnoId', (req, res) => {
    const { comision, alumnoId } = req.params;

    if (comisiones.includes(comision)) {
        res.status(200)
            .json(alumnos.find(alumno => alumno.comision === comision && alumno.id === alumnoId));
    } else {
        res.status(404)
            .json({ message: "Esta comision no existe" });
    }
});

/**
 * Get student by its id
 * @param {Number} id Student id
 */
const getStudentById = (id) => {
    for (let alumno of alumnos) {
        if (alumno.id == id) {
            return alumno;
        }
    }

    return { student: null };
}

app.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});