let links = document.getElementById('barra-navegacion-mobile');
let menu = document.getElementById('boton-menu');
const secciones = document.querySelectorAll('.contenedor');


function triggerAnimation(entries){
  entries.forEach(entry =>{
    const image = entry.target.querySelector('img');
    image.classList.toggle('unset',entry.isIntersecting);
  })
}

const options ={
  root: null,
  rootMargin: '0px',
  threshold: 0
}

const observer = new IntersectionObserver(triggerAnimation, options);

secciones.forEach(seccion =>{
observer.observe(seccion);
})





