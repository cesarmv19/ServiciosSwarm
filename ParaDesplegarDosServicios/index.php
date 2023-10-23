<?php
$servername = "base-datos_base-datos"; // Nombre del servicio de base de datos en Docker Swarm
$username = "root"; // Nombre de usuario de la base de datos
$password = "root1"; // Contraseña de la base de datos
$dbname = "prueba"; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta a la tabla
$sql = "SELECT apellidos, nombres, dni FROM alumnos";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Mostrar los datos de cada fila
    while($row = $result->fetch_assoc()) {
        echo "Apellido: " . $row["apellidos"]. " - Nombre: " . $row["nombres"]. " - Dni: " . $row["dni"]. "<br>";
    }
} else {
    echo "0 resultados";
}
$conn->close();
?>

