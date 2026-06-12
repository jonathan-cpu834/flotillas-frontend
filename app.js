const API_URL =
"https://flotillas-backend.onrender.com";

async function obtenerVehiculos(){

try{

const res = await fetch(API_URL);

const datos = await res.json();

const tabla =
document.getElementById("tabla");

tabla.innerHTML = "";

datos.forEach(v=>{

let clase = "";

if(v.estado === "Operativo")
clase = "operativo";

if(v.estado === "En mantenimiento")
clase = "mantenimiento";

if(v.estado === "Fuera de servicio")
clase = "fuera";

let alerta = "";

if(v.kilometraje >= 50000){
alerta = " ⚠ Requiere mantenimiento";
}

tabla.innerHTML += `
<tr>

<td>${v.unidad}</td>

<td>${v.placas}</td>

<td>${v.kilometraje}${alerta}</td>

<td>${v.ultimoServicio}</td>

<td>${v.proximoServicio}</td>

<td class="${clase}">
${v.estado}
</td>

<td>${v.responsable}</td>

</tr>
`;

});

}catch(error){

console.error(error);

}

}

document
.getElementById("formVehiculo")
.addEventListener("submit", async(e)=>{

e.preventDefault();

const nuevoVehiculo = {

unidad:
document.getElementById("unidad").value,

placas:
document.getElementById("placas").value,

kilometraje:
Number(
document.getElementById("kilometraje").value
),

ultimoServicio:
document.getElementById("ultimoServicio").value,

proximoServicio:
document.getElementById("proximoServicio").value,

estado:
document.getElementById("estado").value,

responsable:
document.getElementById("responsable").value

};

try{

await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(nuevoVehiculo)

});

alert("Vehículo registrado");

document
.getElementById("formVehiculo")
.reset();

obtenerVehiculos();

}catch(error){

console.error(error);

}

});

obtenerVehiculos();