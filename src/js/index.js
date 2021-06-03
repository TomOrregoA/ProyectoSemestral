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

// Validación formulario de registro
$(document).ready(function () {
    $("#formularioReg").validate({
        rules: {
            rUsuario: {
                required: true,
                minlength: 8
            },
            rPassword: {
                required: true,
                minlength: 8
            },
            rPassword2: {
                required: true,
                equalTo: "#rPassword"
            },
            rNombres: {
                required: true
            },
            rApellidos: {
                required: true
            },
            rCorreo: {
                required: true,
                email: true
            }
        },
        messages: {
            rUsuario: {
                required: "Debe ingresar un nombre de Usuario.",
                minlength: "El nombre de usuario debe tener 8 carácteres como mínimo."
            },
            rPassword: {
                required: "Debe ingresar una contraseña.",
                minlength: "La contraseña debe tener un mínimo de 10 caractéres."
            },
            rPassword2: {
                required: "Debe ingresar una contraseña.",
                equalTo: "Ámbas contraseñas deben coincidir."
            },
            rNombres: {
                required: "Debe ingresar su(s) nombre(s)."
            },
            rApellidos: {
                required: "Debe ingresar su(s) apellido(s)."
            },
            rCorreo: {
                required: "Debe ingresar su correo electrónico.",
                email: "El correo electrónico ingresado debe ser válido."
            }
        }
    });
});

// Validación formulario de Ingreso
$(document).ready(function () {
    $("#formularioLog").validate({
        rules: {
            lUsuario: {
                required: true
            },
            lPassword: {
                required: true
            }
        },
        messages: {
            lUsuario: {
                required: "Debe ingresar su nombre de Usuario."
            },
            lPassword: {
                required: "Debe ingresar su contraseña."
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
const obra1 = new obras("Caballero y Luna", "Manuel Fernández", "src/images/gallery/1.png", "800", "Realismo", "180cms x 100cms", "2018");
const obra2 = new obras("Ciervo Poligonal", "Andrea Ramírez", "src/images/gallery/2.png", "785", "Impresionismo", "150cms x 95cms", "2020");
const obra3 = new obras("Olas de Colores", "Romina García", "src/images/gallery/3.png", "850", "Expresionismo", "200cms x 150cms", "2006");
const obra4 = new obras("Mujer del Bosque", "Gabriel Villarán", "src/images/gallery/4.png", "1250", "Surrealismo", "120cms x 75cms", "1998");
const obra5 = new obras("Pop Art Comic", "Andrea Ramírez", "src/images/gallery/5.png", "970", "Arte Pop", "120cms x 75cms", "1998");
const obra6 = new obras("Ojos", "Romina García", "src/images/gallery/6.png", "1550", "Arte abstracto", "120cms x 75cms", "1998");
const obra7 = new obras("Frutas", "Manuel Fernández", "src/images/gallery/7.png", "1260", "Hiperrealismo", "120cms x 75cms", "1998");


const obrasArray = [obra1, obra2, obra3, obra4, obra5, obra6, obra7];

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
                        <button id="agregarCarrito" class="btn btn-lg btn-block btn-danger">Agregar al carrito <i class="fas fa-cart-plus"></i></button>
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

        mensaje.classList.add("d-none");

        document.querySelectorAll("#carta").forEach(item => {
            let autor = item.querySelector("#autor").innerHTML;
            let estilo = item.querySelector("#estilo").innerHTML;

            if (filtroArtista != '') {
                if (filtroArtista == autor) {
                    if (filtroEstilo == "Escoja Estilo" || filtroEstilo == estilo) {
                        item.classList.remove("d-none");
                        mensaje.classList.add("d-none");
                        found = true;
                    } else {
                        item.classList.add("d-none");
                        if (found == false) {
                            mensaje.classList.remove("d-none");
                        }
                    }

                } else {
                    item.classList.add("d-none");
                    if (found == false) {
                        mensaje.classList.remove("d-none");
                    }
                }
            } else if (filtroArtista == '' && filtroEstilo != "Escoja Estilo") {
                if (filtroEstilo == estilo) {
                    item.classList.remove("d-none");
                    mensaje.classList.add("d-none");
                    found = true;
                } else {
                    item.classList.add("d-none");
                    if (found == false) {
                        mensaje.classList.remove("d-none");
                    }
                }
            } else if (filtroArtista == '' && filtroEstilo == "Escoja Estilo") {
                item.classList.remove("d-none");
                mensaje.classList.add("d-none");
            }
        });
    })
})


//Modal para las imagenes de la galería
$(document).ready(function () {
    $('.popupimage').click(function (event) {
        event.preventDefault();
        $('.modal img').attr('src', $(this).attr('href'));
        $('.modal').modal('show');
    });
});


let cartCount = document.querySelector("#cartCount");
let contador = 0;
//Agregar obras al carro
$(document).ready(() => {
    document.querySelectorAll("#agregarCarrito").forEach(item => {
        item.addEventListener("click", () => {
            contador += 1;
            cartCount.innerHTML = contador;
            console.log("click");
        });
    });
})

/*  */
$(document).ready(($) =>{
    let bsDefaults = {
            offset: false,
            overlay: true,
            width: '330px'
        },
        bsMain = $('.bs-offset-main'),
        bsOverlay = $('.bs-canvas-overlay');

    $('[data-toggle="canvas"][aria-expanded="false"]').on('click', function () {
        let canvas = $(this).data('target'),
            opts = $.extend({}, bsDefaults, $(canvas).data()),
            prop = $(canvas).hasClass('bs-canvas-right') ? 'margin-right' : 'margin-left';

        if (opts.width === '100%')
            opts.offset = false;

        $(canvas).css('width', opts.width);
        if (opts.offset && bsMain.length)
            bsMain.css(prop, opts.width);

        $(canvas + ' .bs-canvas-close').attr('aria-expanded', "true");
        $('[data-toggle="canvas"][data-target="' + canvas + '"]').attr('aria-expanded', "true");
        if (opts.overlay && bsOverlay.length)
            bsOverlay.addClass('show');
        return false;
    });

    $('.bs-canvas-close, .bs-canvas-overlay').on('click', function () {
        var canvas, aria;
        if ($(this).hasClass('bs-canvas-close')) {
            canvas = $(this).closest('.bs-canvas');
            aria = $(this).add($('[data-toggle="canvas"][data-target="#' + canvas.attr('id') + '"]'));
            if (bsMain.length)
                bsMain.css(($(canvas).hasClass('bs-canvas-right') ? 'margin-right' : 'margin-left'), '');
        } else {
            canvas = $('.bs-canvas');
            aria = $('.bs-canvas-close, [data-toggle="canvas"]');
            if (bsMain.length)
                bsMain.css({
                    'margin-left': '',
                    'margin-right': ''
                });
        }
        canvas.css('width', '');
        aria.attr('aria-expanded', "false");
        if (bsOverlay.length)
            bsOverlay.removeClass('show');
        return false;
    });
});