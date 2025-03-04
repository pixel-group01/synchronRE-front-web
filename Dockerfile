# Spécifie une version stable et compatible de Node.js
FROM node:18-alpine

# Définit le dossier de travail
WORKDIR /app

# Copie uniquement les fichiers de dépendances pour optimiser le cache Docker
COPY package*.json ./

# Installe les dépendances
RUN npm install --legacy-peer-deps

# Copie les fichiers restants
COPY . .

# Build du projet (si Angular ou React)
RUN npm run build

# Exposition du port
EXPOSE 80

# Commande de lancement
CMD ["npm", "start"]
