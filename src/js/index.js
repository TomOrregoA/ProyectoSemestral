
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
    let divisaActual = 'USD';
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