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
</details>

<details>
<summary>Login</summary>
</details>

<details>
<summary>Verificar si el token es correcto</summary>
</details>

<details>
<summary>Comprobar si el email ya está tomado</summary>
</details>

<details>
<summary>Comprobar si el nombre de usuario ya está tomado</summary>
</details>

### Categorias

<details>
<summary>Listar categorias</summary>
</details>

<details>
<summary>Crear una categoria</summary>
</details>

<details>
<summary>Actualizar una categoria</summary>
</details>

<details>
<summary>Eliminar una categoria</summary>
</details>

### Libros

<details>
<summary>Listar libros</summary>
</details>

<details>
<summary>Crear una libro</summary>
</details>

<details>
<summary>Actualizar una libro</summary>
</details>

<details>
<summary>Eliminar una libro</summary>
</details>

### Favoritos

<details>
<summary>Listar los favoritos de un usuario</summary>
</details>

<details>
<summary>Añadir un favorito</summary>
</details>

<details>
<summary>Eliminar un favorito</summary>
</details>
