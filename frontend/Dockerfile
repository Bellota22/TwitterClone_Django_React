# Establecer la imagen base
FROM node:18

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app/frontend

# Copiar los archivos del paquete y el bloqueo del paquete si están disponibles
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir el proyecto para producción
RUN npm run build

# Exponer el puerto 5000
EXPOSE 5173

# Comando para iniciar el servidor de Vite
CMD [ "npm", "run", "dev" ]