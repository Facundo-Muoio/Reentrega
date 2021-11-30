$(document).ready(function(){
   
// VARIABLES

let inicioEmail;
let inicioPassword;
let usuarioEmail;
let usuarioPassword;
let email;
let password;
let restablecer

// array usuariosRegistrados donde se almacenan los usuarios registrados.
const usuariosRegistrados = [];
// array que se obtiene al traer usuarios del localSotorage
const Registrados = JSON.parse(localStorage.getItem("Usuario Email"));



// expresiones regulares para el email de registro, el mismo solo puede contar con numeros, guiones y puntos
let emailValidacion = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9.-]+$/;

// expresiones regulares para la contraseña de registro, la misma debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
let passwordValidacion = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
const checkLog = JSON.parse(localStorage.getItem("Login"));
let cerrarSesion 

// FUNCTIONS
function buscar(user){
    if(user.email === inicioEmail && user.password === inicioPassword){
        const arrLogin = [{email:user.email, contraseña:user.password}]
        localStorage.setItem("Login", JSON.stringify(arrLogin));
        return true;
    } return false;
}

function ingreso(succes){
    if(succes !== undefined){
        $(".inicioFallido").hide();
        $("#inputEmail , #inputPsw").css({
            "border": "1px solid black"
        });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usted inició sesión exitosamente',
            showConfirmButton: false,
            timer: 2000
        });
        setTimeout(redireccionar,2000);
    } else{
        $(".inicioFallido").show();
        $("#inputEmail, #inputPsw").css({
            "border": "1px solid red"
        })
    }
}

function redireccionar() {
    window.location.href = "../index.html"
}

function redireccionarLogin() {
    window.location.href = "Ingresar.html"
}

//REGISTRO USUARIO


// obtiene el valor del input de email, inicializa la variable yaRegistrado en la cual se almacenara un true en caso de encontrar en la variable registrados un usuario. Si resgistrados almacena usuarios se ejecuta un find buscando si el nombre de usuario coincide con alguno guardado en el array de nuestro local Storage. En caso de encontrar una coincidencia imprime
// en el dom un texto avisando que el usuario ya se encuentra en uso y guarda en la variable de email el booleno false para evitar al usuario poder registrarse clickeando el boton de registro. Por otro lado
// si no encuentra coincidencias guarda el booleano true en email.

$("#registroEmail").change((e) => {
    usuarioEmail = e.target.value;
    let yaRegistrado
    if(Registrados !== null){
     yaRegistrado = Registrados.find(usuario => usuario.email === usuarioEmail)
    }
    if(yaRegistrado !== (undefined && null)){
        $(".emailNoValido").hide();
        $(".emailFallido").show();
        $("#registroEmail").css({
            "border": "1px solid red"
        });
        email = false;
    }   else{
        $(".emailFallido").hide();
        $("#registroEmail").css({
            "border": "1px solid black"
        })
        email = true; 

// Con esta condición verificamos si el email ingresado cumple con las expresiones regulares guardades en emailValidacion. Si es true el programa guarda el booleano verdadero en email para aprobar
// el email como válido para el registro. En caso de que no cumpla con la expresión regular se muestra un texto especificando que puede contener el email y guarda el booleano falso en email así
// el usuario no puede registrarse clickeando el botón hasta corregir este email.

        if(emailValidacion.test(usuarioEmail) === true){
            $(".emailNoValido").hide();
            $("#registroEmail").css({
                "boder": "1px solid black"
            })
            email = true;
        } else {
            $(".emailNoValido").show();
            $("#registroEmail").css({
                "border": "1px solid red"
            });
            email = false;
        }
    }
});

// tomamos el valor del input password y lo guardamos en la variable usuarioPassword, luego hacemos la condición, si él método test() da true significa que la contraseña cumple con los requisitos de
// la expresión regular por lo cual se guarda en la variable password el booleano true necesario para poder permitir el registro del usuario. En caso de ser false se mostrara un mensaje en pantalla indicando los requisitos que
// debe cumplir la contraseña para ser válida, luego se guarda el booleano false en password para impedir al usuario su registro hasta que ingrese una contraseña válida.

$("#registroPsw").change((e) => {
    usuarioPassword = e.target.value;
    if(passwordValidacion.test(usuarioPassword) === true){
        $(".pswFallido").hide();
        $("#registroPsw").css({
            "border": "1px solid black"
        })
        password = true;
    } else {
        $(".pswFallido").show();
        $("#registroPsw").css({
            "border": "1px solid red"
        })
        password = false;
    }
});

// Con este evento al darle click en el boton de registrarme se chequea que los valores tanto en email como en password sean true, en caso de serlo se pushea al localStorage el email y contraseña del usario para ser almacenados
// y se muestra un modal avisando al cliente que el registro se completo . Por otro lado si algunos de los dos o ambos valores no son true se muestra un texto exigiendo que se complete el formulario de manera correcta para permitir
// el registo al usuario.

$("#registrarme").click((e) =>{
    e.preventDefault();
    if(email && password === true){
        $(".registroFallido").hide();
        usuariosRegistrados.push({email:usuarioEmail, password:usuarioPassword});
        localStorage.setItem("Usuario Email", JSON.stringify(usuariosRegistrados));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usted se registró exitosamente',
            showConfirmButton: false,
            timer: 2000
        })
        formRegistro.reset();
        setTimeout(redireccionarLogin,2000);
    }
    else{
        $(".registroFallido").show();
    }
})


//INICIO SESION

// toma el valor del input de email del form de inicio sesión y lo guarda en la variable inicioEmail
$("#inputEmail").change( function (e) {
    e.preventDefault();
    inicioEmail = e.target.value;
} );

// toma el valor del input de password del form de inicio sesión y lo guarda en la variable inicioPassword
$("#inputPsw").change((e) => {
    e.preventDefault()
    inicioPassword =  e.target.value;
} );

// cuando damos click en el boton de inicio de sesion, se guarda en la variable succes el valor que resulta del método find aplicado al array Registrados que traemos del localStorage y donde se guardan
// los usuarios registrados. Dentro del find tenemos otra función buscar, la cual itera nuestro array verificando si existe algún objeto que tenga el usuario y contraseña coincidentes con los ingresados. En caso positivo retorna true
// y por lo contrario false. Este valor es tomado por find y en caso de ser true devuelve los valores encontrados, si es false nuestro find devuelve undefined. Por último se ejecuta la función ingreso que chequea el valor de nuesro find
// , si es distinto a undefined se ocultan los mensajes de ingreso fallido y muestra un modal avisando que el usuario inició sesión correctamente, por último se lo redirecciona a nuestro cliente mediante la función redireccionar index. En caso de ser undefined se muestra un texto de
// inicio fallido.

$("#inicioSesion").click((e) => {
    e.preventDefault();
    let succes = Registrados.find(user => buscar(user))
    ingreso(succes); 
});


//  obtenemos el valor del input email y lo guardamos en usuarioRegistrado, luego usamos un find en el array de los usuarios ya registrados en busca de un usuario que tenga el mail ingresado, si se enceuntra coincidencia
// se guarda en restablecer true para ser utilizado mas adelante en el evento de click en el button de restablecer. Sino se encuentra un email guardado igaul al ingresado en el input se muestra con el show el mensaje de email no registrado y
// se guarda restablecer false

$(".inputRestablecer").change((e) => {
    let usuarioRegistrado = e.target.value;
    let yaRegistrado = Registrados.find(usuario => usuario.email === usuarioRegistrado);
    if(yaRegistrado !== undefined){
        $(".restablecerFallido").hide();
        $(".inputRestablecer").css({
            "border": "1px solid black"
        });
        restablecer = true
    } else{
        $(".restablecerFallido").show();
        $(".inputRestablecer").css({
            "border": "1px solid red"
        });
        restablecer = false
    }
})

// al hacer click en el boton de continuar se dispara el evento dentra del cual se evalua nuestra condicion, si restablecer es true se muestra un modal avisando al usuario que revise su casilla para restablecer su contraseña
// y se resetea el form. Por otra parte si restablecer no es true el boton no notifica nada
$("#restablecer").click((e) =>{
    e.preventDefault();
    if(restablecer === true){
        Swal.fire({
            title: 'En su casilla de correo electrónico encontrara las indicaciones para restablecer su contraseña. ',
            iconColor: 'blue',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        })
        formRestablecer.reset()
    }
})




let nombreBienvenida = "vacio" 

// con este if verificamos si hay usuarios registrados en caso de haberlos registrados sera distinto a null y guardaremos en la variable nombreBienvenida el email del usuario que luego se utiliza
// para mostrarlo en el dom una vez iniciada la sesión.
if(Registrados !== null){
    nombreBienvenida = Registrados[0].email;
}

cerrarSesion = checkLog[0].email


// Con este if verificamos si el email guardado como propiedad de un objeto dentro del array checkLog es distinto a salir, en caso de ser así se captura el li con id itemIngresar y se le hace un innerHTML
// para modificar el DOM permitiendonos con el uso de template literal renderizar un dropdown que con tiene el nombreBienvenida donde se almaceno el email del usuario, un boton de cerrie de sesión y un enlace a otra pagina. 
    if(cerrarSesion !== "salir"){
        document.getElementById("itemIngresar").innerHTML = `<div class="dropdown">
        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="dropLogueado"><i class="fas fa-user"></i>${nombreBienvenida}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
          <li><h3 class="dropdown-header">Bienvenido !</h3></li>
          <li id="disableListWishes"><a class="dropdown-item"  href="datos/deseos.html">Lista de deseos</a></li> 
          <li><hr class="dropdown-divider"></li>
          <li><button id="btnLogOut" class="dropdown-item"><i class="fas fa-sign-out-alt"></i>Cerrar sesión</button></li>
        </ul>
        </div>`
       }           

//Agregamos al boton de cierre de sesión el evento click para que cuando se dispare este se guarde en el array un ojeto con la propiedad email y el valor salir. Ahora a la variable cerrar sesion le asignamos el valor de la propiedad
// email que es "salir". Asi ahora cuando ejecutamos el if que compara si cerrar sesion es igual a "salir" nos tira true y ejecuta el código que renderiza en el index el link del nav que contenia el dropdown reemplazandolo nuevamente por el ingresar, 
//así el usuario al clikear cerrar sesion sale de la misma y tiene la posibilidad de volver a loguearse.

       $("#btnLogOut").click(()=>{
           checkLog.push({email:"salir"});
           checkLog.shift();
           cerrarSesion = checkLog[0].email
           if(cerrarSesion == "salir"){
            document.getElementById("itemIngresar").innerHTML = ` <a class="nav-link text-white" href="Usuarios/Ingresar.html"><i class="fas fa-sign-in-alt"></i>Ingresar</a>`
           }
           localStorage.clear()
       })


       
    })

