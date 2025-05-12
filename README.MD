# Librería - Frontend

Este es el frontend del proyecto "Librería", una aplicación CRUD que permite gestionar libros (crear, leer, actualizar y eliminar). Desarrollado en HTML, CSS y JavaScript.

# Tecnologías

- HTML
- CSS
- JavaScript
- Docker + Nginx


# Instalación local con Docker

1. Clonar este repositorio:

   ```bash
   git clone https://github.com/JaiderRomo/frontend-libreria.git
   cd libreria-frontend

   
docker build -t libreria-frontend .
docker run -d -p 3000:80 libreria-frontend
