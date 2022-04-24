# Library API

Necesitaras crear una cuenta en [FileStack](https://www.filestack.com/) para poder almacenar las imágenes y documentos de los libros que se vayan a crear. 

También una base de datos en mongodb, puede ser en [MongoDB](https://www.mongodb.com/) o local.

Puedes ver en el archivo .env.example las variables de entorno que se necesitan para que la aplicación funcione correctamente.

# API Endpoints

### Usuarios
<details>
<summary>Registrar una nueva cuenta</summary>

**POST** `http://localhost:3000/api/v1/user`

### Input

`{"username": "cristhian", "email": "example@example", "password": "qwertyqwerty", "firstName": "Cristhian Jossue, "lastName": "Bacusoy Holguin"}`

### Header
`createAdminPass = ${PASSWORD_TO_CREATE_ADMIN}`

Esta contraseña sirve para crear un usuario administrador.

### Output

Retorna si tiene errores las razones de porque no se ha podido crear una cuenta, si la contraseña no tiene el número sifuciente de carácteres, si el email ya existe o si el username ya existe. Si el usuario fue creado correctamente retornará un objeto con el mensaje de que ha sido creado corrrectamen y el status.

Ejemplo:

```
{
  "message": "User created correctly",
  "status": 200
}
```

</details>

<details>
<summary>Obtener usuarios</summary>

**GET** `http://localhost:3000/api/v1/user`

### Header

`Authorization=Bearer token`

### Output

Retorna un `array` de usuarios, si no se ha ingresado autentificación solo retornará usuarios administradores, si sí se ha ingresado un autentificación de un usuario admin retornar todos los usuarios admin y suscriptores.

Ejemplo:

```
[
  {
    "username": "cristhian",
    "email": "cristhianbacusoy@gmail.com",
    "firstName": "Cristhian",
    "lastName": "Bacusoy Holguín",
    "role": "admin",
    "createdAt": "2022-04-21T19:54:13.846Z",
    "updatedAt": "2022-04-21T19:59:32.617Z",
    "image": "https://www.gravatar.com/avatar/1cd7519b8bf5d532a4d7c6f68f89e566",
    "id": "6261b66587c21335946b3260"
  },
  {
    "username": "subscriber",
    "email": "subscriber@gmail.com",
    "firstName": "Another sus",
    "lastName": "Bacusoy Holguín",
    "role": "subscriber",
    "createdAt": "2022-04-21T20:32:58.431Z",
    "updatedAt": "2022-04-21T20:36:00.329Z",
    "image": "https://www.gravatar.com/avatar/8b447a23facf42c1a8bc0037d1625af9",
    "id": "6261bf7a3e8275b81b1a3404"
  },
  {
    "username": "subscribers",
    "email": "subscribers@gmail.com",
    "firstName": "Cristhian Jossue",
    "lastName": "Bacusoy Holguin",
    "role": "subscriber",
    "createdAt": "2022-04-24T18:06:55.296Z",
    "updatedAt": "2022-04-24T18:06:55.296Z",
    "image": "https://www.gravatar.com/avatar/e897809b2c902a72d456619771cbef3f",
    "id": "626591bfe4cc5867c8d19382"
  }
]
```

</details>

<details>
<summary>Obtener un único usuario</summary>

**GET** `http://localhost:3000/api/v1/user/:id`

### Header

`Authorization=Bearer token`

### Output

Retorna solo un `user object` de admin para usuarios no registrados o suscriptores. Para usuarios admin retorna un `user object` de cualquier perfil.

Ejemplo: 

```
{
  "username": "cristhian",
  "email": "cristhianbacusoy@gmail.com",
  "firstName": "Cristhian",
  "lastName": "Bacusoy Holguín",
  "role": "admin",
  "createdAt": "2022-04-21T19:54:13.846Z",
  "updatedAt": "2022-04-21T19:59:32.617Z",
  "image": "https://www.gravatar.com/avatar/1cd7519b8bf5d532a4d7c6f68f89e566",
  "id": "6261b66587c21335946b3260"
}
```

</details>

<details>
<summary>Actualizar usuario</summary>

**PUT** `http://localhost:3000/api/v1/user/:id`

### Header

`Authorization=Bearer token`

Solo puedes actualizar tu usuario o si eres admin puedas actualizar todos los usuarios.

### Input

`{"email": "example@example", "password": "qwertyqwerty", "firstName": "Cristhian Jossue, "lastName": "Bacusoy Holguin"}`

### Output

Retorna si tiene errores las razones de porque no se ha podido actualizar la cuenta. Si el usuario fue actualizado correctamente retornará un objeto con el mensaje de que ha sido actualizado correctamente.

Ejemplo:

```
{
  "message": "Successfully updated!"
}
```
</details>

<details>
<summary>Eliminar usuario</summary>

**DELETE** `http://localhost:3000/api/v1/user/:id`

### Header

`Authorization=Bearer token`

Solo puedes eliminar tu usuario o si eres admin puedas eliminar todos los usuarios.

### Output

Retorna si tiene errores las razones de porque no se ha podido eliminar la cuenta. Si el usuario fue eliminado correctamente retornará un objeto con el mensaje de que ha sido eliminado correctamente.

Ejemplo:

```
{
  "message": "User successfully deleted!"
}
```

</details>

<details>
<summary>Login</summary>

**POST** `http://localhost:3000/api/v1/user/login`

### Input

`{"email": "cristhianbacusoy@gmail.com","password": "qwertyqwerty"}`

### Output

Retorna si tiene errores las razones de porque el login no ha sido correcto, si es correcto retornará un `object` con las propiedades de `user` y `token`.

Ejemplo:

```
{
  "user": {
    "username": "cristhian",
    "email": "cristhianbacusoy@gmail.com",
    "firstName": "Cristhian",
    "lastName": "Bacusoy Holguín",
    "role": "admin",
    "createdAt": "2022-04-21T19:54:13.846Z",
    "updatedAt": "2022-04-21T19:59:32.617Z",
    "image": "https://www.gravatar.com/avatar/1cd7519b8bf5d532a4d7c6f68f89e566",
    "id": "6261b66587c21335946b3260"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYxYjY2NTg3YzIxMzM1OTQ2YjMyNjAiLCJ1c2VybmFtZSI6ImNyaXN0aGlhbiIsImlhdCI6MTY1MDgzMTU2MiwiZXhwIjoxNjUzNDIzNTYyfQ.giaRW3xywULvkZLglwhednOKg3YeU4ROcF8ZXdGe4f8"
}
```

</details>

<details>
<summary>Verificar si el token es correcto</summary>

**POST** `http://localhost:3000/api/v1/user/verifyToken`

### Input

`{"token": "theActualToken"}`

### Output

Retorna un `object` que contiene la propiedad boolean `isValid`.

Ejemplo:

```
{"isValid": true}
```

</details>

<details>
<summary>Comprobar si el email ya está tomado</summary>

**POST** `http://localhost:3000/api/v1/user/emailExists`

### Input

`{"email": "cristhianbacusoy@gmail.com"}`

### Output

Retorna un `object` que contiene la propiedad boolean `isTaken`.

Ejemplo:

```
{"isTaken": true}
```

</details>

<details>
<summary>Comprobar si el nombre de usuario ya está tomado</summary>

**POST** `http://localhost:3000/api/v1/user/usernameExists`

### Input

`{"username": "cristhian"}`

### Output

Retorna un `object` que contiene la propiedad boolean `isTaken`.

Ejemplo:

```
{"isTaken": true}
```

</details>

### Categorias

<details>
<summary>Listar categorias</summary>

**GET** `http://localhost:3000/api/v1/category`

### Output

Retorna un `array` que categorias.

Ejemplo:

```
[
  {
    "name": "cultura",
    "description": "Catergoria sobre la cultura de la humanidad",
    "createdAt": "2022-04-21T21:33:25.094Z",
    "updatedAt": "2022-04-21T21:33:25.094Z",
    "id": "6261cda5cd693bb655682e42"
  },
  {
    "name": "Vida y Salud",
    "description": "Vida y salud de nuestro tiempos.",
    "createdAt": "2022-04-21T21:41:04.982Z",
    "updatedAt": "2022-04-21T21:41:04.982Z",
    "id": "6261cf70a142b8af7d8f8e34"
  },
  {
    "name": "Fantasía",
    "description": "El género fantasía siempre ha sido uno de los más populares en la historia de la humanidad",
    "createdAt": "2022-04-22T22:34:17.796Z",
    "updatedAt": "2022-04-22T22:34:17.796Z",
    "id": "62632d69e0c664c269e1779a"
  }
]
```

</details>

<details>
<summary>Obtener una categoria una</summary>

**GET** `http://localhost:3000/api/v1/category/:id`

### Output

Retorna la categoria indicada.

Ejemplo:

```
{
  "name": "cultura",
  "description": "Catergoria sobre la cultura de la humanidad",
  "createdAt": "2022-04-21T21:33:25.094Z",
  "updatedAt": "2022-04-21T21:33:25.094Z",
  "id": "6261cda5cd693bb655682e42"
}
```

</details>

<details>
<summary>Crear una categoria</summary>

**POST** `http://localhost:3000/api/v1/category`

### Header

`Authorization=Bearer token`

### Input

`{"name": "Fantasía","description": "El género fantasía siempre ha sido uno de los más populares en la historia de la humanidad"}`

### Output

Retorna la categoría creada o errores si la categoria o ha sido creada correctamente.

Ejemplo:

```
{
  "name": "Fantasía",
  "description": "El género fantasía siempre ha sido uno de los más populares en la historia de la humanidad",
  "createdAt": "2022-04-24T20:29:28.373Z",
  "updatedAt": "2022-04-24T20:29:28.373Z",
  "id": "6265b328a5c0c707ee30ddca"
}
```

</details>

<details>
<summary>Actualizar una categoria</summary>

**PUT** `http://localhost:3000/api/v1/category/:id`

### Header

`Authorization=Bearer token`

### Input

`{"description": "Esta es otra serie"}`

### Output

Retorna la categoría actualizada.

Ejemplo:

```
{
  "name": "Fantasía",
  "description": "Esta es otra serie",
  "createdAt": "2022-04-24T20:29:28.373Z",
  "updatedAt": "2022-04-24T20:32:35.891Z",
  "id": "6265b328a5c0c707ee30ddca"
}
```

</details>

<details>
<summary>Eliminar una categoria</summary>

**DELETE** `http://localhost:3000/api/v1/category/:id`

### Header

`Authorization=Bearer token`

Solamente los usuarios administradores pueden eliminar una categoria

### Output

Retorna errores o un mensaje de exito si la categoria ha sido eliminada correctamente.

Ejemplo:

```
{
  "message": "Category successfully deleted!"
}
```

</details>

### Libros

<details>
<summary>Listar libros</summary>

**GET** `http://localhost:3000/api/v1/book`

### Output

Retorna un `array` de libros.

Ejemplo:

```
[
  {
    "title": "nuevo titulo",
    "description": "Esta es una novela de las mil y una noches, novela arabe cuento recomendado",
    "code": "9706666737",
    "category": {
      "name": "Fantasía",
      "description": "El género fantasía siempre ha sido uno de los más populares en la historia de la humanidad",
      "createdAt": "2022-04-22T22:34:17.796Z",
      "updatedAt": "2022-04-22T22:34:17.796Z",
      "id": "62632d69e0c664c269e1779a"
    },
    "user": {
      "username": "cristhian",
      "email": "cristhianbacusoy@gmail.com",
      "firstName": "Cristhian",
      "lastName": "Bacusoy Holguín",
      "role": "admin",
      "createdAt": "2022-04-21T19:54:13.846Z",
      "updatedAt": "2022-04-21T19:59:32.617Z",
      "image": "https://www.gravatar.com/avatar/1cd7519b8bf5d532a4d7c6f68f89e566",
      "id": "6261b66587c21335946b3260"
    },
    "createdAt": "2022-04-23T20:35:47.044Z",
    "updatedAt": "2022-04-23T21:06:59.698Z",
    "id": "62646323df606d1d20aea993",
    "documentUrl": "https://cdn.filestackcontent.com/F8guD6opTCK7sSpo1tHy",
    "imageUrl": "https://cdn.filestackcontent.com/apNsh3wZTUGWC2jo6tVj"
  }
]
```

</details>

<details>
<summary>Obtener un libro unico</summary>

**GET** `http://localhost:3000/api/v1/book/:id`

### Output

Retorna el libro indicado.

Ejemplo:

```
{
  "title": "nuevo titulo",
  "description": "Esta es una novela de las mil y una noches, novela arabe cuento recomendado",
  "code": "9706666737",
  "category": {
    "name": "Fantasía",
    "description": "El género fantasía siempre ha sido uno de los más populares en la historia de la humanidad",
    "createdAt": "2022-04-22T22:34:17.796Z",
    "updatedAt": "2022-04-22T22:34:17.796Z",
    "id": "62632d69e0c664c269e1779a"
  },
  "user": {
    "username": "cristhian",
    "email": "cristhianbacusoy@gmail.com",
    "firstName": "Cristhian",
    "lastName": "Bacusoy Holguín",
    "role": "admin",
    "createdAt": "2022-04-21T19:54:13.846Z",
    "updatedAt": "2022-04-21T19:59:32.617Z",
    "image": "https://www.gravatar.com/avatar/1cd7519b8bf5d532a4d7c6f68f89e566",
    "id": "6261b66587c21335946b3260"
  },
  "createdAt": "2022-04-23T20:35:47.044Z",
  "updatedAt": "2022-04-23T21:06:59.698Z",
  "id": "62646323df606d1d20aea993",
  "documentUrl": "https://cdn.filestackcontent.com/F8guD6opTCK7sSpo1tHy",
  "imageUrl": "https://cdn.filestackcontent.com/apNsh3wZTUGWC2jo6tVj"
}
```

</details>

<details>
<summary>Crear una libro</summary>

**POST** `http://localhost:3000/api/v1/book`

### Header

`Authorization=Bearer token`

### Input

Para poder crear un libro se debe hacer mediante `form-data`. Los campos necesario son los siguiente:
```
title: String,
description: String,
code: String, unique
category: ObjectID
image: image/png || image/jpeg
document: application/pdf
```

### Output

Retorna el libro creado.

Ejemplo:

```
{
  "title": "nuevo titulo",
  "description": "Esta es una novela de las mil y una noches, novela arabe cuento recomendado",
  "code": "9706666737",
  "category":"62632d69e0c664c269e1779a",
  "user": "6261b66587c21335946b3260",
  "createdAt": "2022-04-23T20:35:47.044Z",
  "updatedAt": "2022-04-23T21:06:59.698Z",
  "id": "62646323df606d1d20aea993",
  "documentUrl": "https://cdn.filestackcontent.com/F8guD6opTCK7sSpo1tHy",
  "imageUrl": "https://cdn.filestackcontent.com/apNsh3wZTUGWC2jo6tVj"
}
```

</details>

<details>
<summary>Actualizar una libro</summary>

**PUT** `http://localhost:3000/api/v1/book/:id`

### Header

`Authorization=Bearer token`

Solo puedes actualizar si eres autor del libro o usuario admin.

### Output

Retorna errores si no se pudo actulizar el libro o el libro actualizado si la petición se proceso correctamente.

</details>

<details>
<summary>Eliminar una libro</summary>

**DELETE** `http://localhost:3000/api/v1/book/:id`

### Header

`Authorization=Bearer token`

Solo puedes eliminar si eres autor del libro o usuario admin.

### Output

Retorna errores si no se pudo eliminar el libro o un mensaje de exito.

</details>

### Favoritos

<details>
<summary>Listar los favoritos de un usuario</summary>

**GET** `http://localhost:3000/api/v1/user/favorite`

### Header

`Authorization=Bearer token`

El token indica a que usuario acceder para obtener la lista.

### Output

Retorna un `object` con la propiedad de user y books. La propiedad books es un `array` dibde se encuentra los libros favoritos del usuario.

Ejemplo: 

```
{
  "user": "6261b66587c21335946b3260",
  "books": [
    {
      "title": "nuevo titulo",
      "description": "Esta es una novela de las mil y una noches, novela arabe cuento recomendado",
      "code": "9706666737",
      "category": "62632d69e0c664c269e1779a",
      "user": "6261b66587c21335946b3260",
      "createdAt": "2022-04-23T20:35:47.044Z",
      "updatedAt": "2022-04-23T21:06:59.698Z",
      "id": "62646323df606d1d20aea993",
      "documentUrl": "https://cdn.filestackcontent.com/F8guD6opTCK7sSpo1tHy",
      "imageUrl": "https://cdn.filestackcontent.com/apNsh3wZTUGWC2jo6tVj"
    }
  ],
  "createdAt": "2022-04-24T13:57:51.230Z",
  "updatedAt": "2022-04-24T13:57:51.230Z",
  "id": "6265575f8da33d71406c2b0e"
}
```

</details>

<details>
<summary>Añadir un favorito</summary>

**POST** `http://localhost:3000/api/v1/user/favorite/add`

### Header

`Authorization=Bearer token`

El token indica a que usuario se debe agregar el libro a favoritos.

### Input

`{"bookId": "62646323df606d1d20aea993"}`

### Output

Retorna si el usuario a agregado correctamente el libro a favoritos.

</details>

<details>
<summary>Eliminar un favorito</summary>

**POST** `http://localhost:3000/api/v1/user/favorite/delete`

### Header

`Authorization=Bearer token`

El token indica a que usuario se debe quitar el libro de favoritos.

### Input

`{"bookId": "62646323df606d1d20aea993"}`

### Output

Retorna si el usuario a quitado correctamente el libro de favoritos.

</details>
