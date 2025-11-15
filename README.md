# Examen App

Aplicación web moderna desarrollada con React, TypeScript y Vite. Esta es una aplicación de prueba que cuenta con enrutamiento, componentes reutilizables y estilos con Tailwind CSS.

**Enlace de despliegue:** https://036-f-marvin-vasquez-18xe.vercel.app/

---

## Tecnología Utilizada

### Frontend
- **React 19.2** - Biblioteca de JavaScript para construir interfaces de usuario con componentes
- **TypeScript 5.9** - Superset de JavaScript que añade tipado estático
- **Vite 7.2** - Herramienta de construcción y servidor de desarrollo de siguiente generación
- **React Router DOM 7.9** - Enrutamiento para navegación entre páginas
- **Tailwind CSS 4.1** - Framework de CSS con utilidades para estilos rápidos
- **Framer Motion 12.23** - Librería de animaciones para React
- **Lucide React 0.553** - Librería de iconos SVG
- **React Icons 5.5** - Colección de iconos populares

### Herramientas de Desarrollo
- **ESLint 9.39** - Herramienta de linting para código JavaScript/TypeScript
- **Vite Plugin React** - Plugin oficial de Vite para soporte de React con Fast Refresh (HMR)
- **Tailwind CSS Vite Plugin** - Integración optimizada de Tailwind CSS con Vite

---

## Instalación

### Requisitos Previos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Alexmavl/036-F-MarvinVasquez.git
   cd 036-F-MarvinVasquez
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Verificar la instalación:**
   ```bash
   npm run lint
   ```

---

## Desarrollo

### Iniciar el servidor de desarrollo
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

**Características:**
- Hot Module Replacement (HMR) - Los cambios se reflejan instantáneamente en el navegador
- Compilación TypeScript en tiempo real
- Linting automático

### Estructura del Proyecto
```
src/
├── components/        # Componentes reutilizables
│   ├── Footer.tsx
│   ├── Layout.tsx
│   └── Navbar.tsx
├── pages/            # Páginas de la aplicación
│   ├── Inicio.tsx
│   ├── AcercaDe.tsx
│   └── Consumo.tsx
├── services/         # Servicios y APIs
│   └── api.tsx
├── App.tsx          # Componente principal
├── main.tsx         # Punto de entrada
└── index.css        # Estilos globales
```

---

## Construcción y Despliegue

### Construir para producción
```bash
npm run build
```

Este comando:
- Ejecuta la verificación de tipos de TypeScript (`tsc -b`)
- Construye la aplicación optimizada para producción en la carpeta `dist/`

### Preview de la construcción
```bash
npm run preview
```

Visualiza cómo se vería la aplicación en producción localmente.

### Despliegue en Vercel

La aplicación está configurada para desplegarse automáticamente en Vercel. 

**Pasos para desplegar:**

1. **Conectar con Vercel:**
   - Ir a [vercel.com](https://vercel.com)
   - Iniciar sesión con GitHub
   - Importar el repositorio

2. **Configuración automática:**
   - Vercel detectará automáticamente que es un proyecto Vite + React
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Deploy:**
   - Cada push a la rama `main` disparará un despliegue automático
   - Los cambios estarán en vivo en minutos

**Despliegue actual:** https://036-f-marvin-vasquez-18xe.vercel.app/

---

## Scripts Disponibles

| Script | Descripción |
|--------|-----------|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Compila TypeScript y construye la aplicación para producción |
| `npm run preview` | Vista previa local de la construcción de producción |
| `npm run lint` | Ejecuta ESLint para verificar la calidad del código |

---

## Notas de Desarrollo

- **TypeScript**: El proyecto usa TypeScript estricto. Todos los archivos deben tener tipos correctos
- **Estilos**: Utiliza Tailwind CSS con clases de utilidad. Los estilos personalizados van en `index.css`
- **Componentes**: Los componentes deben ser funcionales y usar hooks de React cuando sea necesario
- **Animaciones**: Para animaciones, usar Framer Motion en lugar de CSS puro

---

## Autor

Marvin Vásquez

## Repositorio

[GitHub - 036-F-MarvinVasquez](https://github.com/Alexmavl/036-F-MarvinVasquez)
