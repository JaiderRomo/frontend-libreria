const apiUrl = "http://localhost:8000/api.php";


// Obtener todos los libros (GET)
document.addEventListener("DOMContentLoaded", () => {
    const tablaBody = document.getElementById("tabla-body");

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let contenidoTabla = "";
            data.forEach((libro, index) => {
                contenidoTabla += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${libro.nombre}</td>
                        <td>${libro.autor}</td>
                        <td>${libro.fecha}</td>
                        <td>
                            <button onclick="editarLibro(${libro.id}, '${libro.nombre}', '${libro.autor}', '${libro.fecha}')">Editar</button>
                            <button onclick="eliminarLibro(${libro.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
            tablaBody.innerHTML = contenidoTabla;
        })
        .catch(error => console.error("Error al obtener los libros:", error));
});

// Agregar o actualizar un libro (POST / PUT)
document.getElementById("libros-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const idLibro = document.getElementById("book-id").value;
    const nuevoLibro = {
        nombre: document.getElementById("book-name").value,
        autor: document.getElementById("author-name").value,
        publicacion: document.getElementById("date").value
    };

    const metodo = idLibro ? "PUT" : "POST"; // Si hay ID, es una edición

    fetch(apiUrl, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...nuevoLibro, id: idLibro })
    })
    .then(response => response.json())
    .then(() => {
        alert("Libro guardado correctamente");
        location.reload();
    })
    .catch(error => console.error("Error al guardar el libro:", error));
});

// Editar un libro (LLENAR FORMULARIO)
function editarLibro(id, nombre, autor, publicacion) {
    document.getElementById("book-id").value = id;
    document.getElementById("book-name").value = nombre;
    document.getElementById("author-name").value = autor;
    document.getElementById("date").value = publicacion;
}

// Eliminar un libro (DELETE)
function eliminarLibro(id) {
    if (confirm("¿Seguro que quieres eliminar este libro?")) {
        fetch(`${apiUrl}?id=${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(() => {
                alert("Libro eliminado correctamente");
                location.reload();
            })
            .catch(error => console.error("Error al eliminar el libro:", error));
    }
}