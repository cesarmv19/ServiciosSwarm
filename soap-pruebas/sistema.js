const soap = require('strong-soap').soap;
const mysql = require('mysql');
const fs = require('fs');

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

const consultarAlumnos = (args, callback) => {
  const nombre = args.nombre;
  const query = "SELECT id_alumno, nombre, curso, nota FROM prueba.alumnos WHERE nombre LIKE ? OR apellido LIKE ?";
  connection.query(query, [`%${nombre}%`, `%${nombre}%`], (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos: ', error);
      callback(error);
    } else {
      const alumnos = results.map(({ id_alumno, nombre, curso, nota }) => ({
        id_alumno: id_alumno.toString(),
        nombre,
        curso,
        nota: nota.toString()
      }));
      callback(null, { alumnos });
    }
  });
};

//const xml = fs.readFileSync('consultarAlumnos.wsdl', 'utf8');
const path = require('path');
const xml = fs.readFileSync(path.resolve(__dirname, 'consultarAlumnos.wsdl'), 'utf8');

const server = soap.listen(require('http').createServer((req, res) => {
  res.end('404: Not Found: ' + req.url);
}), '/consultar_alumnos', xml, (service, port) => {
  port.on('consultarAlumnos', consultarAlumnos);
});

server.log = (type, data) => {
  console.log(type + ': ' + data);
};

server.listen(3555, () => {
  console.log('Servidor SOAP escuchando en el puerto 3555');
});
