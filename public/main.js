document.addEventListener('DOMContentLoaded', function () {
    const contenido = document.getElementById('contenido');
    const formularios = document.getElementById('formularios');
    const formEstudiante = document.getElementById('formEstudiante');
    const formCurso = document.getElementById('formCurso');
    const formEstudianteDatos = document.getElementById('formEstudianteDatos');
    const formCursoDatos = document.getElementById('formCursoDatos');
    const tituloFormEstudiante = document.getElementById('tituloFormEstudiante');
    const tituloFormCurso = document.getElementById('tituloFormCurso');

    // Función para cargar los estudiantes
    function cargarEstudiantes() {
        fetch('/estudiantes')
            .then(response => response.json())
            .then(estudiantes => {
                let html = '<h2>Lista de Estudiantes</h2>';
                html += '<ul>';
                estudiantes.forEach(estudiante => {
                    html += `<li>${estudiante.nombre}, Edad: ${estudiante.edad} 
                             <button onclick="editarEstudiante(${estudiante.id}, '${estudiante.nombre}', ${estudiante.edad})">Editar</button>
                             <button onclick="editarEstudiante(${estudiante.id}, '${estudiante.nombre}', ${estudiante.edad})">Eliminar</button></li>`;
                });
                html += '</ul>';
                contenido.innerHTML = html;
                formularios.style.display = 'none';
            })
            .catch(error => {
                contenido.innerHTML = '<p>Error al cargar los estudiantes.</p>';
            });
    }

    // Función para cargar los cursos
    function cargarCursos() {
        fetch('/cursos')
            .then(response => response.json())
            .then(cursos => {
                let html = '<h2>Lista de Cursos</h2>';
                html += '<ul>';
                cursos.forEach(curso => {
                    html += `<li>${curso.nombre}, Duración: ${curso.duracion} 
                             <button onclick="editarCurso(${curso.id}, '${curso.nombre}', '${curso.duracion}')">Editar</button>
                             <button onclick="editarCurso(${curso.id}, '${curso.nombre}', '${curso.duracion}')">Eliminar</button>
                             </li>`;
                });
                html += '</ul>';
                contenido.innerHTML = html;
                formularios.style.display = 'none';
            })
            .catch(error => {
                contenido.innerHTML = '<p>Error al cargar los cursos.</p>';
            });
    }

    // Función para agregar un nuevo estudiante
    function mostrarFormularioEstudiante() {
        tituloFormEstudiante.textContent = "Agregar Estudiante";
        formEstudianteDatos.reset();
        document.getElementById('estudianteId').value = ''; // Vaciar campo hidden
        formEstudiante.style.display = 'block';
        formCurso.style.display = 'none';
        formularios.style.display = 'block';
    }

    // Función para agregar un nuevo curso
    function mostrarFormularioCurso() {
        tituloFormCurso.textContent = "Agregar Curso";
        formCursoDatos.reset();
        document.getElementById('cursoId').value = ''; // Vaciar campo hidden
        formCurso.style.display = 'block';
        formEstudiante.style.display = 'none';
        formularios.style.display = 'block';
    }

    // Envío de formulario de estudiantes (Agregar o Modificar)
    formEstudianteDatos.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = document.getElementById('estudianteId').value;
        const nombre = document.getElementById('nombre').value;
        const edad = document.getElementById('edad').value;

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/estudiantes/${id}` : '/estudiantes';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, edad })
        })
        .then(response => response.json())
        .then(() => {
            cargarEstudiantes(); // Recargar lista de estudiantes después de agregar/modificar
            alert('Estudiante guardado correctamente');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al guardar el estudiante');
        });
    });

    // Envío de formulario de cursos (Agregar o Modificar)
    formCursoDatos.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = document.getElementById('cursoId').value;
        const nombre = document.getElementById('nombreCurso').value;
        const duracion = document.getElementById('duracion').value;

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/cursos/${id}` : '/cursos';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, duracion })
        })
        .then(response => response.json())
        .then(() => {
            cargarCursos(); // Recargar lista de cursos después de agregar/modificar
            alert('Curso guardado correctamente');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al guardar el curso');
        });
    });

    // Función para modificar un estudiante existente
    window.editarEstudiante = function (id, nombre, edad) {
        document.getElementById('estudianteId').value = id;
        document.getElementById('nombre').value = nombre;
        document.getElementById('edad').value = edad;
        tituloFormEstudiante.textContent = "Modificar Estudiante";
        formEstudiante.style.display = 'block';
        formCurso.style.display = 'none';
        formularios.style.display = 'block';
    };

    // Función para modificar un curso existente
    window.editarCurso = function (id, nombre, duracion) {
        document.getElementById('cursoId').value = id;
        document.getElementById('nombreCurso').value = nombre;
        document.getElementById('duracion').value = duracion;
        tituloFormCurso.textContent = "Modificar Curso";
        formCurso.style.display = 'block';
        formEstudiante.style.display = 'none';
        formularios.style.display = 'block';
    };

    // Asignar eventos a los enlaces del menú
    document.getElementById('verEstudiantes').addEventListener('click', function (event) {
        event.preventDefault();
        cargarEstudiantes();
    });

    document.getElementById('verCursos').addEventListener('click', function (event) {
        event.preventDefault();
        cargarCursos();
    });

    document.getElementById('agregarEstudiante').addEventListener('click', function (event) {
        event.preventDefault();
        mostrarFormularioEstudiante();
    });

    document.getElementById('agregarCurso').addEventListener('click', function (event) {
        event.preventDefault();
        mostrarFormularioCurso();
    });
});