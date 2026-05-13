# Usamos una imagen estable de Node LTS (Alpine para ligereza)
FROM node:20-alpine

# Instalamos dependencias necesarias para compilar módulos nativos
RUN apk add --no-cache python3 make g++

# Definimos un directorio de trabajo claro
WORKDIR /usr/src/app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos TODAS las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto
EXPOSE 3000

# Usamos el comando de arranque definido en tu app
CMD ["node", "app.js"]