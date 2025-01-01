

def convert_date_to_int(date_data):
    """
    Convierte fecha a formato integer basado en valores disponibles:
    - Con día: YYYYMMDD (20061125)
    - Sin día: YYYYMM (200611)
    - Solo año: YYYY (2006)
    """
    try:
        if not date_data or not date_data.get('year'):
            return None
            
        year = date_data['year']
        month = date_data.get('month')
        day = date_data.get('day')
        
        # Solo año disponible
        if month is None:
            return year
            
        # Año y mes disponibles, sin día
        if day is None:
            return year * 100 + month
            
        # Fecha completa disponible
        return year * 10000 + month * 100 + day
            
    except (ValueError, TypeError) as e:
        return None