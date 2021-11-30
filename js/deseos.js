const containerItems = document.getElementById("containerCards"); // tomamos el elemento contenedor de nuestros items para renderizar dentro de el los items de nuestro array
const searchInput = document.getElementById("inputSearch");
const searchButton = document.getElementById("btnSearch");
const tableListWishes = document.querySelector(".tableWishes"); 
const itemListName = tableListWishes.getElementsByClassName("item__name");


//hacemos un constructor de libros que son nuestros objetos que compartiran las mismas propiedades y a las cuales luego meteremos en un array;
class libros{
    constructor(name, autor,categoria ,img, id){
        this.name = name;
        this.autor = autor;
        this.categoria = categoria;
        this.img = img;
        this.id = id
    }
}

const libroUno = new libros("Diego desde adentro","Fernando Signorini","biografia","../img-libros/portada_diego-desde-adentro_luciano-wernicke_202109031649.jpg","1");
const libroDos = new libros("Muhammad Ali","Fiaz Rafiq","biografia","../img-libros/331673_portada_muhammad-ali_fiaz-rafiq_202103241219.jpg","2");
const libroTres = new libros("Liderazgo Zidane","Juan Carlos Cubeiro Villar","biografia","../img-libros/280265_portada___201806061746.jpg","3");
const libroCuatro = new libros("Master - Roger Federer","Christopher Clarey","biografia","../img-libros/roger.jpg","4");
const libroCinco = new libros("4 años para 32 segundos","Saúl Craviotto Rivero","Autoayuda","../img-libros/256832_portada___4años.jpg","5");
const libroSeis = new libros("Cómo llegamos a la final de Wembley","J.L. Carr","Autoayuda","../img-libros/Wembley.jpg","6");
const libroSiete = new libros("El límite es tu salud","Emma Roca","Autoayuda","../img-libros/ellimite.jpg","7");
const libroOcho = new libros("Enemigo interno","Cristian Arcos","Autoayuda","../img-libros/enemigo.jpg","8");
const libroNueve = new libros("Héroes al volante","Alejandro Rosas","Deportes","../img-libros/f1.jpg","9");
const libroDiez = new libros("Tres minutos, cuarenta segundos","Ona Carbonell Ballestero","Deportes","../img-libros/Ona.jpg","10");
const libroOnce = new libros("Lo que el fútbol se llevó","Nicolás Samper Camargo","Deportes","../img-libros/ftbl.jpg","11");
const libroDoce = new libros("1968. El año que transformó al mundo","Ángeles Magdaleno","Deportes","../img-libros/juegos.jpg","12");

const items = [libroUno, libroDos, libroTres, libroCuatro, libroCinco, libroSeis, libroSiete, libroOcho, libroNueve, libroDiez, libroOnce, libroDoce]

//Hacemos una función flecha llamada render que recibe como parámetros un arreglo, que será el que contiene nuestros libros, y container que es el elemento padre dentro del cual renderizamos las cards
//de nuestros libros. Tenemos un if que verifica si nuestro arreglo de objetos es mayor a cero ya que si no lo es al aplicar el filtro de búsqueda y no tener coincidencias se renderiza el contenedor de las cards vacío y se pone un texto 
//avisando al usuario que no se encontró ningún artículo en la búsqueda. Ahora si es true la condición utilizamos un for para recorrer el array y por cada objeto dentro del mismo renderizamos una card cuyo contenido es el de las propiedades 
// de cada objeto. Tambien capturamos el boton que generamos en cada card y le agregamos el evento click con el callback addTolist(este nos sirve para agregar los libros a la lista de deseos)
const renderHtml = (items, container) => {
    
    container.innerHTML = ""

    
    if(items.length > 0){
        for(const item of items){
            const itemInnerHtml = `<div class="cardItem">
                                        <img class="card__img" src="${item.img}">
                                        <p class="card__name">${item.name}</p>
                                        <p class="card__autor">${item.autor}</p>
                                        <p class="card__categoria">${item.categoria}</p>
                                        <button class="card__btn">Agregar</button>
                                    </div>`
    
        container.innerHTML += itemInnerHtml
        const addToListWishBtns = document.querySelectorAll(".card__btn");
        addToListWishBtns.forEach((addToListBtn) => {
        addToListBtn.addEventListener("click",addToList)
 
});

        }
    }else{
        container.innerHTML = `<p class="itemNotFound">No hay coincidencias en la búsqueda</p>`
    }

}

// filteredItems es la variable donde guardamos nuestra función flecha que cumple el objetivo de: comparar el value del input de búsqueda mediante aplicar un filtro al array de libros
//y almacenar los valores de nombre y categoría, porpiedades de cada objeto, y comparar si alguna de las variables(itemName, itemCategory) donde almacenamos estos valores pasados a minúsculas coincide con lo que el usuario  ingreso en el input value almacenado en searchInputValue y luego pasado a minúscula. Esto permite al usuario por más que escriba en mayus o minúscula
// encontrar el libro de igual modo. Por último  se retorna el array con el filtro aplicado y nos valemos de render para mostrar este en pantalla al usuario.

const filterItems = () => {
    const searchInputValue = searchInput.value 
    const filteredItems = items.filter((item) => {
        const itemName = item.name.toLocaleLowerCase();
        const itemCategory = item.categoria.toLocaleLowerCase();
        const filtered = itemName.includes(searchInputValue.toLocaleLowerCase()) || itemCategory.includes(searchInputValue.toLocaleLowerCase());        
        return filtered;
    });
    
    renderHtml(filteredItems,containerItems);
   
};

// Aca llamamos a render para mostra al usuario todas las cards con los libros. 
renderHtml(items,containerItems);
//Agregamos el evento click y el callback filterItems para nuestro que el usuario al usar boton de búsqueda aplique el filtro.
searchButton.addEventListener("click", filterItems);

//Esta la función nexo para añadir las cosas a la lista de deseos que tendrá el usuario. Guardamos en las variables itemImg, itemName y itemAutor el contenido interno de sus elementos. En itemImg será el string dentro del src
// en itemName el string con el nombre del libro y en itemAutor el nombre del autor. Ahora llamamos a la función addToListWishes pasando como parámetros las variables itemImg, itemName y itemAutor. Y por último llamamos a la función addToTotalWishes().
function addToList(e) {
    const button = e.target
    const item = button.closest(".cardItem");
    const itemImg = item.querySelector(".card__img").src;
    const itemName = item.querySelector(".card__name").textContent;
    const itemAutor = item.querySelector(".card__autor").textContent;
    addTolistWishes(itemImg,itemName,itemAutor);
    addToTotalWishes();
}

//Con esta función básicamente le pasamos el src de la imagen, el nombre y el autor que necesecitamos para renderizar dentro de la lista de deseos cada artículo que agrega el usuario al apretar el button agregar de las cards.
// Luego esta verifica si  la variable en donde se almacena el número de libros agregados a la lista de deseos es menor a 5, ya que el usuario solo podra agregar cinco libros como deseos a la lista. En caso de ser true hacemos un for
// que itera hasta que la longitud del array en donde se almacena nuestro item agregado a la lista de deseos sea mayor a la variable i que inicializamos en el ciclo que incrementa de a uno. Con esto pretendemos evitar que un usuario pida dos veces el mismo
//libro como deseo. Así que se ejecuta un for que compara el nombre de item que trata el usuario de agregar con el nombre de item guardado en el array si coinciden utilizamos un popup para notificar al usuario que no puede pedir el mismo libro como deseo 2 veces
// luego con otro for agregamos una sola vez al item de la card del libro el atributo disable, así el usuario luego de cerrar el popup no puede volver a agregar ese libro a la lista. Para finalizar creamos una fila en la tabla que compone la lista de deseos
// agregamos la clase mediante la cual le damos estilos css y dentro del elemento renderizamos las celdas que contienen la información del libro agregado, valiendonos de los valores que pasamos como parámetro de la función. Agregamos el hijo al elemento table padre
// y le ponemos el evento click a nuestro boton que corresponde al item de la lista pasandole como función callback removeItemListWishes que se utiliza para sacar los elementos de la lista de deseos.
function addTolistWishes (itemImg,itemName,itemAutor){
    if (TotalWishes < 5){
        for(let i = 0; i < itemListName.length; i++){
            if(itemListName[i].innerText === itemName){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Este Artículo ya fue añadido a la lista de desos.',
                    footer: '<p></p>'
                  })
                for(let j = 0; j < 1; j++){
                    tableListWishes.querySelector(".card__btn").setAttribute("disable","true");
                }
               
              
                return
            }
        }
        const rowTableListWishes = document.createElement("tr");
        rowTableListWishes.classList.add("trWishes");
        rowTableListWishes.innerHTML = `<td class="tdWishes"><img src="${itemImg}"></td>
                                        <td class="tdWishes item__name">${itemName}</td>
                                        <td class="tdWishes">${itemAutor}</td>
                                        <td class="tdWishes"><button class="btnRemoveItem"><i class="fas fa-window-close"></i></button></td>`                               
        tableListWishes.appendChild(rowTableListWishes); 
        rowTableListWishes.querySelector(".btnRemoveItem").addEventListener("click",removeItemListWishes);
    }
}

let TotalWishes = 0

// Con esta función controlamos que el usuario solo pueda pedir un total de 5 deseos. Para eso usamos un if que comprueba si el valor de la variable TotalWishes es menor a 5. En caso de que sea tru la condición aumenta en uno la variable 
// Para terminar guardamos el elememto donde tenemos el total de deseos pedidos y le apliacmos un innerHTML para modificarlo con el valor actual del contador y renderizarlo para el usuario. En caso de que la condición sea false:
//se muestra un popup al usuario indicandole que la lista esta llena y si quiere agregar otro deseos debe remover un libro del listado.
function addToTotalWishes(){
    if (TotalWishes < 5){
        TotalWishes += 1;
        const totalWishes = document.querySelector(".totalListWishes")
        totalWishes.innerHTML = `TOTAL : ${TotalWishes}`
    }else{
        Swal.fire({
            title: 'La lista de deseos esta llena',
            text: 'Si quiere añadir otro artículo debera remover alguno de la lista de deseos.',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
    }
}

// La funcion remove toma el elemento button del libro dentro de la lista de deseos, apartir de este usa el closest para buscar el elemento padre cercano que tenga la clase trWishes que es el contenedor de toda la fila dentro de la lista de deseos
// y la remueve del dom, asi el usuario al clickear el button de x puede quitar libros de la lista de deseos. Para terminar le resta al contador total de deseos 1 y renderiza el resultado para que el usario lo visualize.
function removeItemListWishes (e){
    const btnCliked = e.target;
    btnCliked.closest(".trWishes").remove();
    TotalWishes -= 1
    const totalWishes = document.querySelector(".totalListWishes")
    totalWishes.innerHTML = `TOTAL : ${TotalWishes}`
}

// Obtenemos el elemento button que dice pedir deseos, y le agregamos un evento click con el callback MakeWishes
const letMakeWishes = document.querySelector(".btnWishes");
letMakeWishes.addEventListener("click",MakeWishes)

const containerMessageError = document.querySelector(".containerTotalAndBtn")
const newElement = document.createElement("p")
let dontRepeatmessage = 0


//Esta función primero verifica si el contador de deseos es igual a 5 en caso de true renderiza todo el dom para mostrar al usuario que sus deseos han sido pedidos y que pronto obtendra de regalo uno de ellos.
//en caso de false la condición se pasa un ciclo while el cual verifica que el valor de dontRepeatmessage sea 0, ya que sino significa que en el dom ya esta renderizado el mensaje que indica al usuario que agregue 5 libros a la lista. No quermos renderizar esto mas de una vez
// si el usuario al clickear el boton de pedir deseos ya tiene el mensaje, esta es la razon de ser del while. En caso de que el contador este en 0 obtendremos el elemento hijo(child) del contenedor del mensaje(containerMessageError). Con estos dos mas el nuevo elemento p(newElement) que hicimos fuera de esta función
// llamamos a un iserBefore el cual nos permite agregar al dom un nodo nuevo antes del que pasamos como segundo parámetro. Así en pantalla entre el total de deseos y el boton para pedirlos se visualiza nuestro mensaje.
function MakeWishes(){
    if(TotalWishes == 5){
       document.body.innerHTML = `<body class="bg-body-deseoCumplido">
                        <div class="gridEst">
                        <header>
                            <div class="headerEst">
                                <!--Logo-->
                                <a href="../index.html"><h1 class="logoDeseos">GOL</h1></a>
                                <!--fin logo-->
                           </div>
                        <!-- fin header -->
                        </header>
                        <p class="succesWishes">Sus deseos fueron pedidos con éxito, pronto se le concedera uno de todos ellos. Gracias!</p>
                        <div class="pie">
	                	<footer class="footer">
	                		<p class="text-footer">El Diario GOL. Fundado el 15 de marzo de 1904. Gol.com.ar. Lanzada el 21 de septiembre de 1996. Año 24. Edición N° 9107. Registro intelectual 56057581. Domicilio legal: Diario Gol 6080 – CP: X5008HKJ – Córdoba, Argentina.<br>Propietario: Diario Gol SA. Gerente General: Juan Tillard. Director: Carlos Hugo Jornet. Editor: Carlos Hugo Jornet.<br>&copy; 1996 - 2021 Todos los derechos reservados. Aviso legal.</p>
                            <div class="redes__posicion">
	                			<p class="footer__p m-0">Seguinos</p>
	                			<ul class="footer__ul">
	                				<li><a href="https://www.facebook.com" target=_blank ><i class="fab fa-facebook-square"></i></a></li>
	                				<li><a href="https://www.twitter.com" target=_blank ><i class="fab fa-twitter-square"></i></a></li>
	                				<li><a href="https://www.youtube.com" target=_blank ><i class="fab fa-youtube-square"></i></a></li>
	                				<li><a href="https://www.instagram.com" target=_blank ><i class="fab fa-instagram-square"></i></a></li>
	                			</ul>	
	                		</div>
	                	</footer>
	                </div>
                    </body>`
    }else{
        while(dontRepeatmessage === 0){
        const child = containerMessageError.querySelector(".btnWishes");
        newElement.textContent = "Para poder pedir tus deseos necesitamos que agregues 5 libros a la lista."
        containerMessageError.insertBefore(newElement, child)
        dontRepeatmessage = 1
    } 
    }
}


