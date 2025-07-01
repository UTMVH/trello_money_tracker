# Trello Money Tracker MXN Power-Up

Un Power-Up completo para el seguimiento financiero en Trello que permite rastrear montos en pesos mexicanos (MXN) en tarjetas con cálculos automáticos de pagos usando el campo de porcentaje "Pagos".

## Características

* 💰 **Seguimiento de Montos**: Registra montos totales en MXN para cada tarjeta
* 📊 **Cálculos Automáticos**: Calcula automáticamente montos pagados y adeudados basado en el porcentaje de pagos
* 🏷️ **Badges en Tarjetas**: Indicadores visuales de montos en las tarjetas
* 📈 **Reportes de Tablero**: Reportes financieros comprehensivos para tableros completos
* 📁 **Exportar Datos**: Exporta datos de seguimiento financiero a formato CSV
* 🔄 **Actualizaciones en Tiempo Real**: Datos sincronizados y actualizaciones en vivo
* 💾 **Almacenamiento Persistente**: Todos los datos se guardan y son accesibles entre sesiones
* 📱 **Diseño Responsivo**: Funciona perfectamente en dispositivos móviles y de escritorio

## Cálculos Financieros

El Power-Up calcula automáticamente tres valores clave:

1. **Monto Total**: El monto total configurado para la tarjeta
2. **Monto Pagado**: Calculado usando el porcentaje de pagos (Monto Total × % Pagos)
3. **Monto Adeudado**: La diferencia entre el monto total y el monto pagado

## Instalación y Configuración

### Paso 1: Alojar los Archivos

Necesitas alojar estos archivos en un servidor web con HTTPS. Aquí tienes algunas opciones:

#### Opción A: GitHub Pages (Gratis)

1. Crea un nuevo repositorio en GitHub
2. Sube todos los archivos al repositorio
3. Habilita GitHub Pages en la configuración del repositorio
4. Tu Power-Up estará disponible en `https://tuusuario.github.io/tu-repo`

#### Opción B: Netlify (Gratis)

1. Regístrate en Netlify
2. Arrastra y suelta la carpeta con todos los archivos
3. Obtén tu URL única de Netlify

#### Opción C: Tu Propio Servidor Web

1. Sube los archivos a tu servidor web
2. Asegúrate de que HTTPS esté habilitado
3. Anota la URL de tu dominio

### Paso 2: Crear el Power-Up en Trello

1. Ve a [Trello Power-Up Admin](https://trello.com/power-ups/admin)
2. Haz clic en "Create new Power-Up"
3. Completa los detalles:
   * **Name**: Trello Money Tracker MXN
   * **Workspace**: Selecciona tu workspace
   * **iframe Connector URL**: `https://tu-dominio.com/index.html`

### Paso 3: Configurar Capacidades

En el panel de administración del Power-Up, habilita estas capacidades:

* ✅ card-badges
* ✅ card-buttons
* ✅ board-buttons

### Paso 4: Habilitar en tu Tablero

1. Ve a cualquier tablero de Trello en tu workspace
2. Haz clic en "Power-Ups" en el menú del tablero
3. Encuentra "Trello Money Tracker MXN" y haz clic en "Enable"

## Cómo Usar

### Configurar Monto de una Tarjeta

1. Abre cualquier tarjeta
2. Haz clic en el botón "Money Tracker"
3. En la sección "Configurar Monto":
   * Ingresa el monto total en MXN (ej. 1500, $2,500.50)
   * Ingresa el porcentaje de pagos (ej. 25.5)
   * Haz clic en "Actualizar Información"

### Formatos de Entrada de Dinero Aceptados

El Power-Up acepta formatos flexibles de dinero:

* `1500` - 1500 pesos
* `$2,500.50` - 2,500.50 pesos con símbolo y comas
* `1500.75` - 1500.75 pesos con decimales
* `$1,500 MXN` - Con símbolo de moneda y denominación

### Ver Reportes Financieros

1. Desde cualquier tablero, haz clic en el botón "Money Report" en el menú superior
2. Ve estadísticas de resumen para todo el tablero:
   * Monto total de todas las tarjetas
   * Total pagado calculado
   * Total adeudado
   * Porcentaje promedio de pagos
3. Ve el desglose detallado por tarjeta
4. Filtra por estado de pago
5. Ordena por diferentes criterios
6. Exporta datos a CSV para análisis externos

### Integración con Campo "Pagos"

El Power-Up está diseñado para trabajar con un campo personalizado llamado "Pagos" que ya existe en tus tarjetas. Si este campo contiene un porcentaje, el Power-Up lo usará automáticamente para calcular los montos pagados y adeudados.

## Estructura de Archivos

```
TrelloMoneyTracker/
├── index.html              # Conector principal del Power-Up
├── money-tracker.html      # Interfaz de seguimiento financiero
├── money-report.html       # Popup de reporte financiero
├── js/
│   └── client.js          # Lógica principal del Power-Up
├── styles.css             # Todos los estilos
├── manifest.json          # Metadatos del Power-Up
├── LICENSE               # Licencia MIT
└── README.md            # Este archivo
```

## Detalles Técnicos

### Almacenamiento de Datos

El Power-Up usa el sistema de almacenamiento integrado de Trello:

* Los datos se almacenan por tarjeta usando `t.set()` y `t.get()`
* Ámbito de almacenamiento: `'shared'` (visible para todos los miembros del tablero)
* Clave de almacenamiento: `'moneyTracker'`

### Estructura de Datos

Los datos financieros de cada tarjeta se almacenan como:

```json
{
  "totalAmount": 5000.00,           // Monto total en MXN
  "paymentsPercentage": 25.5,       // Porcentaje de pagos
  "history": [                      // Array de entradas del historial
    {
      "date": "2024-01-01T12:00:00.000Z",
      "amount": 5000.00,
      "paymentsPercentage": 25.5,
      "description": "Actualización: $5,000.00 MXN, 25.5% pagado"
    }
  ]
}
```

### Compatibilidad del Navegador

* Navegadores modernos con soporte ES6+
* Requiere HTTPS para la integración con Trello Power-Up
* Funciona en dispositivos de escritorio y móviles

## Personalización

### Cambiar Colores

Edita `styles.css` para modificar el esquema de colores:

* Azul primario: `#0079bf`
* Verde de éxito: `#00875a`
* Naranja de advertencia: `#ff8b00`
* Rojo de peligro: `#de350b`

### Agregar Características

La estructura modular facilita agregar características:

1. Agrega nuevas capacidades en `js/client.js`
2. Crea interfaces HTML correspondientes
3. Actualiza la lista de capacidades en el admin del Power-Up

### Modificar Formatos de Moneda

Actualiza la función `parseMoneyInput()` en `js/client.js` para soportar formatos de moneda adicionales.

## Solución de Problemas

### El Power-Up No Carga

* Asegúrate de que tus archivos estén alojados con HTTPS
* Verifica la consola del navegador para errores
* Confirma que la URL del iframe Connector sea correcta

### Los Datos No Se Guardan

* Verifica que el Power-Up tenga los permisos apropiados
* Revisa la consola del navegador para errores de almacenamiento
* Asegúrate de estar probando en el workspace correcto

### Los Cálculos Son Incorrectos

* Verifica que los porcentajes estén en el rango 0-100
* Confirma que los montos sean números válidos
* Revisa que el campo "Pagos" contenga valores numéricos

### Problemas Comunes

1. **Errores CORS**: Asegúrate de que tu hosting soporte CORS para dominios de Trello
2. **Contenido Mixto**: Garantiza que todos los recursos se sirvan por HTTPS
3. **Límites de Almacenamiento**: Trello tiene límites de almacenamiento por Power-Up por tarjeta

## Contribuir

¡Las contribuciones son bienvenidas! Para contribuir:

1. Haz fork del repositorio
2. Crea una rama de características
3. Realiza tus cambios
4. Prueba exhaustivamente
5. Envía un pull request

## Licencia

Este proyecto es open source y está disponible bajo la Licencia MIT.

## Soporte

Para soporte:

1. Revisa la sección de solución de problemas anterior
2. Consulta la documentación de Power-Ups de Trello
3. Abre un issue en este repositorio

## Registro de Cambios

### Versión 1.0.0

* Lanzamiento inicial
* Seguimiento básico de montos en MXN
* Cálculos automáticos de pagos
* Badges en tarjetas
* Reportes de tablero
* Exportación CSV
* Diseño responsivo
* Integración con campo "Pagos"
* Historial de cambios
* Filtros y ordenamiento en reportes

---

**Nota**: Este Power-Up requiere un workspace de Trello para instalarse y usarse. El Power-Up solo estará disponible para tableros dentro del workspace donde esté instalado.

## Acerca de

Power-Up para el seguimiento de montos en MXN en tarjetas de Trello con cálculos automáticos de pagos.

### Recursos

* README
* Licencia MIT

### Idiomas

* HTML 60%
* CSS 25%
* JavaScript 15% 