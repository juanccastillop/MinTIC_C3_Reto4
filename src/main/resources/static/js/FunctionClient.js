const url_cl= "http://localhost:8080/api/Client"
const contenedor_cl = document.getElementById('tbodyCliente')
let resultados_cl = ''
let opcion_cl = ''

const modalCliente = new bootstrap.Modal(document.getElementById('modalCliente'))
const formCliente = document.getElementById('formularioCliente')
const idCliente = document.getElementById('idCliente')
const nombreCliente = document.getElementById('nombreCliente')
const edadCliente = document.getElementById('edad')
const correoCliente = document.getElementById('correo')
const contraseñaCliente = document.getElementById('contraseña')

btnCrearCliente.addEventListener('click', () => {
    nombreCliente.value = ''
    edadCliente.value = ''
    correoCliente.value = ''
    contraseñaCliente.value = ''
    modalCliente.show()
    opcion_cl = 'crear'
})

const ajax_cl = (options) => {
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

const getAll_cl = () => {
    ajax_cl({
        url: url_cl+("/all"),
        method: "GET",
        success: (res) => {
            console.log(res);

            res.forEach((cliente) => {
                resultados_cl += `<tr>
                        <td width="10%" style="display:none">${cliente.idClient}</td>
                        <td width="15%">${cliente.name}</td>
                        <td width="15%">${cliente.age}</td>
                        <td width="15%">${cliente.email}</td>
                        <td width="15%" style="display:none">${cliente.password}</td>
                        <td class="text-center" width="20%">
                            <a class="btnEditarCl btn btn-outline-success">Editar</a>
                            <a class="btnBorrarCl btn btn-outline-danger">Borrar</a>
                        </td>
                    </tr>`
            });
            contenedor_cl.innerHTML = resultados_cl
        },
        error: (err) => {
            console.log(err);
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
    });
};

document.addEventListener("DOMContentLoaded", getAll_cl);

document.addEventListener("click", (e) => {

    if (e.target.matches(".btnBorrarCl")) {
        const fila = e.target.parentNode.parentNode
        const id = fila.firstElementChild.innerHTML
        console.log('Este es el id de la finca a eliminar: ' , id)
        alertify.confirm(`¿Estás seguro de eliminar el codigo ${id}?`,
            function () {
                ajax_cl({
                    url: url_cl+("/")+id,
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    success: (res) => location.reload(),
                    error: (err) => alert(err),
                    data: {
                        "id": id
                    },
                });
                alertify.success('Finca eliminada')
                location.reload()
            },
            function () {
                alertify.error('Eliminacion de Finca cancelada')
            });
        
    }
    if (e.target.matches(".btnEditarCl")) {
        const fila = e.target.parentNode.parentNode
        idCliente.value = fila.children[0].innerHTML
        nombreCliente.value = fila.children[1].innerHTML
        edadCliente.value = fila.children[2].innerHTML
        correoCliente.value = fila.children[3].innerHTML
        contraseñaCliente.value = fila.children[4].innerHTML
        opcion_cl = 'editar'
        modalCliente.show()
    }
})

formCliente.addEventListener('submit', (e) => {
    e.preventDefault()
    let metodo = "POST"
    let url2 = url_cl +("/save")
    if (opcion_cl == 'editar') {
        metodo = "PUT"
        url2 = url_cl +("/update")
    }
    ajax_cl({
        url: url2,
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        success: (res) => (alertify.success('Cliente guardado'),
                        window.setTimeout(function(){location.reload()},1200)),
        error: (err) =>
            $formCliente.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
        data: {
            "idClient": idCliente.value,
            "name": nombreCliente.value,
            "age": edadCliente.value,
            "email": correoCliente.value,
            "password": contraseñaCliente.value
        },
    });
    modalCliente.hide()
})
