//$("#header").load("pages/header.html");
$("#footer").load("pages/footer.html");

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

const funcDolarApi = async function () {
    let res = await axios.get("https://mindicador.cl/api")
    let valorDolar = res.data.dolar.valor;
    imprimirDolar(valorDolar);
}

function imprimirDolar(valorDolar) {
    document.querySelectorAll("#valor").forEach((item) => {
        //item.innerHTML = item.innerHTML*valorDolar;
        console.log(valorDolar);
    });
}

//Promise, con axios consulto la api por medio del metodo get, si el resultado es positivo actualizo los precio de la pagina
$(document).ready(function () {
    funcDolarApi();
    //let divisaActual = 'USD';
    /* document.querySelectorAll(".divisaConv").forEach(item => {
        item.addEventListener("click", () => {
            let divisaSelect = item.innerHTML.substr(0, 3);
            actualizarDivisa(vDolar, divisaActual, divisaSelect);
        })
    }) */
});

/* function actualizarDivisa(vDolar, divisaActual, divisaSelect) {
    document.querySelectorAll("#divisa").forEach((item) => {
        if (item.innerHTML == 'USD' && item.innerHTML != divisaSelect) {
            item.innerHTML = 'CLP';
        } else if (item.innerHTML == 'CLP' && item.innerHTML != divisaSelect) {
            item.innerHTML = 'USD';
        }
    });

    document.querySelectorAll("#valor").forEach((item) => {        
        if(divisaActual == 'USD' && divisaActual != divisaSelect){
            valor = valor*vDolar;
            console.log(valor);
            divisaActual = 'CLP'
        }
        else if(divisaActual == 'CLP' && divisaActual != divisaSelect){
            valor = valor/vDolar;
            console.log(valor);
            divisaActual = 'USD'
        }
    });
} */