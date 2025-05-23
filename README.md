# 🍌 BananaShare - Backend

Backend du projet **BananaShare**, un service de transfert de fichiers local, inspiré de WeTransfer, développé pour être hébergé sur un NAS avec gestion temporaire et permanente des fichiers.

## 🧩 Stack technique

- Node.js (Express)
- Architecture MVC : `routes`, `controllers`, `services`, `middlewares`, `utils`
- Multer pour les uploads
- Axios pour les appels internes / externes

## 📁 Arborescence

```text
Backend-BananaShare/
│
├── src/
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   ├── models/
│   ├── utils/
│   └── config/
│
├── uploads/           # Dossier où les fichiers sont stockés
├── .env               # Variables d’environnement (non incluses)
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Installation

```bash
git clone https://github.com/bananestar/Backend-BananaShare.git
cd Backend-BananaShare
npm install
```

## 🧪 Lancement local

```bash
npm run dev
```

## 🔐 Exemple de fichier .env

```env
# Configuration du serveur
PORT=3000
BASE_URL=http://localhost:3000

# Base de données PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_URL=

# Répertoire de stockage temporaire
UPLOAD_DIR=./uploads

# JWT
JWT_SECRET=unBonGrosSecretBienRandom123!

# Durée de vie des fichiers (en jours)
FILE_TTL_DAYS=30
```

## 📡 Endpoints de base

- `POST /api/upload` — Upload de fichier
- `GET /api/files/:id` — Accès via lien court
- `GET /api/files` — Liste des fichiers (si activé)
- `DELETE /api/files/:id` — Suppression

## 📘 Documentation Swagger

La documentation de l'API est disponible via Swagger UI :

- **URL** : `http://localhost:3000/api-docs`

Swagger est alimenté par un fichier `swagger.yaml` situé à la racine du projet :

```bash
/docs/swagger.yaml
```

Le chargement se fait ainsi dans `app.js` :

```js
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

---

Made with ❤️ by BananaCorp
