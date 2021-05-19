//Modal para las imagenes de la galería
$(document).ready(function () {
    $('.popupimage').click(function (event) {
        event.preventDefault();
        $('.modal img').attr('src', $(this).attr('href'));
        $('.modal').modal('show');
    });
});


//Función de jquery y validate que permite validar el contenido del formulario previamente a ser enviado
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

//Variables globales para la sección de api-dolar
let divisaActual = 'USD';
const galeria = document.querySelector("#mostrador");


//Api convertir divisas -- USD //Esta función consume la api para conseguir el valor del dolar y 
//realiza las operaciones matemáticas para calcular el nuevo valor de cada elemento encontrado
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

//llamamos a la funcion que consume la api mediante axios y que realiza el calculo del nuevo valor en cada elemento encontrado
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

//cambiamos las siglas en el texto de la divisa seleccionada
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

//constructor de objetos "obras"
const obras = function (titulo, autor, imagen, precio, tecnica, medidas, annio) {
    this.titulo = titulo,
        this.autor = autor,
        this.imagen = imagen,
        this.precio = precio,
        this.tecnica = tecnica,
        this.medidas = medidas,
        this.annio = annio
}
// contenido simulación de información de backend para propositos de prueba
const obra1 = new obras("Caballero y Luna", "Manuel de la Cuadra", "https://tomorregoa.github.io/ProyectoSemestral/src/images/gallery/1.png", "800", "Realismo", "180cms x 100cms", "2018");
const obra2 = new obras("Ciervo Poligonal", "Andrea Ramírez", "https://tomorregoa.github.io/ProyectoSemestral/src/images/gallery/2.png", "75", "Impresionismo", "150cms x 95cms", "2020");
const obra3 = new obras("Olas de Colores", "Romina García", "https://tomorregoa.github.io/ProyectoSemestral/src/images/gallery/3.png", "750", "Expresionismo", "200cms x 150cms", "2006");
const obra4 = new obras("Mujer del Bosque", "Gabriel Villarán", "https://tomorregoa.github.io/ProyectoSemestral/src/images/gallery/4.png", "1250", "Surrealismo", "120cms x 75cms", "1998");
const obra5 = new obras("Mujer del Bosque", "Gabriel Villarán", "https://tomorregoa.github.io/ProyectoSemestral/src/images/gallery/4.png", "1250", "Surrealismo", "120cms x 75cms", "1998");
const obra6 = new obras("Mujer del Bosque", "Gabriel Villarán", "https://tomorregoa.github.io/ProyectoSemestral/src/images/gallery/4.png", "1250", "Surrealismo", "120cms x 75cms", "1998");

const obrasArray = [obra1, obra2, obra3, obra4, obra5, obra6];

// Recorremos el array con objetos "obra" y lo imprimimos en la sección de galeria
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
                            <li>Estilo: <span id="estilo">${item.tecnica}</span></li>
                            <li>Medidas: ${item.medidas}</li>
                            <li>Año: ${item.annio}</li>
                        </ul>
                        <button type="button" class="btn btn-lg btn-block btn-danger">Ver Detalles</button>
                    </div>
                </div>`

    })
}



$(document).ready(function () {
    //Llamamos a la función de imprimir obras en galeria
    printObras();

    document.querySelector("#btnBuscador").addEventListener("click", (e) => {
        e.preventDefault();

        let filtroArtista = document.querySelector("#filtroArtista").value;
        let filtroEstilo = document.querySelector("#filtroEstilo").value;
        let mensaje = document.querySelector("#mensaje");
        let found = false;

        mensaje.classList.add("oculto");

        document.querySelectorAll("#carta").forEach(item => {
            let autor = item.querySelector("#autor").innerHTML;
            let estilo = item.querySelector("#estilo").innerHTML;

            if (filtroArtista != '') {
                if (filtroArtista == autor) {
                    if (filtroEstilo == "Escoja Estilo" || filtroEstilo == estilo) {
                        item.classList.remove("oculto");
                        mensaje.classList.add("oculto");
                        found = true;
                    } else {
                        item.classList.add("oculto");
                        if (found == false) {
                            mensaje.classList.remove("oculto");
                        }
                    }

                } else {
                    item.classList.add("oculto");
                    if (found == false) {
                        mensaje.classList.remove("oculto");
                    }
                }
            } else if (filtroArtista == '' && filtroEstilo != "Escoja Estilo") {
                if (filtroEstilo == estilo) {
                    item.classList.remove("oculto");
                    mensaje.classList.add("oculto");
                    found = true;
                } else {
                    item.classList.add("oculto");
                    if (found == false) {
                        mensaje.classList.remove("oculto");
                    }
                }
            } else if(filtroArtista == '' && filtroEstilo == "Escoja Estilo") {
                item.classList.remove("oculto");
                mensaje.classList.add("oculto");
            }
        });
    })
})