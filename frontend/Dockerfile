# Dockerfile para el Frontend
FROM node:22.12.0

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración y dependencias
COPY frontend/package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY frontend .

# Exponer el puerto que usará Vite
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]