# Guía de Instalación - Charo Ruiz Dashboard

## Prerequisitos
- Node.js 16+ instalado
- Git instalado
- Cuenta de GitHub
- Cuenta de Firebase

## Paso 1: Preparar GitHub

### 1.1 Crear repositorio en GitHub
- Ir a https://github.com/new
- Nombre: `charo-ruiz-dashboard`
- Descripción: "Dashboard de gestión de ventas para Charo Ruiz"
- Privado (si es confidencial) o Público
- NO inicializar con README (ya lo tenemos)
- Crear repositorio

### 1.2 Copiar URL del repositorio
La URL será algo como: `https://github.com/tuusuario/charo-ruiz-dashboard.git`

## Paso 2: Configuración Local

### 2.1 Clonar o inicializar repositorio
```bash
# Si ya existe la carpeta charo-ruiz-dashboard
cd charo-ruiz-dashboard

# Inicializar git
git init

# Añadir repositorio remoto
git remote add origin https://github.com/tuusuario/charo-ruiz-dashboard.git

# Configurar git (primera vez)
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
```

### 2.2 Instalar dependencias
```bash
npm install
```

### 2.3 Crear archivo .env
```bash
# Crear desde template
cp .env.example .env

# Editar .env con tus credenciales de Firebase
# Usar un editor (VS Code, etc.)
```

## Paso 3: Configurar Firebase

### 3.1 Ir a Firebase Console
- https://console.firebase.google.com/
- Crear nuevo proyecto: `charo-ruiz`
- Activar Firestore, Authentication, Storage

### 3.2 Obtener credenciales
1. Ir a Project Settings (rueda de engranaje)
2. Descargar configuración del SDK web
3. Copiar valores a `.env`

### 3.3 Crear colecciones en Firestore
En Firebase Console > Firestore:
```
vendedores/
usuarios/
clientes/
pedidos/
documentos/
comentarios/
chat/
pagos/
```

### 3.4 Activar autenticación
Firebase > Authentication > Sign-in method > Habilitar Email/Password

### 3.5 Configurar Storage
Firebase > Storage > Crear bucket > Permitir subida de archivos

## Paso 4: Primer Commit

```bash
# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Initial commit: Charo Ruiz Dashboard setup"

# Enviar a GitHub
git branch -M main
git push -u origin main
```

## Paso 5: Prueba Local

```bash
# Iniciar aplicación
npm start

# Debería abrir http://localhost:3000
```

## Paso 6: Desplegar (Opcional)

### Opción A: Firebase Hosting
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Build
npm run build

# Deploy
firebase deploy
```

### Opción B: Netlify
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

## Estructura del Commit Inicial

```
.env.example
.gitignore
README.md
package.json
src/
  ├── config/
  │   └── firebase.js
  ├── services/
  │   ├── databaseService.js
  │   └── storageService.js
  ├── hooks/
  │   └── useAuth.js
  ├── utils/
  │   ├── constants.js
  │   └── helpers.js
  └── components/
  └── pages/
public/
```

## Siguientes Pasos

1. **Crear componentes React** (Login, Dashboard, etc.)
2. **Integrar servicios Firebase** en componentes
3. **Agregar rutas** con React Router
4. **Testing** con Jest/React Testing Library
5. **Deploy** a producción

## Comandos Útiles de Git

```bash
# Ver estado
git status

# Ver commits
git log --oneline

# Ver cambios
git diff

# Deshacer cambios
git reset --hard HEAD

# Crear rama para feature
git checkout -b feature/nombre-feature

# Cambiar a rama
git checkout nombre-rama

# Mergear rama
git merge nombre-rama

# Eliminar rama
git branch -d nombre-rama

# Push de rama
git push origin nombre-rama

# Pull request en GitHub (desde la web)
```

## Troubleshooting

### Error: "fatal: not a git repository"
```bash
git init
```

### Error: "Permission denied (publickey)"
Configurar SSH keys:
```bash
ssh-keygen -t ed25519 -C "tu@email.com"
# Añadir clave pública en GitHub > Settings > SSH Keys
```

### Error: ".env is not recognized"
En Windows, crear archivo desde PowerShell:
```powershell
$null | Out-File -FilePath .env
```

### Node modules grande
Añadir a .gitignore (ya está) para no subirlo

---

## Notas Importantes

✅ **Nunca commits estos archivos:**
- `.env` (variables sensibles)
- `node_modules/` (muy grande)
- `.DS_Store` (archivos del SO)
- Logs

✅ **Siempre actualiza:**
- `README.md` con cambios importantes
- `package.json` cuando añadas dependencias
- `.env.example` cuando cambie estructura

✅ **Buenas prácticas:**
- Commits pequeños y descriptivos
- Crear ramas para features
- Pull requests antes de mergear
- Revisar cambios antes de push

---

¿Preguntas? Ver README.md o crear issue en GitHub.
