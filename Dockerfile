# Étape 1 : Build Angular
FROM node:18 AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps  # Ajout du flag --legacy-peer-deps

COPY . .
RUN npm run build -- --configuration=production --output-path=dist

# Étape 2 : Création de l'image finale avec Nginx
FROM nginx:1.23-alpine AS production-stage

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

