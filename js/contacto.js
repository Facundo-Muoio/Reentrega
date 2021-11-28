     
    //CONTACTO
    
    const formulario = document.getElementById("formularioContacto");
    const inputs = document.querySelectorAll("#formularioContacto input");
   

    //  Objeto que contiene todas nuestras expresiones regulares para validar el formulario
    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    }

    let textArea; 
    // Objeto mediante el cual tomamos los valores booleanos que luego sirven para validar nuestro formulario
    const campos = {nombre:false, apellido:false, correo:false, telefono:false, textarea:false};


    // Función del tipo flecha mediante el cual ejecutamos un switch que compara nuestro input target value con los nombres de los cases y asi nos permite ejecutar un if. Dentro de este utilizamos
    // método test para verificar si el valor de nuestro input cumple con la expresión regular que tomamos de la propiedad del objeto expresiones. En caso true  toma del dom el input 
    // y ejecuta un classList.remove, esto para sacar la clase que tira un mensaje de incorrecto y sus estilos, a su vez hace un classList.add para mostrar que el valor del input cumple con la expresión regular.
    //Dentro del true también se observa un hide y un show metodos que se utilizan para cambiar el display de las clases que contienen a los icónos. Con el hide ocultamos el icono que corresponde para señalar el error al completar el input y con el show
    //mostramos el icono para indicar al usuario que esta completando correctamente ese campo. Por último tomamos la propiedad que corresponde de nuestro objeto campos y le asignamos el booleano true para luego poder simular el envío del form y resetearlo.
    // Ahora si el test no tira el true pasamos al else de nuestra condición en donde se hace lo mismo que detalle arriba nada mas que a la inversa.
    //Esto es así para que podamos mostrar al usuario los mensajes e iconos de error indicando que esta completando mal los campos  y ocultar los iconoes y estilos que indican si el campo fue rellenado exitosamente. Tambien tomamos
    // la propiedad del objeto campos pero esta vez le pasamos false para que impida al usuario enviar el form hasta que complete bien el input.
    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "Nombre" :
               if(expresiones.nombre.test(e.target.value)){
                document.getElementById("nombreContacto").classList.remove("iptIncorrecto")
                document.getElementById("nombreContacto").classList.add("iptCorrecto")
                $("#iNombreBad").hide();
                $("#iNombreOk").show();
                $(".msgErrorNombre").hide()
                campos.nombre = true;
               }else{
                document.getElementById("nombreContacto").classList.remove("iptCorrecto")
                document.getElementById("nombreContacto").classList.add("iptIncorrecto")
                $("#iNombreOk").hide();
                $("#iNombreBad").show();
                $(".msgErrorNombre").show()
                campos.nombre = false;
               };
            break;
            case "Apellido" :
                if(expresiones.apellido.test(e.target.value)){
                    document.getElementById("apellidoContacto").classList.remove("iptIncorrecto")
                    document.getElementById("apellidoContacto").classList.add("iptCorrecto")
                    $("#iApellidoBad").hide();
                    $("#iApellidoOk").show();
                    $(".msgErrorApellido").hide()
                    campos.apellido = true;
                   }else{
                    document.getElementById("apellidoContacto").classList.remove("iptCorrecto")
                    document.getElementById("apellidoContacto").classList.add("iptIncorrecto")
                    $("#iApellidoOk").hide();
                    $("#iApellidoBad").show();
                    $(".msgErrorApellido").show()
                    campos.apellido = false;
                   };
            break;
            case "Teléfono" :
                if(expresiones.telefono.test(e.target.value)){
                    document.getElementById("telContacto").classList.remove("iptIncorrecto")
                    document.getElementById("telContacto").classList.add("iptCorrecto")
                    $("#iTelBad").hide();
                    $("#iTelOk").show();
                    $(".msgErrorTelefono").hide()
                    campos.telefono = true;
                   }else{
                    document.getElementById("telContacto").classList.remove("iptCorrecto")
                    document.getElementById("telContacto").classList.add("iptIncorrecto")
                    $("#iTelOk").hide();
                    $("#iTelBad").show();
                    $(".msgErrorTelefono").show()
                    campos.telefono = false;   
                   };
            break;
            case "Email" :
                if(expresiones.correo.test(e.target.value)){
                    document.getElementById("emailContacto").classList.remove("iptIncorrecto")
                    document.getElementById("emailContacto").classList.add("iptCorrecto")
                    $("#iEmlBad").hide();
                    $("#iEmlOk").show();
                    $(".msgErrorEmail").hide()
                    campos.correo = true;
                   }else{
                    document.getElementById("emailContacto").classList.remove("iptCorrecto")
                    document.getElementById("emailContacto").classList.add("iptIncorrecto")
                    $("#iEmlOk").hide();
                    $("#iEmlBad").show();
                    $(".msgErrorEmail").show()
                    campos.correo = false;
                   };
            break;
        }
    }


    // Utilizamos jquery para tomar el elemento textarea de nuestro imput y aplicarle el evento change. Mediante este evento podemos capturar lo que el usuario ingresa en nuestro area de texto
    // y almacenar esto en la variblae textArea la cual nos valemos para ejecutar un if. Este if evalua si la variable textArea esta vacia, en caso de true ejecuta un document.getElementById("cambiarTextarea").innerHTML que nos permite capturar
    // el div padre del text area elemento y modificar su cotenido para agregar un nuevo textarea con estilo en los bordes del mismo, indicando que no se puede dejar vacío este campo. Finalmente tomamos la propiedad textarea del objeto campos y cambiamos su valor a false
    // de este modo evitamos que el usuario pueda enviar el form hasta que complete esta sección. Ahora en caso de que nuestro if de false removemos la clase que muestra los estilos de error y cambiamos a true el valor de la propiedad textarea de campos así esta no impide enviar 
    // el form
    $("#mensajeContacto").change((e) => {
        e.preventDefault()
        textArea =  e.target.value;
        if(textArea == ""){
            document.getElementById("cambiarTextarea").innerHTML = `<textarea id="mensajeContacto" class="emptyTextArea" cols="60" rows="15" name="Textarea">
            </textarea>`
            campos.textarea = false
        }else{
            document.getElementById("mensajeContacto").classList.remove("emptyTextArea");
            campos.textarea = true
        }
    } );

 
    // Tomamos la const inputs en la cual guardamos nuestro formulario de contacto y le aplicamos un forEach que nos permite iterar a cada input hijo de este form, esto nos va a agregar a cada input de nuestro formulario
    // un addEvenListener con los eventos keyup y blur, el primero para cada vez que se suelta una tecla y el segundo para cuando se clickea fuera del input y se pierde su foco, ambos eventos disparan nuestra función validarFormulario que ya explique. Así agregamos los eventos necesarios para validar el formulario.
    inputs.forEach((input) => {
        input.addEventListener("keyup", validarFormulario);
        input.addEventListener("blur", validarFormulario);
    });

  
    // Capturamos nuestro boton de enviar y le pasamos el event click, utilizamos el preventDefault metodo para evitar que se resetee el formulario en caso de que se haga click en el boton de envio. Ahora aplicamos un if que
    // verificar si los valores de las propiedades del objeto campo son verdaderas. En caso de que el if sea true, esto nos indica que el form fue rellenado correctame, se usa hide para ocultar el elemento con clase errorEnviar que mostraba un mensaje señalando 
    // que se debía completar correctamente el form, luego capturando los inputs se remueven las clases iptCorrecto para que una vez reseteado el formulario no queden estilos en los inputs que pintan los bordes de color verde en señal de que ya estan completados correctamente. Luego con  $("#iNombreOk").hide() ocultamos los 
    // iconos de check que sirven para mostrar que el form esta bien rellenad, esto es para que una vez reseteado y enviado el form no queden estos icónos. Y finalmente se vuelven a cambiar a false los valores de la propiedades dentro del objeto campos, esto se hace ya que si no los ponemos en false quedarian todos en true permitiendo 
    // así al usuario a que cuando tenga el form reseteado y de click en enviar este form vacío. Ahora bien en caso de que el if de false se pasa al else en donde se muestra un elemnto con un mensaje de error indicando que el formulario no esta bien completado, esto es gracias al método show que aplicamos al elemento capturado con jQuery.
    $("#btnEnviarContacto").click((e) => {
        e.preventDefault();
        if(campos.nombre && campos.apellido && campos.correo && campos.telefono && campos.textarea){
            $(".errorEnviar").hide();
            document.getElementById("nombreContacto").classList.remove("iptCorrecto")
            $("#iNombreOk").hide();
            campos.nombre = false;
            document.getElementById("apellidoContacto").classList.remove("iptCorrecto")
            $("#iApellidoOk").hide();
            campos.apellido = false;
            document.getElementById("telContacto").classList.remove("iptCorrecto")
            $("#iTelOk").hide();
            campos.telefono = false;
            document.getElementById("emailContacto").classList.remove("iptCorrecto")
            $("#iEmlOk").hide();
            campos.correo = false;
            campos.textarea = false;
            Swal.fire('En brevedad sera contactado por nuestro departamentento de atención al cliente. Gracias!');
            formularioContacto.reset();
        } else{
            $(".errorEnviar").show();
        }
        })

  