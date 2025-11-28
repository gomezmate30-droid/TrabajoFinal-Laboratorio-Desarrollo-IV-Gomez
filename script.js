// Esperamos a que todo el HTML cargue antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    
    const input = document.getElementById('characterInput');
    const button = document.getElementById('buscarBtn');
    const resultado = document.getElementById('resultado');

    
    const buscarPersonaje = async () => {
        
        const nombre = input.value.trim().toLowerCase();

        
        if (!nombre) {
            resultado.innerHTML = '<p class="text-red-400 font-bold">¡Escribe un nombre por favor!</p>';
            return;
        }

        try {
            
            const respuesta = await fetch(`https://rickandmortyapi.com/api/character/?name=${nombre}`);

            
            if (!respuesta.ok) {
                throw new Error('Personaje no encontrado en este universo.');
            }

            
            const datos = await respuesta.json();
            
            const personaje = datos.results[0];

            resultado.innerHTML = `
                <div class="bg-gray-800 p-6 rounded-xl shadow-lg border border-green-500 transform hover:scale-105 transition">
                    <img src="${personaje.image}" alt="${personaje.name}" class="w-48 h-48 mx-auto rounded-full border-4 border-green-400 mb-4 shadow-md">
                    <h2 class="text-3xl font-bold text-green-300">${personaje.name}</h2>
                    <p class="text-gray-300 mt-2 text-lg">Especie: <span class="font-bold text-white">${personaje.species}</span></p>
                    <p class="text-gray-300">Estado: <span class="font-bold ${personaje.status === 'Alive' ? 'text-green-400' : 'text-red-400'}">${personaje.status}</span></p>
                </div>
            `;

        } catch (error) {
            
            resultado.innerHTML = `<p class="text-red-400 font-bold">Error: ${error.message}</p>`;
        }
    };

    button.addEventListener('click', buscarPersonaje);

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') buscarPersonaje();
    });
});