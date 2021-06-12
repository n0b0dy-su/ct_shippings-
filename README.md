# Shipping 

## Iniciar servidor

```bash
# Ejecutar

npm start
```

## API

### Crear envio

Descripcion

**Peticion HTTP:** `POST <host>/api/v1/shipping`

**Parametros JSON**

Parametro | Requerido | Descripcion
----------|-----------|------------
customer  | SI        | Nombre del cliente

**Respuesta**

Codigo HTTP de Respuesta: `201`

Parametro | Descripcion
----------|-------------
customer  | Nombre del cliente

### Actualizar envio

Descripcion

**Peticion HTTP:** `PUT <host>/api/v1/shipping/<id>`

**Parametros URL**
Parametro | Requerido | Descripcion
----------|-----------|------------
id        | SI        | id del envio

**Parametros JSON**

Parametro | Requerido | Descripcion
----------|-----------|------------
customer  | SI        | Nombre del cliente

**Respuesta**

Codigo HTTP de Respuesta: `200`

Parametro | Descripcion
----------|-------------
customer  | Nombre del cliente

### Consultar envio

Descripcion

**Peticion HTTP:** `GET <host>/api/v1/shipping/<id>`

**Parametros URL**
Parametro | Requerido | Descripcion
----------|-----------|------------
id        | SI        | id del envio

**Parametros JSON**

Parametro | Requerido | Descripcion
----------|-----------|------------
customer  | SI        | Nombre del cliente

**Respuesta**

Codigo HTTP de Respuesta: `200`

Parametro | Descripcion
----------|-------------
customer  | Nombre del cliente
