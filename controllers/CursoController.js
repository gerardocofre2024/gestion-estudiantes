const { Curso, Estudiante } = require('../models');

exports.estudiantesInscritos = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id, {
      include: Estudiante
    });
    res.json(curso.Estudiantes);
  } catch (error) {
    res.status(500).send('Error al obtener estudiantes');
  }
};

exports.crearCurso = async (req, res) => {
    try {
      const curso = await Curso.create(req.body);
      res.status(201).json(curso);
    } catch (error) {
      res.status(400).send('Error al crear curso');
    }
  };
  
  // Implementación de los métodos leer, actualizar y eliminar...
  