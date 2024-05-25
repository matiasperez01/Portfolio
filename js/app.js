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




function mostrarMenu(){
    if (links.style.display === "none") {
        links.style.display = "flex";
        if(menu.style.display === "none"){
            links.style.display = "none";
        }
      } else {
        links.style.display = "none";
      }
}

let item = document.getElementById('barra-navegacion-mobile');

function ocultar(){
    item.style.display = 'none';
}

function verMenu(){
  if(menu.style.display === 'none'){
    console.log("OK");
    item.style.display = 'none';
  }
}


