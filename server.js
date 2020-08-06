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

/**
 * Get request with query params.
 * This methos searches for students by the given course and student name.
 */
app.get('/acamica/:comision/alumnos', (req, res) => {
    const { comision } = req.params;
    const { nombre } = req.query;

    if (comisiones.includes(comision)) {
        const studentsByCourse = getStudentsByCourse(comision);
        const studentsByNameAndCourse = getStudentsByName(nombre, studentsByCourse);

        res.status(200)
            .json({ students: (nombre ? studentsByNameAndCourse : studentsByCourse) })
    } else {
        res.status(404)
            .json({ message: `The course ${comision} doesn't exists` });
    }
});

/**
 * Get request without query params.
 * This method searches for students by the given course and id by its params.
 */
app.get('/acamica/:comision/alumnos/:alumnoId', (req, res) => {
    const { comision, alumnoId } = req.params;

    if (comisiones.includes(comision)) {
        if (isNaN(alumnoId)) {
            const studentsByCourse = getStudentsByCourse(comision);
            const student = getStudentById(alumnoId, studentsByCourse);

            res.status(200)
                .json({ student: student });
        } else {
            res.status(404)
                .json({ message: 'The userId should be a number' });
        }
    } else {
        res.status(404)
            .json({ message: `The course ${comision} doesn't exists` });
    }
});

/**
 * Gets all students on a given course.
 * @param {String} course Course name.
 * @param {Array} students Students array where the search is done.
 * @returns {Array} Students array.
 */
const getStudentsByCourse = (course, students = alumnos) => students.filter(alumno => alumno.comision === course);

/**
 * Get all students by the given name.
 * @param {String} name Students name.
 * @param {Array} students Students array where the search is done.
 * @returns {Array} Students array.
 */
const getStudentsByName = (name, students = alumnos) => students.filter(alumno => alumno.name === name);

/**
 * Get student by its id.
 * @param {Number} studentId Student id.
 * @param {Array} students Students array where the search is done.
 * @returns {Object} Student object
 */
const getStudentById = (studentId, students = alumnos) => students.find(alumno => alumno.id === studentId);

/**
 * Put the server to listen for requests on the given port (3000).
 */
app.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});