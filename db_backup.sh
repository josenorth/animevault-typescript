#!/bin/bash

# Variables
CONTAINER_NAME="animevault-typescript-db-1"
BACKUP_DIR="/var/www/animevault-typescript/backend/database"
TIMESTAMP=$(date +"%F_%T")
BACKUP_FILE="$BACKUP_DIR/db_backup_$TIMESTAMP.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Dump the database
docker exec -i $CONTAINER_NAME mysqldump -u root -p'jose12367' --all-databases > $BACKUP_FILE

# Check if the dump was successful
if [ $? -eq 0 ]; then
    echo "Database backup successful: $BACKUP_FILE"
else
    echo "Database backup failed"
fi