# Shipping

[![node version](https://img.shields.io/badge/node-v12.22.1-brigthgreen.svg)](https://nodejs.org/en/)

[![mysql version](https://img.shields.io/badge/mysql-v5.6-brigthgreen.svg)](https://dev.mysql.com/doc/refman/5.6/en/)

## Base De Datos

En el archivo [config/db.js](./src/config/db.js) se encuentra la configuración de la base de datos en especifico las credenciales y parámetros de conexión, este ya cuenta con parámetros por defecto pero deben ser editados en caso de contar con credenciales o parámetros diferentes, su estructura es la siguiente

```javascript
{
	host: "", 
    port: "3306", 
    user: "", 
    password: "", 
    db: "ct_shippings"
}
```

La base de datos y la tabla son creadas automáticamente al correr el servidor de **node** en caso de que no existan previamente, esto se realiza en el [script de inicialización](./src/database.js) de **sequelize**.

## Iniciar servidor

Si es la primera vez que se corre el proyecto se debe ejecutar el siguiente comando para instalar las dependencias necesarias.

```bash
# Instalar dependencias

npm install
```

Para Iniciar el Servidor de **node** basta con ejecutar el siguiente comando desde la carpeta raíz del repositorio.

```bash
# Ejecutar servidor

npm start
```

## API

### Crear envió

Registra un envío en la base de datos

**Petición HTTP:** `POST <host>/api/v1/shipping`

**Parámetros JSON**

Parámetro | Requerido | Descripción 
----------|-----------|------------
customer  | SI        | Nombre del cliente
descrip | SI | Descripción del envío 
origin_lat | SI | Latitud de origen 
origin_long | SI | Longitud de destino 
end_lat | SI | Latitud de entrega 
end_lat | SI | Longitud de destino

```json
{
    "customer": "Fernando González",
    "descrip": "Silla y mesa de madera",
    "origin_lat": 19.252402, 
    "origin_long": -103.720323,
    "end_lat": 20.674894, 
    "end_long": -103.405013
}
```

**Respuesta**

Código HTTP de Respuesta: `201` o en caso de error `400`

Mensaje de respuesta ala petición

Parámetro | Descripción 
----------|-------------
response  | Mensaje de respuesta a la petición 
id | id del nuevo envío creado, solo esta presente si no hay ningún error 

Existen dos posibles respuestas el primer caso es para las peticiones realizadas correctamente y el segundo es para los casos de error.

```json
{
    "response": "Shipping 1 created",
    "id": 1
}
```



```json
{
    "response": "Error to create Shipping"
}
```

### Actualizar envió

Permite actualizar la latitud y longitud de la ubicación actual de un envío, así como el estatus del mismo.

**Petición HTTP:** `PUT <host>/api/v1/shipping/<id>`

**Parámetros URL**

Parámetro | Requerido | Descripción 
----------|-----------|------------
id        | SI        | id del envío 

**Parámetros JSON**

Parámetro | Requerido | Descripción 
----------|-----------|------------
current_lat  | NO      | Latitud de la ubicación actual                               
current_long | NO | Longitud de destino                                          
status | NO | Estatus del envío<br/>Valores aceptables<br/>son:<br/>Pendiente<br/>En proceso<br/>Entregado 



```json
{
    "current_lat": 20.674894, 
    "current_long": -103.405013,
    "status": "Entregado"
}
```

**Respuesta**

Código HTTP de Respuesta: `200` o en caso de error `400`

Parámetro | Descripción 
----------|-------------
 response  | Mensaje de respuesta a la petición 

Existen dos posibles respuestas el primer caso es para las peticiones realizadas correctamente y el segundo es para los casos de error.

```json
{
    "response": "Shipping 1 updated"
}
```

```json
{
    "response": "Error to Update Shipping 1"
}
```

### Ver estatus del envío:

Retorna el cliente, descripción, estatus y distancia aproximada de entrega.

**Petición HTTP:** `GET <host>/api/v1/shipping/<id>`

**Parámetros URL**

Parámetro | Requerido | Descripción 
----------|-----------|------------
id        | SI        | id del envió 

**Respuesta**

Código HTTP de Respuesta: `200`

Parámetro | Descripción 
----------|-------------
 response  | Mensaje de respuesta a la petición 
 data      | Datos del envió en cuestión 

 Parámetros anidados en **Data**

| Parámetro      | Descripción                                                  |
| -------------- | ------------------------------------------------------------ |
| customer       | Nombre del cliente                                           |
| descrip        | Descripción del envío                                        |
| status         | Estatus del envío<br/>Valores aceptables<br/>son:<br/>Pendiente<br/>En proceso<br/>Entregado |
| aprox_distance | distancia aproximada<br/>al destino en KM con<br/>respecto a la posición<br/>actual |

Existen dos posibles respuestas el primer caso es para las peticiones realizadas correctamente y el segundo es para los casos de error.

```json
{
    "response": "OK",
    "data": {
    	"customer": "Fernando González",
    	"descrip": "Silla y mesa de madera",
        "status": "En Proceso",
        "aprox_distance": 85.07
    }
}
```

```json
{
    "response": "Shipping 1 not valid"
}
```

**Nota:** Para fines de desarrollo fue tomado como parametro host `127.0.0.1:3000`
