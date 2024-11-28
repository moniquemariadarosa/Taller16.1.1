const URL_API = 'https://www.superheroapi.com/api.php/9824c1c077babe3efe8070c4163bf251/search/';
const formularioBusqueda = document.getElementById('formularioBusqueda');
const resultadoHeroe = document.getElementById('resultadoHeroe');

formularioBusqueda.addEventListener('submit', async (evento) => {
  evento.preventDefault(); 
  
  const nombreHeroe = document.getElementById('nombreHeroe').value; 

  try {
    const respuesta = await fetch(`${URL_API}${nombreHeroe}`);
    const datos = await respuesta.json();

    if (datos.response === 'error') {
      resultadoHeroe.innerHTML = `
        <div class="alert alert-danger">
          No encontramos un superhéroe con ese nombre. ¡Intenta con otro!
        </div>`;
      return;
    }

    const heroe = datos.results[0];
    resultadoHeroe.innerHTML = `
      <div class="card">
        <img src="${heroe.image.url}" class="card-img-top" alt="${heroe.name}">
        <div class="card-body">
          <h5 class="card-title">${heroe.name}</h5>
          <p class="card-text"><strong>Nombre completo:</strong> ${heroe.biography['full-name']}</p>
          <p class="card-text"><strong>Editorial:</strong> ${heroe.biography.publisher}</p>
          <p class="card-text"><strong>Primera aparición:</strong> ${heroe.biography['first-appearance']}</p>
        </div>
      </div>
    `;
  } catch (error) {
    resultadoHeroe.innerHTML = `
      <div class="alert alert-danger">
        Ocurrió un error: ${error.message}
      </div>`;
  }
});
