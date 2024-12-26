#!/bin/bash

# Cargar las variables desde el archivo .env
export $(grep -v '^#' .env | xargs)

# Comprobar si las variables están establecidas
if [ -z "$DB_HOST" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ] || [ -z "$DB_DATABASE" ]; then
  echo "Error: Por favor, asegúrate de que el archivo .env tenga todas las variables necesarias."
  exit 1
fi

BACKUP_DIR="/var/www/animevault-typescript/backups"
# Crear un nombre de archivo para el respaldo
BACKUP_FILE="$BACKUP_DIR/${DB_DATABASE}_backup_$(date +'%Y%m%d_%H%M%S').sql"

# Hacer la copia de seguridad
mysqldump -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_DATABASE" > "$BACKUP_FILE"

# Comprobar si el comando fue exitoso
if [ $? -eq 0 ]; then
  echo "Copia de seguridad de la base de datos '$DB_DATABASE' creada exitosamente en '$BACKUP_FILE'."
else
  echo "Error al crear la copia de seguridad de la base de datos."
  exit 1
fi
