# Usa una imagen base de Python
FROM python:3.12.7

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo de requisitos
COPY backend/requirements.txt .

# Instalar las dependencias directamente
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto de los archivos de la aplicación
COPY backend .

RUN apt-get update && apt-get install -y iputils-ping && rm -rf /var/lib/apt/lists/*

# Exponer el puerto que usará Flask
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["flask", "--app", "app", "run", "--debug", "--host=0.0.0.0"]
