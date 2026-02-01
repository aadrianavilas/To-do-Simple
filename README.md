# Django CRUD React - Task Manager

Una aplicación web para gestionar tareas (To-Do) con un backend construido en Django REST Framework y un frontend moderno con React + Vite.

## 📋 Descripción del Proyecto

Este proyecto es una aplicación de gestión de tareas que permite crear, leer, actualizar y eliminar tareas (CRUD). Las tareas pueden ser marcadas como completadas y filtradas según su estado.

## 🛠️ Tecnologías Utilizadas

### Backend
- **Django 5.2.3** - Framework web Python
- **Django REST Framework** - API REST
- **drf-spectacular** - Generación de documentación OpenAPI
- **django-cors-headers** - Manejo de CORS
- **SQLite** - Base de datos

### Frontend
- **React 19.1.0** - Biblioteca de UI
- **Vite** - Build tool y servidor de desarrollo
- **React Router 7.6.3** - Enrutamiento
- **Axios** - Cliente HTTP
- **React Hook Form** - Manejo de formularios
- **Tailwind CSS 4.1.11** - Estilos CSS
- **React Hot Toast** - Notificaciones

### Herramientas de Desarrollo
- **ESLint** - Linting de código

## 📁 Estructura del Proyecto

```
DJANGO_CRUD_REACT/
├── manage.py                    # Script de gestión de Django
├── db.sqlite3                   # Base de datos SQLite
├── README.md                    # Este archivo
│
├── django_crud_api/             # Configuración principal de Django
│   ├── settings.py              # Configuración del proyecto
│   ├── urls.py                  # URLs principales
│   ├── asgi.py                  # Configuración ASGI
│   ├── wsgi.py                  # Configuración WSGI
│   └── __pycache__/
│
├── tasks/                       # Aplicación Django para tareas
│   ├── models.py                # Modelo Task
│   ├── views.py                 # ViewSet de tareas
│   ├── serializer.py            # Serializador de tareas
│   ├── urls.py                  # URLs de la app tasks
│   ├── admin.py                 # Configuración de admin
│   ├── apps.py                  # Configuración de la app
│   ├── tests.py                 # Tests
│   ├── migrations/              # Migraciones de BD
│   └── __pycache__/
│
└── client/                      # Aplicación React con Vite
    ├── package.json             # Dependencias de npm
    ├── vite.config.js           # Configuración de Vite
    ├── eslint.config.js         # Configuración de ESLint
    ├── index.html               # HTML principal
    ├── README.md                # Documentación del frontend
    ├── public/                  # Archivos estáticos públicos
    └── src/                     # Código fuente React
        ├── main.jsx             # Punto de entrada
        ├── App.jsx              # Componente principal
        ├── App.css              # Estilos globales
        ├── index.css            # Estilos de índice
        ├── api/
        │   └── tasks.api.js     # Llamadas a API
        ├── assets/              # Imágenes y assets
        ├── components/          # Componentes reutilizables
        │   ├── Navigation.jsx
        │   ├── TaskCard.jsx
        │   └── TasksList.jsx
        └── pages/               # Páginas/vistas
            ├── TasksPage.jsx
            └── TaskFormPage.jsx
```

## 🚀 Inicio Rápido

### Requisitos Previos
- Python 3.8 o superior
- Node.js 18 o superior
- npm o yarn

### Instalación del Backend

1. **Clonar el repositorio y navegar a la carpeta del proyecto:**
```bash
cd DJANGO_CRUD_REACT
```

2. **Crear un entorno virtual:**
```bash
python -m venv venv
```

3. **Activar el entorno virtual:**

En Windows:
```bash
venv\Scripts\activate
```

En macOS/Linux:
```bash
source venv/bin/activate
```

4. **Instalar dependencias de Python:**
```bash
pip install django djangorestframework drf-spectacular django-cors-headers
```

5. **Aplicar migraciones:**
```bash
python manage.py migrate
```

6. **Crear un superusuario (opcional):**
```bash
python manage.py createsuperuser
```

7. **Ejecutar el servidor de desarrollo:**
```bash
python manage.py runserver
```

El backend estará disponible en `http://localhost:8000`

### Instalación del Frontend

1. **Navegar a la carpeta del cliente:**
```bash
cd client
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar el servidor de desarrollo:**
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 📡 API REST - Endpoints

### Base URL
```
http://localhost:8000/api/
```

### Tareas (Tasks)

#### 1. Listar todas las tareas
```
GET /tasks/
```

**Parámetros de consulta:**
- `done` (opcional): Filtrar por estado completado
  - `true` - Solo tareas completadas
  - `false` - Solo tareas pendientes

**Ejemplo:**
```bash
GET /tasks/?done=false
```

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Aprender Django",
    "description": "Estudiar Django REST Framework",
    "done": false
  }
]
```

#### 2. Obtener una tarea específica
```
GET /tasks/{id}/
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "title": "Aprender Django",
  "description": "Estudiar Django REST Framework",
  "done": false
}
```

#### 3. Crear una nueva tarea
```
POST /tasks/
Content-Type: application/json

{
  "title": "Nueva tarea",
  "description": "Descripción opcional",
  "done": false
}
```

**Respuesta (201 Created):**
```json
{
  "id": 2,
  "title": "Nueva tarea",
  "description": "Descripción opcional",
  "done": false
}
```

#### 4. Actualizar una tarea
```
PUT /tasks/{id}/
Content-Type: application/json

{
  "title": "Tarea actualizada",
  "description": "Nueva descripción",
  "done": true
}
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "title": "Tarea actualizada",
  "description": "Nueva descripción",
  "done": true
}
```

#### 5. Actualización parcial de una tarea
```
PATCH /tasks/{id}/
Content-Type: application/json

{
  "done": true
}
```

#### 6. Eliminar una tarea
```
DELETE /tasks/{id}/
```

**Respuesta (204 No Content)**

## 💾 Modelo de Base de Datos

### Task
```python
class Task(models.Model):
    title = CharField(max_length=200)          # Título de la tarea
    description = TextField(blank=True)        # Descripción (opcional)
    done = BooleanField(default=False)         # Estado de completado
```

## 🔧 Configuración del Backend

### CORS (Cross-Origin Resource Sharing)

La aplicación está configurada para aceptar solicitudes desde el cliente React. En producción, debe configurarse correctamente en `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # Si se usa puerto diferente
]
```

### Variables de Entorno

En desarrollo, puedes configurar variables en un archivo `.env`:
```
DEBUG=True
SECRET_KEY=tu-clave-secreta
ALLOWED_HOSTS=localhost,127.0.0.1
```

## 📚 Documentación de API

La API incluye documentación interactiva gracias a `drf-spectacular`. Accede a:

- **Swagger UI**: `http://localhost:8000/api/schema/swagger-ui/`
- **ReDoc**: `http://localhost:8000/api/schema/redoc/`
- **OpenAPI Schema**: `http://localhost:8000/api/schema/`

## 🧪 Testing

Para ejecutar los tests del backend:
```bash
python manage.py test
```

Para ejecutar el linting del frontend:
```bash
cd client
npm run lint
```

## 🏗️ Build para Producción

### Backend
```bash
python manage.py collectstatic
```

### Frontend
```bash
cd client
npm run build
```

Los archivos compilados estarán en `client/dist/`

## 📝 Notas Importantes

- El proyecto está en modo `DEBUG=True` para desarrollo
- La base de datos usa SQLite, suficiente para desarrollo pero no recomendado para producción
- Se debe cambiar `SECRET_KEY` en producción
- Configurar `ALLOWED_HOSTS` correctamente en producción
- Las solicitudes CORS están habilitadas para desarrollo

## 🔐 Seguridad

Antes de pasar a producción:
1. Cambiar `SECRET_KEY` en `settings.py`
2. Establecer `DEBUG = False`
3. Configurar `ALLOWED_HOSTS` con los dominios reales
4. Usar una base de datos más robusta (PostgreSQL, MySQL)
5. Implementar autenticación/autorización si es necesario
6. Usar HTTPS
7. Restringir CORS a orígenes específicos

## 📞 Contacto y Soporte

Si encuentras problemas o tienes sugerencias, siéntete libre de reportarlos.

## 📄 Licencia

Este proyecto es de código abierto y puede ser utilizado libremente.

---

**Última actualización**: Febrero 2026
