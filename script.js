// VALIDAR REGISTRO

function validarRegistro(){

var nombre = document.getElementById("nombre").value;
var correo = document.getElementById("correo").value;
var usuario = document.getElementById("usuario").value;
var password = document.getElementById("password").value;

if(nombre === "" || correo === "" || usuario === "" || password === ""){

alert("Complete todos los campos");
return false;

}

alert("Registro completado");

return true;

}



//mensaje de bienvenida 

function bienvenida(){

    alert("bienvenidos a cinefly, tu plataforma de peliculas y series favorita ");
}


// consumo de api

function cargarPeliculas(){

fetch("https://api.tvmaze.com/shows")

.then(function(respuesta){
return respuesta.json();
})

.then(function(datos){

var catalogo = document.getElementById("catalogo");

for(var i=0; i<8; i++){

var pelicula = datos[i];

catalogo.innerHTML += `

<div class="pelicula">

<img src="${pelicula.image.medium}">

<h3>${pelicula.name}</h3>

<button onclick="verPelicula('${pelicula.name}')">
Ver informacion
</button>

</div>

`;

}

});

}

   

// Moastrar informacion

function verPelicula(nombre){
    document.getElementById("infoPelicula").innerHTML 
    = "<h3> has seleccionado la pelicula: " + nombre + "</h3>";

}

function buscarPelicula(){
    var texto = document.getElementById("busqueda").value.trim();
    if(texto === ""){
        alert("Por favor ingresa un texto para buscar.");
        return;
    }

    fetch("https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(texto))
    .then(function(respuesta){
        return respuesta.json();
    })
    .then(function(datos){
        var catalogo = document.getElementById("catalogo");
        catalogo.innerHTML = "";
        document.getElementById("infoPelicula").innerHTML = "";

        if(datos.length === 0){
            catalogo.innerHTML = "<p>No se encontraron resultados para '<strong>" + texto + "</strong>'.</p>";
            return;
        }

        datos.forEach(function(item){
            var pelicula = item.show;
            var imagen = pelicula.image && pelicula.image.medium ? pelicula.image.medium : "https://via.placeholder.com/210x295?text=Sin+imagen";

            catalogo.innerHTML += `
                <div class="pelicula">
                    <img src="${imagen}" alt="${pelicula.name}">
                    <h3>${pelicula.name}</h3>
                    <button onclick="verPelicula('${pelicula.name}')">Ver informacion</button>
                </div>
            `;
        });
    })
    .catch(function(error){
        console.error(error);
        alert("Ocurrió un error al buscar. Intenta de nuevo.");
    });
}




