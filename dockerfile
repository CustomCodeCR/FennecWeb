# Etapa de desarrollo - Instalación de dependencias
FROM node:24.6.0 AS dev-deps
WORKDIR /app
RUN npm install -g pnpm 
COPY package.json pnpm-lock.yaml ./
RUN pnpm install 

# Etapa de construcción - Compilación de la aplicación
FROM dev-deps AS builder
COPY . .
RUN pnpm run build 

# Etapa de producción - Servidor Nginx
FROM nginx:1.23.3
EXPOSE 80
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]