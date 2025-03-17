// Variables globales
let listaAmigos = [];
let parejasSorteadas = [];
let indiceSorteoActual = 0;

// Función para agregar un amigo a la lista/array
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();
    
    // Validaciones
    if (!validarNombre(nombreAmigo)) {
        return;
    }
    
    // Agregar a la lista y actualizar UI
    listaAmigos.push(nombreAmigo);
    actualizarListaUI();
    
    // Limpiar el input
    inputAmigo.value = '';
    inputAmigo.focus();
}

// Función para validar nombre ingresado, 3 validaciones 
function validarNombre(nombre) {
    // Verificar si está vacío o son solo espacios
    if (!nombre) {
        alert('Por favor ingresa un nombre válido');
        return false;
    }
    
    // Verificar que contenga al menos una letra (no solo símbolos)
    if (!/[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]/.test(nombre)) {
        alert('El nombre debe contener al menos una letra');
        return false;
    }
    
    // Verificar que no esté repetido
    if (listaAmigos.includes(nombre)) {
        alert('Este nombre ya está en la lista');
        return false;
    }
    
    return true;
}

// Función para actualizar la lista/array en la interfaz
function actualizarListaUI() {
    const listaUI = document.getElementById('listaAmigos');
    listaUI.innerHTML = '';
    
    listaAmigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        
        // Agregar botón para eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '❌';
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.onclick = () => eliminarAmigo(index);
        
        li.appendChild(btnEliminar);
        listaUI.appendChild(li);
    });
}

// Función para eliminar un amigo de la lista/array
function eliminarAmigo(index) {
    listaAmigos.splice(index, 1);
    actualizarListaUI();
    limpiarResultados();
}

// Función para sortear amigos
function sortearAmigo() {
    const resultadoUI = document.getElementById('resultado');
    
    // Verificar que haya suficientes amigos
    if (listaAmigos.length < 2) {
        alert('Necesitas al menos 2 amigos/as para realizar sorteo');
        return;
    }
    
    // Si no se ha realizado el sorteo aún o se reinició, hacerlo
    if (parejasSorteadas.length === 0) {
        realizarSorteo();
    }
    
    // Mostrar el siguiente resultado del sorteo
    if (indiceSorteoActual < parejasSorteadas.length) {
        const pareja = parejasSorteadas[indiceSorteoActual];
        
        // Crear elemento para mostrar el resultado
        const li = document.createElement('li');
        li.textContent = `${pareja.persona}: Tu amigo/a secreto es ${pareja.amigoSecreto}`;
        resultadoUI.appendChild(li);
        
        indiceSorteoActual++;
        
        // Si terminamos de mostrar todos, cambiar el texto del botón
        if (indiceSorteoActual >= parejasSorteadas.length) {
            const botonSortear = document.querySelector('.button-draw');
            botonSortear.innerHTML = `
                <img src="assets/play_circle_outline.png" alt="Ícono para sortear">
                Todos los amigos sorteados, Reiniciar juego
            `;
            botonSortear.onclick = resetearJuego;
        }
    }
}

// Función para realizar el sorteo de amigos/as secretos
function realizarSorteo() {
    // Reiniciar variables
    parejasSorteadas = [];
    indiceSorteoActual = 0;
    
    // Crear una copia de la lista para manipular
    let amigosPorAsignar = [...listaAmigos];
    
    // Para cada persona, asignar un amigo/a secreto que no sea ella misma
    for (let i = 0; i < listaAmigos.length; i++) {
        const persona = listaAmigos[i];
        let amigoSecreto;
        
        // Filtrar potenciales amigos/as secretos (que no sea la misma persona)
        const potencialesAmigos = amigosPorAsignar.filter(amigo => amigo !== persona);
        
        // Si no hay potenciales amigos, es el último y se asignaría a sí mismo
        if (potencialesAmigos.length === 0) {
            // Intercambiar con una asignación previa para evitar auto-asignación
            const indiceAleatorio = Math.floor(Math.random() * (parejasSorteadas.length - 1));
            amigoSecreto = parejasSorteadas[indiceAleatorio].amigoSecreto;
            parejasSorteadas[indiceAleatorio].amigoSecreto = persona;
        } else {
            // Seleccionar un amigo aleatorio
            const indiceAleatorio = Math.floor(Math.random() * potencialesAmigos.length);
            amigoSecreto = potencialesAmigos[indiceAleatorio];
            
            // Eliminar el amigo seleccionado de la lista de disponibles
            const indiceAmigoAsignado = amigosPorAsignar.indexOf(amigoSecreto);
            if (indiceAmigoAsignado !== -1) {
                amigosPorAsignar.splice(indiceAmigoAsignado, 1);
            }
        }
        
        // Registrar la pareja
        parejasSorteadas.push({
            persona: persona,
            amigoSecreto: amigoSecreto
        });
    }
    
    // Verificar que el sorteo sea válido (nadie se asigne a sí mismo)
    const sorteoValido = parejasSorteadas.every(pareja => pareja.persona !== pareja.amigoSecreto);
    
    // Si el sorteo no es válido, intentar de nuevo
    if (!sorteoValido) {
        realizarSorteo();
        return;
    }
    
    // Depuración: Mostrar parejas en consola
    console.log("Parejas sorteadas:", parejasSorteadas);
}

// Función para limpiar los resultados
function limpiarResultados() {
    const resultadoUI = document.getElementById('resultado');
    resultadoUI.innerHTML = '';
    
    // Restaurar botón de sorteo
    const botonSortear = document.querySelector('.button-draw');
    botonSortear.innerHTML = `
        <img src="assets/play_circle_outline.png" alt="Ícono para sortear">
        Sortear amigo
    `;
    botonSortear.onclick = sortearAmigo;
    
    // Reiniciar variables de sorteo
    parejasSorteadas = [];
    indiceSorteoActual = 0;
}

// Función para resetear el juego completo
function resetearJuego() {
    // Limpiar la lista de amigos/as
    listaAmigos = [];
    actualizarListaUI();
    
    // Limpiar resultados
    limpiarResultados();
    
    // Enfocar el input
    document.getElementById('amigo').focus();
}

// Agregar evento para usar la tecla Enter en el input
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarAmigo();
    }
});

// Agregar botón de reseteo
window.addEventListener('DOMContentLoaded', function() {
    // Crear botón de reseteo
    const buttonContainer = document.querySelector('.button-container');
    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'Limpiar registros y reiniciar juego';
    resetButton.classList.add('button-reset');
    resetButton.onclick = resetearJuego;
    resetButton.style.backgroundColor = '#C4C4C4';
    resetButton.style.marginTop = '15px';
    
    buttonContainer.appendChild(resetButton);
});
