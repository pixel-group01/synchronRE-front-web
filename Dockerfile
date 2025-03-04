# Étape 1 : Build Angular
FROM node:18 AS build-stage

WORKDIR /app

# Copier seulement les fichiers nécessaires pour installer les dépendances
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copier le reste du code
COPY . .

# Exécuter la commande de build
RUN npm run build -- --configuration=production --output-path=dist

# Étape 2 : Création de l'image finale avec Nginx
FROM nginx:1.23-alpine AS production-stage

# Supprimer la configuration par défaut de Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers nécessaires dans l'image finale
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exposer le port 80 pour Nginx
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
