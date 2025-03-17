# Amigo Secreto

Una aplicación web que permite organizar juegos de "Amigo Secreto" de manera aleatoria, no envia mensajes sino que muestra resultados en pantalla

## Características

- Permite añadir participantes
- Valida nombres (no vacíos, no duplicados, etc.)
- Realiza sorteo aleatorio asegurando que nadie se asigne a sí mismo
- Muestra el resultado del sorteo paso a paso
- Incluye botón de reinicio para comenzar un nuevo juego

## Tecnologías utilizadas

- HTML5
- CSS
- JavaScript 

## Explicación del código:

## Variables globales:

- listaAmigos: Almacena los nombres de los participantes
- parejasSorteadas: Guarda las asignaciones de amigos secretos
- indiceSorteoActual: Controla qué resultado del sorteo estamos mostrando

## Funciones principales:

- agregarAmigo(): Añade un nombre a la lista después de validarlo
- validarNombre(): Verifica que el nombre cumpla con todos los requisitos
- actualizarListaUI(): Muestra la lista actualizada en la interfaz
- eliminarAmigo(): Elimina un amigo de la lista
- sortearAmigo(): Muestra los resultados del sorteo uno por uno
- realizarSorteo(): Genera las parejas aleatorias de amigos secretos
- resetearJuego(): Reinicia todo el juego

## Validaciones:

- Comprueba que los nombres no estén vacíos
- Verifica que los nombres contengan al menos una letra (no solo símbolos)
- Asegura que no haya nombres duplicados

## Algoritmo de sorteo:

- Garantiza que nadie se asigne a sí mismo como amigo secreto
- Maneja situaciones especiales para evitar asignaciones inválidas
- Distribuye aleatoriamente los nombres

## Características adicionales:

- Botón para eliminar amigos individuales de la lista
- Compatibilidad con la tecla Enter para agregar nombres
- Botón dedicado para reiniciar el juego

## Prevención de ciclos infinitos:
Una verificación para asegurar que nadie se asigne a sí mismo, y si ocurre, se realiza un nuevo sorteo.

## Manejo de casos especiales:
Cuando quedaba un solo participante y podía auto-asignarse, hace un intercambio con una asignación previa aleatoria para garantizar que nadie se auto-asigne.

## Depuración:
mensaje de depuración en la consola para poder verificar que las parejas se están generando correctamente.
Esto te ayudará a identificar cualquier problema futuro que pueda surgir.

## Cómo funciona el  algoritmo:

Para cada persona en la lista de amigos:

- Se filtran los potenciales amigos secretos (excluyendo a la persona actual)
- Si hay potenciales amigos, se elige uno aleatoriamente
- Si no hay potenciales amigos (último caso), se intercambia con una asignación previa

La visualización de los resultados se controla mediante la función sortearAmigo(), que muestra un resultado cada vez que se hace clic en el botón

Marzo 2025.
Miguel Venegas T.
miguel.venegas @ gmail com
