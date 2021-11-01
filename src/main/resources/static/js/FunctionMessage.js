const url_ms = "http://localhost:8080/api/Message"
const contenedor_ms = document.getElementById('tbodyMensaje')
let resultados_ms = ''
let opcion_ms = ''

const modalMensaje = new bootstrap.Modal(document.getElementById('modalMensaje'))
const formMensaje = document.getElementById('formularioMensaje')
const idMensaje = document.getElementById('idMensaje')
const txtMensaje = document.getElementById('txtMensaje')
const txtCliente= document.getElementById('selCliente')
const txtFinca = document.getElementById('selFinca')

const modalUpMensaje = new bootstrap.Modal(document.getElementById('modalUpMensaje'))
const formMensajeUp = document.getElementById('formularioMensajeUp')
const idMensajeUp = document.getElementById('idMensajeUp')
const txtMensajeUp = document.getElementById('txtMensajeUp')
const txtClienteUp = document.getElementById('selClienteUp')
const txtFincaUp = document.getElementById('selFincaUp')

function getNombresClientes(){
    ajax_ms({
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
    ajax_ms({
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

btnCrearMensaje.addEventListener('click', () => {
    txtMensaje.value = ''
    txtCliente.value = ''
    txtCliente.value = getNombresClientes()
    txtFinca.value = getNombresFincas()
    modalMensaje.show()
    opcion_ms = 'crear'
})

cerrar.addEventListener('click', () => {
    location.reload()
})

cerrarUp.addEventListener('click', () => {
    location.reload()
})

const ajax_ms = (options) => {
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

const getAll_ms = () => {
    ajax_ms({
        url: url_ms+("/all"),
        method: "GET",
        success: (res) => {
            console.log(res);

            res.forEach((mensaje) => {
                resultados_ms += `<tr>
                        <td width="10%" style="display:none">${mensaje.idMessage}</td>
                        <td width="15%">${mensaje.messageText}</td>
                        <td width="15%">${mensaje.client.name}</td>
                        <td width="15%">${mensaje.farm.name}</td>                    
                        <td class="text-center" width="20%">
                            <a class="btnEditarMs btn btn-outline-success">Editar</a>
                            <a class="btnBorrarMs btn btn-outline-danger">Borrar</a>
                        </td>
                    </tr>`
            });
            contenedor_ms.innerHTML = resultados_ms
        },
        error: (err) => {
            console.log(err);
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
    });
};

document.addEventListener("DOMContentLoaded", getAll_ms);

document.addEventListener("click", (e) => {

    if (e.target.matches(".btnBorrarMs")) {
        const fila = e.target.parentNode.parentNode
        const id = fila.firstElementChild.innerHTML
        console.log('Este es el id del elemento: ' , id)
        alertify.confirm(`¿Estás seguro de eliminar la finca ${id}?`,
        function () {
            ajax_ms({
                url: url_ms+("/")+id,
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "id": id
                },
                success: (res) => console.log(res),
                error: (err) => alertify.error('Mensaje No se pudo eliminar')
            });
            alertify.success('Mensaje Eliminado'),
            window.setTimeout(function(){location.reload()},1200)
        },
        function () {
            alertify.warning('Eliminacion de Finca cancelada');
        });
    }
    
    if (e.target.matches(".btnEditarMs")) {
        const fila = e.target.parentNode.parentNode
        idMensajeUp.value = fila.children[0].innerHTML
        txtMensajeUp.value = fila.children[1].innerHTML
        txtClienteUp.value = fila.children[2].innerHTML
        txtFincaUp.value = fila.children[3].innerHTML
        opcion_ms = 'editar'
        modalUpMensaje.show()
    }
})

formMensaje.addEventListener('submit', (e) => {
    e.preventDefault()
    let metodo = "POST"
    let url2 = url_ms +("/save")
    ajax_ms({
        url: url2,
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "idMessage": idMensaje.value,
            "messageText": txtMensaje.value,
            "farm": {"id": txtFinca.value},
            "client": {"idClient": txtCliente.value}
        },
        success: (res) => (alertify.success('Mensaje guardado'),
            window.setTimeout(function(){location.reload()},1200)),
        error: (err) =>
            $formMensaje.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
    });
    modalMensaje.hide()
})

formMensajeUp.addEventListener('submit', (e) => {
    e.preventDefault()
    let metodo = "PUT"
    let url2 = url_ms +("/update")
    ajax_ms({
        url: url2,
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "idMessage": idMensajeUp.value,
            "messageText": txtMensajeUp.value
        },
        success: (res) => (alertify.success('Mensaje actualizado'),
            window.setTimeout(function(){location.reload()},1200)),
        error: (err) =>
            $formMensaje.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
    });
    modalUpMensaje.hide()
})

