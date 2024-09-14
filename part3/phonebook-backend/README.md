## Instalación

### Backend

1. Clona el repositorio:
	```sh
	git clone https://github.com/SchneiderSeba/FullStackOpenCourse.git
	cd FullStackOpenCourse/part3/phonebook-backend/BackEnd
	```

2. Instala las dependencias:
	```sh
	npm install
	```

3. Configura las variables de entorno en un archivo [`.env`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fseba_%2FDesktop%2FFullStackOpen%2Fpart3%2Fphonebook-backend%2FBackEnd%2F.dockerignore%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A3%2C%22character%22%3A0%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fseba_%2FDesktop%2FFullStackOpen%2Fpart3%2Fphonebook-backend%2FBackEnd%2Fconfig.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A0%2C%22character%22%3A27%7D%7D%5D%2C%228ce72a85-9ecd-4433-8f3f-0acdbf1bdabe%22%5D "Go to definition") (opcional):
	```env
	PORT=3000
	```

4. Inicia el servidor:
	```sh
	npm start
	```

### Frontend

1. Navega al directorio del frontend:
	```sh
	cd FullStackOpenCourse/part3/phonebook-backend
	```

2. Instala las dependencias:
	```sh
	npm install
	```

3. Inicia la aplicación:
	```sh
	npm run dev
	```

## Despliegue

### Backend

El backend se puede desplegar usando Fly.io. Asegúrate de tener el CLI de Fly.io instalado y configurado.

1. Construye y despliega la aplicación:
	```sh
	fly deploy
	```

### Frontend

El frontend se puede desplegar en cualquier servicio de hosting estático como Vercel, Netlify, o GitHub Pages.

1. Construye la aplicación:
	```sh
	npm run build
	```

2. Sube los archivos del directorio [`dist`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fseba_%2FDesktop%2FFullStackOpen%2Fpart3%2Fphonebook-backend%2Fdist%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%228ce72a85-9ecd-4433-8f3f-0acdbf1bdabe%22%5D "c:\Users\seba_\Desktop\FullStackOpen\part3\phonebook-backend\dist") al servicio de hosting de tu elección.

## Uso

### Endpoints del Backend

- `GET /api/persons`: Obtiene todos los contactos.
- `POST /api/persons`: Crea un nuevo contacto.
- `DELETE /api/persons/:id`: Elimina un contacto por ID.

### Funcionalidades del Frontend

- Agregar un nuevo contacto.
- Eliminar un contacto existente.
- Filtrar contactos por nombre.

## Tecnologías Utilizadas

### Backend

- Node.js
- Express
- MongoDB (Mongoose)
- Docker

### Frontend

- React
- Vite
- Axios

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request en GitHub.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

