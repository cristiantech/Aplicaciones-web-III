# Aplicaciones Web III

### Objetivo
Comprender y aplicar los conceptos fundamentales de administración y persistencia de datos en el contexto de las aplicaciones web. Los estudiantes serán capaces de administrar bases de datos utilizando tecnologías como PostgreSQL y Docker, comprendiendo los aspectos clave de la configuración, gestión y despliegue de entornos de bases de datos.

### Programa de Estudio de la Asignatura (PEA)

#### Administración y Persistencia de Datos
+ OOP Conceptos
+ Introducción a PostgreSQL y su importancia en las aplicaciones web.
+ Configuración y gestión de bases de datos PostgreSQL.
+ Uso de Docker para el despliegue y la gestión de entornos de desarrollo con PostgreSQL.
+ vercel
  + Registrarse con la cuenta de Git HUB
  + Debe estar en rama main o master
  + Realizar un merge desde la rama principal a la rama en que estemos trabajando
  + Generar una carpeta API y mover nuestros archivos
  + Todas las rutas deben emezar con API
  + debemos ller el puerto de una variable de ambiente
  + Creamos el archivo vercel.js
    ```SH
    {
      "rewrites":[{
          "source": "/api/(.*)",
          "destination": "/api"
        }
      ]
    }

    ```
#### Esencialidades de ORM con Sequelize

#### Gestión y administración de consultas
#### Fundamentos de Autenticación y Autorización
#### Autenticación Passport y JSON Web Tokens
#### Gestión y Administración de Mail
#### Microservicios en NODE JS
#### Despliegue a producción en servidor sin servidor (serverless)

