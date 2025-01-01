# Usa una imagen base de Python
FROM python:3.12.8

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo de requisitos
COPY backend/requirements.txt .

# Instalar las dependencias directamente
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto de los archivos de la aplicación
COPY backend .

# Instalar uvicorn para ejecutar FastAPI
RUN pip install uvicorn

# Instalar ping utility
RUN apt-get update && apt-get install -y iputils-ping && rm -rf /var/lib/apt/lists/*

# Exponer el puerto que usará FastAPI
EXPOSE 8000

# Comando para ejecutar la aplicación en modo desarrollo con Uvicorn
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
