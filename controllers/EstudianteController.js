const { Estudiante, Curso } = require('../models');

exports.cursosInscritos = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id, {
      include: Curso
    });
    res.json(estudiante.Cursos);
  } catch (error) {
    res.status(500).send('Error al obtener cursos');
  }
};

exports.actualizarEdadPorCurso = async (req, res) => {
    try {
      const { nuevoValor } = req.body;
      const curso = await Curso.findByPk(req.params.cursoId, {
        include: Estudiante
      });
      curso.Estudiantes.forEach(async (estudiante) => {
        estudiante.edad = nuevoValor;
        await estudiante.save();
      });
      res.send('Edades actualizadas');
    } catch (error) {
      res.status(500).send('Error al actualizar');
    }
  };

  exports.eliminarSinCursos = async (req, res) => {
    try {
      const estudiantes = await Estudiante.findAll({
        include: { model: Curso, through: { where: null }, required: false }
      });
      estudiantes.forEach(async (estudiante) => {
        if (estudiante.Cursos.length === 0) {
          await estudiante.destroy();
        }
      });
      res.send('Estudiantes eliminados');
    } catch (error) {
      res.status(500).send('Error al eliminar');
    }
  };
  
  exports.crearEstudiante = async (req, res) => {
    try {
      const estudiante = await Estudiante.create(req.body);
      res.status(201).json(estudiante);
    } catch (error) {
      res.status(400).send('Error al crear estudiante');
    }
  };
  
  // Implementación de los métodos leer, actualizar y eliminar...  
  