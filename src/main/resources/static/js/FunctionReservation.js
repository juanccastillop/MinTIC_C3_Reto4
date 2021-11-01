const url = "http://localhost:8080/api/Reservation"
const contenedor_rs = document.getElementById('tbodyReserva')
let resultados_rs = ''
let opcion_rs = ''

const modalReserva = new bootstrap.Modal(document.getElementById('modalReserva'))
const formReserva = document.getElementById('formularioReserva')
const idReserva = document.getElementById('idReserva')
const fechaInReserva = document.getElementById('fechaInReser')
const fechaFinReserva = document.getElementById('fechaFinReser')
const estadoReserva = document.getElementById('estadoReser')
const txtFinca = document.getElementById('selFinca')
const txtCliente= document.getElementById('selCliente')

const modalReservaUp = new bootstrap.Modal(document.getElementById('modalReservaUp'))
const formReservaUp = document.getElementById('formularioReservaUp')
const idReservaUp = document.getElementById('idReservaUp')
const fechaInReservaUp = document.getElementById('fechaInReserUp')
const fechaFinReservaUp = document.getElementById('fechaFinReserUp')
const estadoReservaUp = document.getElementById('estadoReserUp')
const txtFincaUp = document.getElementById('selFincaUp')
const txtClienteUp= document.getElementById('selClienteUp')

function getNombresClientes(){
    ajax_rs({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#selCliente");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient)
            }); 
        }
    })
}

function getNombresFincas(){
    ajax_rs({
        url:"http://localhost:8080/api/Farm/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#selFinca");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id)
                
            }); 
        } 
    })
}

btnCrearReserva.addEventListener('click', () => {
    fechaInReserva.value = ''
    fechaFinReserva.value = ''
    txtCliente.value = getNombresClientes()
    txtFinca.value = getNombresFincas()
    modalReserva.show()
    opcion_rs = 'crear'
})

cerrar.addEventListener('click', () => {
    location.reload()
})

cerrarUp.addEventListener('click', () => {
    location.reload()
})

const ajax_rs = (options) => {
    let { url, method, success, error, data } = options;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", (e) => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            if( xhr.responseText ){
                let json = JSON.parse(xhr.responseText);
                success(json);
            }
        } else {
            let message = xhr.statusText || "Ocurrió un error";
            error(`Error ${xhr.status}: ${message}`);
        }
    });

    xhr.open(method || "GET", url);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(data));
};

const getAll_rs = () => {
    ajax_rs({
        url: url+("/all"),
        method: "GET",
        success: (res) => {
            console.log(res);

            res.forEach((reserva) => {
                resultados_rs += `<tr>
                        <td width="10%" style="display:none">${reserva.idReservation}</td>
                        <td width="15%">${reserva.startDate}</td>
                        <td width="15%">${reserva.devolutionDate}</td>
                        <td width="15%">${reserva.status}</td>
                        <td width="15%">${reserva.farm.name}</td> 
                        <td width="15%">${reserva.client.name}</td>                    
                        <td class="text-center" width="20%">
                            <a class="btnEditarRs btn btn-outline-success">Editar</a>
                            <a class="btnBorrarRs btn btn-outline-danger">Borrar</a>
                        </td>
                    </tr>`
            });
            contenedor_rs.innerHTML = resultados_rs
        },
        error: (err) => {
            console.log(err);
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
    });
};

document.addEventListener("DOMContentLoaded", getAll_rs);

document.addEventListener("click", (e) => {

    if (e.target.matches(".btnBorrarRs")) {
        const fila = e.target.parentNode.parentNode
        const id = fila.firstElementChild.innerHTML
        console.log('Este es el id del elemento: ' , id)
        alertify.confirm(`¿Estás seguro de eliminar la reserva ${id}?`,
        function () {
            ajax_rs({
                url: url+("/")+id,
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "id": id
                },
                success: (res) => console.log(res),
                error: (err) => alertify.error('Reservación No se pudo eliminar')
            });
            alertify.success('Reservación eliminada'),
            window.setTimeout(function(){location.reload()},1200)
        },
        function () {
            alertify.warning('Eliminacion de Reserva cancelada');
        });
    }
    
    if (e.target.matches(".btnEditarRs")) {
        const fila = e.target.parentNode.parentNode
        idReservaUp.value = fila.children[0].innerHTML
        fechaInReservaUp.value = fila.children[1].innerHTML
        fechaFinReservaUp.value = fila.children[2].innerHTML
        estadoReserva.value = fila.children[3].innerHTML
        txtFincaUp.value = fila.children[4].innerHTML
        txtClienteUp.value = fila.children[5].innerHTML
        opcion_rs = 'editar'
        modalReservaUp.show()
    }
})

formReserva.addEventListener('submit', (e) => {
    e.preventDefault()
    let metodo = "POST"
    let url2 = url +("/save")
    ajax_rs({
        url: url2,
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "idReservation": idReserva.value,
            "startDate": fechaInReserva.value,
            "devolutionDate": fechaFinReserva.value,
            "status": estadoReserva.value,
            "client": {"idClient": txtCliente.value},
            "farm": {"id": txtFinca.value}
        },
        success: (res) => (alertify.success('Reservación guardada'),
            window.setTimeout(function(){location.reload()},1200)),
        error: (err) =>
            $formReserva.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
    });
    modalReserva.hide()
})

formReservaUp.addEventListener('submit', (e) => {
    e.preventDefault()
    let metodo = "PUT"
    let url2 = url +("/update")
    ajax_rs({
        url: url2,
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "idReservation": idReservaUp.value,
            "startDate": fechaInReservaUp.value,
            "devolutionDate": fechaFinReservaUp.value,
            "status": estadoReservaUp.value,
        },
        success: (res) => (alertify.success('Reservación actualizado'),
            window.setTimeout(function(){location.reload()},1200)),
        error: (err) =>
            $formReservaUp.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
    });
    modalReservaUp.hide()
})

