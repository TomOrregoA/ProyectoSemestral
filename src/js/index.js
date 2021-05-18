$(document).ready(function () {
    $('.popupimage').click(function (event) {
        event.preventDefault();
        $('.modal img').attr('src', $(this).attr('href'));
        $('.modal').modal('show');
    });
});

$(document).ready(function () {
    $("#formulario").validate({
        rules: {
            cNombres: {
                required: true
            },
            cApellidos: {
                required: true
            },
            cCorreo: {
                required: true,
                email: true
            },
            cMensaje: {
                required: true,
                minlength: 15
            }
        },
        messages: {
            cNombres: {
                required: "Debe ingresar un nombre"
            },
            cApellidos: {
                required: "Debe ingresar su(s) apellido(s)"
            },
            cCorreo: {
                required: "Debe ingresar su correo electrónico",
                email: "Su email debe tener el formato: abc@ejemplo.com"
            },
            cMensaje: {
                required: "Debe ingresar un mensaje",
                minlength: "Su mensaje debe tener un mínimo de 15 caracteres"
            }
        }
    });
});


/* $(document).ready(() => {
    document.querySelector("#buscar").addEventListener("click", (e) => {
        e.preventDefault();
        const busqueda = document.getElementById("#buscar-artista").value.trim();
        if(busqueda) {
            document.querySelectorAll("#autor").forEach(item => {
                let autor = item.innerHTML;
                if(busqueda == autor){
                    console.log("Encontrado!!!");
                    item.classList.remove("oculto");
                }else{
                    console.log("No se ha encontrado.");
                }
            });
        }else {
            console.log("escriba el nombre de un artista");
        }
    })
}); */

//Variables globales
let divisaActual = 'USD';

const galeria = document.querySelector("#mostrador");


//Api convertir divisas
getValorDolar = (divisa, divisaActual) => {
    axios.get("https://mindicador.cl/api")
        .then(res => {
            let val = res.data.dolar.valor;
            let valDolar = parseInt(val);
            console.log(divisa);
            document.querySelectorAll("#valor").forEach((item) => {
                let valor = item.innerHTML;
                if (divisa == 'CLP' && divisa != divisaActual) {
                    valor = Math.floor(valor * valDolar);
                    console.log("Pesos Chilenos: " + valor);
                    item.innerHTML = valor;
                } else if (divisa == 'USD' && divisa != divisaActual) {
                    valor = Math.floor(valor / valDolar);
                    console.log("Dolares: " + valor);
                    item.innerHTML = valor;
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

$(document).ready(function () {
    document.querySelectorAll(".divisaConv").forEach(item => {
        item.addEventListener("click", () => {
            let divisaSelect = item.innerHTML.substr(0, 3);
            if (divisaActual != 'CLP' && divisaActual != divisaSelect) {
                getValorDolar('CLP', divisaActual);
                divisaActual = 'CLP';
                cambiarDivImpresa(divisaActual);
            } else if (divisaActual != 'USD' && divisaActual != divisaSelect) {
                getValorDolar('USD', divisaActual);
                divisaActual = 'USD';
                cambiarDivImpresa(divisaActual);
            }
        })
    })
});

function cambiarDivImpresa(divisaActual) {
    document.querySelectorAll("#divisa").forEach((item) => {
        if (divisaActual == 'USD') {
            item.innerHTML = 'USD';
        } else {
            item.innerHTML = 'CLP';
        }
    });
}


//Poblar la sección de galeria
const obras = function (titulo, autor, imagen, precio, tecnica, medidas, annio) {
    this.titulo = titulo,
        this.autor = autor,
        this.imagen = imagen,
        this.precio = precio,
        this.tecnica = tecnica,
        this.medidas = medidas,
        this.annio = annio
}

const obra1 = new obras("Caballero y Luna", "Manuel de la Cuadra", "https://tomorregoa.github.io/ProyectoSemestral/src/images/gallery/1.png", "800", "Pintura al Óleo", "180cms x 100cms", "2018");
const obra2 = new obras("Ciervo Poligonal", "Andrea Ramírez", "https://tomorregoa.github.io/ProyectoSemestral/src/images/gallery/2.png", "75", "Diseño Digital", "150cms x 95cms", "2020");
const obra3 = new obras("Olas de Colores", "Romina García", "https://tomorregoa.github.io/ProyectoSemestral/src/images/gallery/3.png", "750", "Pintura al Óleo", "200cms x 150cms", "2006");
const obra4 = new obras("Mujer del Bosque", "Gabriel Villarán", "https://tomorregoa.github.io/ProyectoSemestral/src/images/gallery/4.png", "1250", "Pintura al Óleo", "120cms x 75cms", "1998");
const obra5 = new obras("Mujer del Bosque", "Gabriel Villarán", "https://tomorregoa.github.io/ProyectoSemestral/src/images/gallery/4.png", "1250", "Pintura al Óleo", "120cms x 75cms", "1998");
const obra6 = new obras("Mujer del Bosque", "Gabriel Villarán", "https://tomorregoa.github.io/ProyectoSemestral/src/images/gallery/4.png", "1250", "Pintura al Óleo", "120cms x 75cms", "1998");

const obrasArray = [obra1, obra2, obra3, obra4, obra5, obra6];

function printObras() {
    obrasArray.forEach(function (item) {
        galeria.innerHTML += `
                <div class="card mb-4 box-shadow" id="carta">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-normal">${item.titulo}</h4>
                    </div>
                    <div class="card-body gallery">
                        <a class="popupimage" href="${item.imagen}">
                            <img class="card-img-top" src="${item.imagen}">
                        </a>
                        <h1 class="precio">$<span id="valor">${item.precio}</span><small
                                class="text-muted">/ <span id="divisa">USD</span></small></h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li id="autor">${item.autor}</li>
                            <li>Técnica: ${item.tecnica}</li>
                            <li>Medidas: ${item.medidas}</li>
                            <li>Año: ${item.annio}</li>
                        </ul>
                        <button type="button" class="btn btn-lg btn-block btn-danger">Ver Detalles</button>
                    </div>
                </div>`

    })
}


$(document).ready(function () {
    printObras();
})


$(document).ready(function () {
    document.querySelector("#buscarArtista").addEventListener("click", (e)=>{
        e.preventDefault();
        let buscador = document.querySelector("#nombreArtista");
        let found = false;
        if(buscador.value != ''){
            document.querySelectorAll("#autor").forEach(item =>{
                if(buscador.value == item.innerHTML){
                    found = true;
                }
                if(buscador.value != item.innerHTML || found != true){
                    item.parentNode.parentNode.parentNode.classList.add("oculto");
                    
                }
            });
        }else{
            document.querySelectorAll("#carta").forEach((item)=>{
                item.classList.remove("oculto");
            })
        }
        
    })
})


//Filtro artistas galería
/* document.querySelector("#buscarArtista").addEventListener("click", (e)=>{
    let found = false;
    e.preventDefault();
    const nombreArtista = document.querySelector("#nombreArtista").value;
    galeria.innerHTML = '';
    if(nombreArtista != ''){
        obrasArray.forEach(item =>{
            let index = obrasArray.lastIndexOf(item);
            let max = obrasArray.length - 1;
            console.log(index);
            console.log(max);
            if(nombreArtista == item.autor){
                found = true;
                console.log("Obra encontrada: " + item.titulo);
                galeria.innerHTML += `
                <div class="card mb-4 box-shadow" id="obra">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-normal">${item.titulo}</h4>
                    </div>
                    <div class="card-body gallery">
                        <a class="popupimage" href="${item.imagen}">
                            <img class="card-img-top" src="${item.imagen}">
                        </a>
                        <h1 class="precio">$<span id="valor">${item.precio}</span><small
                                class="text-muted">/ <span id="divisa">USD</span></small></h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>${item.autor}</li>
                            <li>Técnica: ${item.tecnica}</li>
                            <li>Medidas: ${item.medidas}</li>
                            <li>Año: ${item.annio}</li>
                        </ul>
                        <button type="button" class="btn btn-lg btn-block btn-danger">Ver Detalles</button>
                    </div>
                </div>`
                getValorDolar = (divisaActual, divisaActual);
            } else if(found == false && index==max) {
                galeria.innerHTML = '';
                galeria.innerHTML += '<p>Artista no Encontrado</p>';
            }
        });

    } else {
        galeria.innerHTML = '';
        printObras();
    }
});

document.querySelector("#nombreArtista").addEventListener("search", ()=>{
    galeria.innerHTML = '';
    printObras();
})
 */