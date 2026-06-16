const API_URL =
"https://flotillas-backend.onrender.com/vehiculos";

let editandoId = null;

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

<td>

<button
onclick="editarVehiculo('${v._id}')">
Editar
</button>

<button
style="background:red"
onclick="eliminarVehiculo('${v._id}')">
Eliminar
</button>

</td>

</tr>
`;

});

}catch(error){

console.error(error);

}

}

async function editarVehiculo(id){

const res =
await fetch(API_URL);

const datos =
await res.json();

const vehiculo =
datos.find(v => v._id === id);

if(!vehiculo) return;

editandoId = id;

document.getElementById("unidad").value =
vehiculo.unidad;

document.getElementById("placas").value =
vehiculo.placas;

document.getElementById("kilometraje").value =
vehiculo.kilometraje;

document.getElementById("ultimoServicio").value =
vehiculo.ultimoServicio;

document.getElementById("proximoServicio").value =
vehiculo.proximoServicio;

document.getElementById("estado").value =
vehiculo.estado;

document.getElementById("responsable").value =
vehiculo.responsable;

document.querySelector(
"#formVehiculo button"
).innerText = "Actualizar Vehículo";

window.scrollTo({
top:0,
behavior:"smooth"
});

}

async function eliminarVehiculo(id){

if(!confirm("¿Eliminar vehículo?"))
return;

await fetch(
API_URL + "/" + id,
{
method:"DELETE"
}
);

obtenerVehiculos();

}

document
.getElementById("formVehiculo")
.addEventListener("submit", async(e)=>{

e.preventDefault();

const vehiculo = {

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

if(editandoId){

await fetch(
API_URL + "/" + editandoId,
{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(vehiculo)
}
);

editandoId = null;

document.querySelector(
"#formVehiculo button"
).innerText = "Registrar Vehículo";

}else{

await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(vehiculo)

});

}

document
.getElementById("formVehiculo")
.reset();

obtenerVehiculos();

}catch(error){

console.error(error);

}

});

obtenerVehiculos();