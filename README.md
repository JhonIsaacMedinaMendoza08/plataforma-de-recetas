# 📚 Plataforma de Recetas Culinarias

API REST desarrollada con **Node.js**, **Express** y **MongoDB** (driver oficial) para la gestión de usuarios, recetas e ingredientes.  
Permite registrar usuarios, añadir recetas, gestionar ingredientes, buscar recetas por ingrediente y obtener las recetas creadas por un usuario.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB (driver oficial)
- Dotenv
- Nodemon (desarrollo)

---

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JhonIsaacMedinaMendoza08/plataforma-de-recetas

# Entrar al proyecto
cd plataforma-de-recetas

# Instalar dependencias
npm install
```

---

## ⚙️ Variables de entorno

En la raíz del proyecto, crear un archivo `.env` con el siguiente contenido:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017
MONGODB_DBNAME=recetas_db
NODE_ENV=development
```

---

## 🗄️ Dataset de prueba

Para cargar datos iniciales (6 usuarios y 10 recetas con ingredientes):

```bash
node src/config/dataset.js
```

---

## ▶️ Ejecución

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

---

## 📌 Endpoints

### 1️⃣ Usuarios (`/api/users`)

| Método | Endpoint                     | Descripción                                        | Body (JSON) |
|--------|------------------------------|----------------------------------------------------|-------------|
| GET    | `/api/users`                 | Listar todos los usuarios                          | -           |
| GET    | `/api/users/get/:id`         | Obtener un usuario por su ID                       | -           |
| POST   | `/api/users/create`          | Crear un nuevo usuario                             | `{ "fullName": "Juan Pérez", "email": "juan@example.com" }` |
| PATCH  | `/api/users/patch/:id`       | Actualizar datos de un usuario                     | `{ "fullName": "Nuevo Nombre" }` |
| DELETE | `/api/users/delete/:id`      | Eliminar usuario y sus recetas asociadas           | -           |

---

### 2️⃣ Recetas (`/api/recipes`)

| Método | Endpoint                           | Descripción                                    | Body (JSON) |
|--------|-------------------------------------|------------------------------------------------|-------------|
| GET    | `/api/recipes/get`                     | Listar todas las recetas                       | -           |
| GET    | `/api/recipes/getrecipe/:id`                  | Obtener una receta por su ID                   | -           |
| GET    | `/api/userS/:userId/recipes`        | Listar recetas de un usuario específico        | -           |
| GET    | `/api/recipes/search?ingredient=pollo` | Buscar recetas que contengan un ingrediente    | -           |
| POST   | `/api/recipes/create`                     | Crear una receta                               | `{ "userId": "<id_usuario>", "title": "Título", "description": "Descripción" }` |
| PATCH  | `/api/recipes/:id`                  | Actualizar título o descripción de una receta  | `{ "title": "Nuevo título" }` |
| DELETE | `/api/recipes/delete/:id`                  | Eliminar receta                                | -           |

---

### 3️⃣ Ingredientes (`/api/ingredients`)

| Método | Endpoint                                                    | Descripción                                     | Body (JSON) |
|--------|--------------------------------------------------------------|-------------------------------------------------|-------------|
| GET    | `/api/ingredients/get/recipeId:`                         | Listar ingredientes de una receta               | -           |
| POST   | `/api/ingredients/post/recipeId`                         | Agregar un ingrediente                          | `{ "name": "tomate" }` |
| DELETE | `/api/ingredients/:recipeId/delete/:ingredientId`           | Eliminar un ingrediente por ID                  | -           |

---

# Gestión de usuarios
## 🛠️ Ejemplos con cURL
### 1. Crear usuario
```bash
curl -X POST http://localhost:4000/api/users -H "Content-Type: application/json" -d '{"fullName":"Pedro López","email":"pedro@example.com"}'
```
- Resultado
```bash
{
	"_id": "689d24a4350b12e707c08310",
	"fullName": "Pedro López",
	"email": "pedro@example.com",
	"createdAt": "2025-08-13T23:49:56.218Z",
	"updatedAt": "2025-08-13T23:49:56.218Z"
}
```

### 2. Consultar la lista de todos los usuarios registrados.
```bash
curl -X GET http://localhost:4000/api/users
```
- Resultado
```bash
[
	{
		"_id": "689e7ba0d384425b6802d896",
		"fullName": "Juan Pérez",
		"email": "juan@example.com",
		"createdAt": "2025-08-15T00:13:20.606Z",
		"updatedAt": "2025-08-15T00:13:20.606Z"
	},
	{
		"_id": "689e7ba0d384425b6802d897",
		"fullName": "Ana Gómez",
		"email": "ana@example.com",
		"createdAt": "2025-08-15T00:13:20.606Z",
		"updatedAt": "2025-08-15T00:13:20.606Z"
	},
	{
		"_id": "689e7ba0d384425b6802d898",
		"fullName": "Carlos Ruiz",
		"email": "carlos@example.com",
		"createdAt": "2025-08-15T00:13:20.606Z",
		"updatedAt": "2025-08-15T00:13:20.606Z"
	},
]
```

### 3. Ver la información detallada de un usuario en específico.
```bash
curl -X GET http://localhost:4000/api/users/get/689e7ba0d384425b6802d896
```
- Resultado
```bash
{
	"_id": "689e7ba0d384425b6802d896",
	"fullName": "Juan Pérez",
	"email": "juan@example.com",
	"createdAt": "2025-08-15T00:13:20.606Z",
	"updatedAt": "2025-08-15T00:13:20.606Z"
}
```



### 4. Actualizar los datos de un usuario.
```bash
curl -X PATCH http://localhost:4000/api/users/patch/689e7ba0d384425b6802d896 -H "Content-Type: application/json" -d '{"fullName":"Pedro López"}'
```
- Resultado
```bash
{
	"message": "Usuario Actualizado"
}
```

### 5. Eliminar un usuario y todas sus recetas asociadas.
```bash
curl -X DELETE http://localhost:4000/api/users/delete/6689e7ba0d384425b6802d896
```
- Resultado
```bash
{
	"message": "Usuario eliminado",
	"deletedRecipes": 1
}
```

# Gestión de recetas
## 🛠️ Ejemplos con cURL
### 1. Permitir que un usuario pueda registrar una nueva receta con su título y descripción.
```bash
curl -X POST http://localhost:4000/api/recipes/create -H "Content-Type: application/json" -d `{ "userId": "<id_usuario>", "title": "Título", "description": "Descripción" }`
```
- Resultado
```bash
{
	"_id": "689e60030d5ba00ef63322e8",
	"user": "689e7ba0d384425b6802d897",
	"title": "Tacos de Pollo",
	"description": "Tortillas rellenas de pollo sazonado",
	"ingredients": [],
	"createdAt": "2025-08-14T22:15:31.731Z",
	"updatedAt": "2025-08-14T22:15:31.731Z"
}
```

### 2. Listar todas las recetas disponibles en la plataforma.
```bash
curl -X GET http://localhost:4000/api/recipes/get
```
- Resultado
```bash
[
	{
		"_id": "689e7ba0d384425b6802d8c2",
		"user": {
			"fullName": "Luis Rodriguez",
			"email": "luis@hotmail.com"
		},
		"title": "Pollo al Horno",
		"description": "Pollo jugoso con especias",
		"ingredients": [
			{
				"_id": "689e7ba0d384425b6802d89c",
				"name": "pollo"
			},
			{
				"_id": "689e7ba0d384425b6802d89d",
				"name": "ajo"
			},
			{
				"_id": "689e7ba0d384425b6802d89e",
				"name": "paprika"
			}
		],
		"createdAt": "2025-08-15T00:13:20.606Z",
		"updatedAt": "2025-08-15T00:13:20.606Z"
	},
	{
		"_id": "689e7ba0d384425b6802d8c3",
		"user": {
			"fullName": "Ana Gómez",
			"email": "ana@example.com"
		},
		"title": "Ensalada Fresca",
		"description": "Lechuga, tomate y aguacate",
		"ingredients": [
			{
				"_id": "689e7ba0d384425b6802d89f",
				"name": "lechuga"
			},
			{
				"_id": "689e7ba0d384425b6802d8a0",
				"name": "tomate"
			},
			{
				"_id": "689e7ba0d384425b6802d8a1",
				"name": "aguacate"
			}
		],
		"createdAt": "2025-08-15T00:13:20.606Z",
		"updatedAt": "2025-08-15T00:13:20.606Z"
	}
]
```

### 3. Consultar una receta en específico con todos sus ingredientes.
```bash
curl -X GET http://localhost:4000/api/recipes/getRecipe/689e7ba0d384425b6802d8c2
```
- Resultado
```bash
{
	"_id": "689e7ba0d384425b6802d8c2",
	"user": {
		"fullName": "Luis Rodriguez",
		"email": "luis@hotmail.com"
	},
	"title": "Pollo al Horno",
	"description": "Pollo jugoso con especias",
	"ingredients": [
		{
			"_id": "689e7ba0d384425b6802d89c",
			"name": "pollo"
		},
		{
			"_id": "689e7ba0d384425b6802d89d",
			"name": "ajo"
		},
		{
			"_id": "689e7ba0d384425b6802d89e",
			"name": "paprika"
		}
	],
	"createdAt": "2025-08-15T00:13:20.606Z",
	"updatedAt": "2025-08-15T00:13:20.606Z"
}
```

### 4. Editar el título o descripción de una receta.
```bash
curl -X PATCH http://localhost:4000/api/recipes/patch/689d237f219d27adbed72e7a -H "Content-Type: application/json" -d `{ "title": "Nuevo título" }`
```
- Resultado
```bash
{
	"message": "Receta actualizada Correctamente!!"
}
```

### 5. Eliminar una receta.

```bash
curl -X DELETE http://localhost:4000/api/recipes/delete/689e7ba0d384425b6802d8c9
```
- Resultado
```bash
{
	"message": "Receta eliminada"
}
```

### 6. Listar todas las recetas que pertenecen a un usuario específico (ej. “ver todas las recetas de Juan Pérez”).
```bash
curl -X GET http://localhost:4000/api/users/689e7ba0d384425b6802d896/recipes
```
- Resultado
```bash
[
	{
		"_id": "689e7ba0d384425b6802d8c2",
		"user": "689e7ba0d384425b6802d896",
		"title": "Pollo al Horno",
		"description": "Pollo jugoso con especias",
		"ingredients": [
			{
				"_id": "689e7ba0d384425b6802d89c",
				"name": "pollo"
			},
			{
				"_id": "689e7ba0d384425b6802d89d",
				"name": "ajo"
			},
			{
				"_id": "689e7ba0d384425b6802d89e",
				"name": "paprika"
			}
		],
		"createdAt": "2025-08-15T00:13:20.606Z",
		"updatedAt": "2025-08-15T00:13:20.606Z"
	},
	{
		"_id": "689e7ba0d384425b6802d8c8",
		"user": "689e7ba0d384425b6802d896",
		"title": "Pizza Margarita",
		"description": "Pizza con salsa de tomate, mozzarella y albahaca",
		"ingredients": [
			{
				"_id": "689e7ba0d384425b6802d8b2",
				"name": "masa de pizza"
			},
			{
				"_id": "689e7ba0d384425b6802d8b3",
				"name": "salsa de tomate"
			},
			{
				"_id": "689e7ba0d384425b6802d8b4",
				"name": "mozzarella"
			},
			{
				"_id": "689e7ba0d384425b6802d8b5",
				"name": "albahaca"
			}
		],
		"createdAt": "2025-08-15T00:13:20.606Z",
		"updatedAt": "2025-08-15T00:13:20.606Z"
	}
]
```

# Gestión de ingredientes
## 🛠️ Ejemplos con cURL
### 1. Agregar ingredientes a una receta existente (cada ingrediente tendrá un nombre y estará vinculado a una receta).
```bash
curl -X POST http://localhost:4000/api/ingredients/post/689e640d025801bdf7a7c0f5 -H "Content-Type: application/json" -d `{ "name": "Manzana }`
```
- Resultado
```bash
{
	"_id": "689e640d025801bdf7a7c0f5",
	"title": "Ensalada Fresca",
	"ingredients": [
		{
			"_id": "689e640d025801bdf7a7c0f1",
			"name": "lechuga"
		},
		{
			"_id": "689e640d025801bdf7a7c0f2",
			"name": "tomate"
		},
		{
			"_id": "689e640d025801bdf7a7c0f3",
			"name": "aguacate"
		},
		{
			"_id": "689e66112fef203c5064a590",
			"name": "cebollitas"
		},
		{
			"_id": "689e795db6219c14c886272c",
			"name": "manzana"
		}
	]
}
```

### 2. Ver todos los ingredientes de una receta.
```bash
curl -X GET http://localhost:4000/api/ingredients/get/689d237f219d27adbed72e7b
```
- Resultado
```bash
{
	"recipeId": "689d237f219d27adbed72e7b",
	"title": "Ensalada Fresca",
	"ingredients": [
		{
			"name": "lechuga"
		},
		{
			"name": "tomate"
		},
		{
			"name": "aguacate"
		}
	]
}
```

### 3. Eliminar ingredientes de una receta.
```bash
curl -X DELETE http://localhost:4000/api/ingredients/689e640d025801bdf7a7c0f5/delete/689e66112fef203c5064a590
```
- Resultado
```bash
{
	"message": "Ingrediente eliminado",
	"ingredients": [
		{
			"_id": "689e640d025801bdf7a7c0f1",
			"name": "lechuga"
		},
		{
			"_id": "689e640d025801bdf7a7c0f2",
			"name": "tomate"
		},
		{
			"_id": "689e640d025801bdf7a7c0f3",
			"name": "aguacate"
		}
	]
}
```

### 4. Buscar todas las recetas que contengan un ingrediente específico (ej. “pollo” muestra todas las recetas que lo usan).
```bash
curl -X GET http://localhost:4000/api/recipes/search?ingredient=tomate
```
- Resultado
```bash
[
	{
		"_id": "689e7ba0d384425b6802d8c3",
		"user": {
			"fullName": "Ana Gómez"
		},
		"title": "Ensalada Fresca",
		"description": "Lechuga, tomate y aguacate",
		"ingredients": [
			{
				"_id": "689e7ba0d384425b6802d89f",
				"name": "lechuga"
			},
			{
				"_id": "689e7ba0d384425b6802d8a0",
				"name": "tomate"
			},
			{
				"_id": "689e7ba0d384425b6802d8a1",
				"name": "aguacate"
			}
		]
	},
	{
		"_id": "689e7ba0d384425b6802d8ca",
		"user": {
			"fullName": "Carlos Ruiz"
		},
		"title": "Hamburguesa Clásica",
		"description": "Pan, carne, lechuga, tomate y queso",
		"ingredients": [
			{
				"_id": "689e7ba0d384425b6802d8b9",
				"name": "pan de hamburguesa"
			},
			{
				"_id": "689e7ba0d384425b6802d8ba",
				"name": "carne de res"
			},
			{
				"_id": "689e7ba0d384425b6802d8bb",
				"name": "lechuga"
			},
			{
				"_id": "689e7ba0d384425b6802d8bc",
				"name": "tomate"
			},
			{
				"_id": "689e7ba0d384425b6802d8bd",
				"name": "queso cheddar"
			}
		]
	}
]
```

---
## 🧪 Notas

- Todos los IDs deben ser válidos de MongoDB (`ObjectId`).
- Los ingredientes en cada receta tienen su propio `_id` para permitir su eliminación precisa.
- Las operaciones devuelven mensajes claros en caso de error.

---

## 📹 Video demostrativo

El video de demostración mostrando el uso de todos los endpoints con Insomnia estará disponible en el README del repositorio con el siguiente formato:

```
📺 Video: [Ver en YouTube](https://youtu.be/waVjxHwNQR0)
```
