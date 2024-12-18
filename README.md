<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## TEST MODULO 5

```bash
# Pruebas UNITARIAS, INTEGRACION Y ACEPTACION SÓLO EN EL MODULO ROLES
$ npm run test:roles

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# DIPLOMADO BACKEND TIENDA API

1. Clonar proyecto
2. ```npm install```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
4. Cambiar las variables de entorno
5. Levantar la base de datos
```
docker-compose up -d
```

6. Levantar: ```npm run start:dev```

# DOCUMENTACION BACKEND TIENDA API
1. Ver dicumentación de API en: ```http://localhost:3000/api```

# EJEMPLOS DOCUMENTACION BACKEND TIENDA API

2. USUARIOS
[ ADMIN ]
Creacion de usuario
```
POST /usuarios/register 
{
    "email":"carlos@gmail.com",
    "password":"Carlos1234",
    "nombres":"carlos vedia",
    "roles":["ADMIN"]
}
```
Login
```
POST /usuarios/login 
{
    "email":"carlos@gmail.com",
    "password":"Carlos1234",
}
```
# Estructura Relacional de Base de Datos
<p align="center">
  <a href="./assets/tiendaDiplomadoDB - public.png" target="blank"><img src="./assets/tiendaDiplomadoDB - public.png" width="450" alt="tiendaDiplomadoDB" /></a>
</p>

