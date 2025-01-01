#!/bin/bash

# Paso 1: Obtener la zona horaria del sistema
SYSTEM_TZ=$(cat /etc/timezone)

# Paso 2: Verificar si la zona horaria ya existe o es la misma en el archivo .env
if grep -q "^TZ=" .env; then
    CURRENT_TZ=$(grep "^TZ=" .env | cut -d'=' -f2)
    
    if [ "$CURRENT_TZ" == "$SYSTEM_TZ" ]; then
        echo "La zona horaria ya está configurada y es la misma: $CURRENT_TZ"
    else
        # Si la zona horaria es diferente, actualiza el valor en el .env
        echo "Actualizando la zona horaria en .env de $CURRENT_TZ a $SYSTEM_TZ"
        sed -i "s/^TZ=.*/TZ=$SYSTEM_TZ/" .env
    fi
else
    # Si no existe TZ en el .env, agregarlo (en la última línea para evitar la duplicación)
    echo "Agregando la zona horaria al archivo .env"
    echo "TZ=$SYSTEM_TZ" >> .env
fi

# Paso 3: Verificar el contenido de .env
echo "El archivo .env ahora contiene:"
cat .env

# Paso 4: Reiniciar los contenedores de Docker con la nueva configuración de zona horaria
docker compose down
docker compose up -d

echo "Los contenedores de Docker han sido reiniciados con la nueva zona horaria."
