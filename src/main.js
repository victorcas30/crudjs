import { getEmpleados, guardarEmpleados, editarEmpleados, eliminarEmpleados } from "./getApi.js";

var idEmpleadoEdit = 0;

const getEmpleadosApi = async() => {
    getEmpleados().then(result => {
        const { empleados } = result;
        mostrarEmpleados(empleados);
    });
}

const mostrarEmpleados = (empleados) => {
    const tbodyEmpleados = document.getElementById("tbody-empleados");
    empleados.map(empleado => {
        const { id, nombre, apellido, dui } = empleado;
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        tdId.innerHTML = id;
        tr.appendChild(tdId);
        const tdNombre = document.createElement("td");
        tdNombre.innerHTML = nombre;
        tr.appendChild(tdNombre);
        const tdApellido = document.createElement("td");
        tdApellido.innerHTML = apellido;
        tr.appendChild(tdApellido);
        const tdDui = document.createElement("td");
        tdDui.innerHTML = dui;
        tr.appendChild(tdDui);
        const btnEditar = document.createElement("button");
        btnEditar.innerHTML="Editar";
        btnEditar.classList.add("btn", "btn-primary");
        btnEditar.addEventListener("click",() => {
            btnEditarEmpleados(empleado);
        })
        const tdBtnEditar = document.createElement("td");
        tdBtnEditar.appendChild(btnEditar);
        tr.appendChild(tdBtnEditar);
        const btnEliminar = document.createElement("button");
        btnEliminar.innerHTML="Eliminar";
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.addEventListener("click",() => {
            btnEliminarEmpleados(id);
        })
        const tdBtnEliminar = document.createElement("td");
        tdBtnEliminar.appendChild(btnEliminar);
        tr.appendChild(tdBtnEliminar);
                tbodyEmpleados.appendChild(tr);
    })
}


const setEmpleados = (inputs) => {
    let empleado = {nombre:inputs[0].value, apellido:inputs[1].value, dui:inputs[2].value, fechanacimiento:"2023-08-29"}
    
    guardarEmpleados(empleado).then(result => {
        console.log(result);
        const {message} = result
        alert(message);
    });
}

const btnEditarEmpleados = (empleado) => {
    const inputs = document.getElementsByClassName("inputEmpleados");
    inputs[0].value = empleado.nombre;
    inputs[1].value = empleado.apellido;
    inputs[2].value = empleado.dui;
    idEmpleadoEdit = empleado.id;
    document.getElementById("btnGuardarCambios").style.display="inline";
    document.getElementById("btnAgregar").style.display="none";
}

const setEmpleadosEditar = (inputs) => {
    let empleado = {id:idEmpleadoEdit, nombre:inputs[0].value, apellido:inputs[1].value, dui:inputs[2].value, fechanacimiento:"2023-08-29"}
    console.log(empleado);

    editarEmpleados(empleado).then(result => {
        console.log(result)
        const {message} = result
        alert(message);
        document.getElementById("btnGuardarCambios").style.display="none";
        document.getElementById("btnAgregar").style.display="inline";
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
        getEmpleadosApi();
    });
    
}

const btnEliminarEmpleados = (id) => {
    eliminarEmpleados({id:id}).then(result => {
        console.log(result);
        const {message} = result
        alert(message);
        getEmpleadosApi();
    });
}

export { mostrarEmpleados, setEmpleados, setEmpleadosEditar, getEmpleadosApi };