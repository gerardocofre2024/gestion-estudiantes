const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const Estudiante = require('./models/estudiante');
const Curso = require('./models/curso');


const app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html'); // Enviar el archivo HTML principal
});

// Ruta para obtener la lista de estudiantes
app.get('/estudiantes', async (req, res) => {
    const estudiantes = await Estudiante.findAll();
    res.json(estudiantes);
});

// Ruta para obtener la lista de cursos
app.get('/cursos', async (req, res) => {
    const cursos = await Curso.findAll();
    res.json(cursos);
});

// Ruta para agregar un nuevo estudiante
app.post('/estudiantes', async (req, res) => {
    const { nombre, edad } = req.body;
    try {
        const estudiante = await Estudiante.create({ nombre, edad });
        res.json(estudiante);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear estudiante' });
    }
});

// Ruta para modificar un estudiante
app.put('/estudiantes/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, edad } = req.body;
    try {
        await Estudiante.update({ nombre, edad }, { where: { id } });
        res.json({ message: 'Estudiante actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar estudiante' });
    }
});

// Ruta para agregar un nuevo curso
app.post('/cursos', async (req, res) => {
    try {
        const { nombre, duracion } = req.body;
        const curso = await Curso.create({ nombre, duracion });
        res.json(curso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el curso' });
    }
});

// Ruta para modificar un curso
app.put('/cursos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, duracion } = req.body;
    try {
        await Curso.update({ nombre, duracion }, { where: { id } });
        res.json({ message: 'Curso actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar curso' });
    }
});

// Sincronizar la base de datos y levantar el servidor
sequelize.sync({ force: false })  // Cambia a true solo si deseas recrear las tablas (cuidado: borra los datos)
    .then(() => {
        console.log('Tablas sincronizadas correctamente.');
    })
    .catch(error => {
        console.error('Error al sincronizar las tablas:', error);
    });

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});