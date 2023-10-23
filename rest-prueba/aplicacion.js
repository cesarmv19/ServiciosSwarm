const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prueba'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa!');
});

app.get('/consultarAlumnosPorApellido', (req, res) => {
  const query = "SELECT id_alumno, nombre, curso, nota FROM prueba.alumnos ORDER BY nombre";
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos: ', error);
      res.status(500).json({ error: 'Error al consultar la base de datos' });
    } else {
      res.json(results);
    }
  });
});

app.get('/consultarAlumnosPorNota', (req, res) => {
  const query = "SELECT id_alumno, nombre, curso, nota FROM prueba.alumnos ORDER BY nota";
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos: ', error);
      res.status(500).json({ error: 'Error al consultar la base de datos' });
    } else {
      res.json(results);
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor REST escuchando en el puerto ${PORT}`);
});
