const url = "http://localhost:8080/api/Category"
const contenedor_cat = document.getElementById('tbodyCategoria')
let resultados_cat = ''
let opcion_cat = ''

const modalCategoria = new bootstrap.Modal(document.getElementById('modalCategoria'))
const formCategoria = document.getElementById('formularioCategoria')
const idCategoria = document.getElementById('idCat')
const nombreCategoria = document.getElementById('nombreCat')
const descripcionCategoria = document.getElementById('descripcionCat')

btnCrearCategoria.addEventListener('click', () => {
    nombreCategoria.value = ''
    descripcionCategoria.value = ''
    modalCategoria.show()
    opcion_cat = 'crear'
})

cerrarCat.addEventListener('click', () => {
    location.reload()
})

const ajax_cat = (options) => {
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

const getAll_cat = () => {
    ajax_cat({
        url: url+("/all"),
        method: "GET",
        success: (res) => {
            console.log("json getAll",res);

            res.forEach((categorias) => {
                resultados_cat += `<tr>
                        <td width="10%" style="display:none">${categorias.id}</td>
                        <td width="15%">${categorias.name}</td>
                        <td width="15%">${categorias.description}</td>
                        <td class="text-center" width="20%">
                            <a class="btnEditarCat btn btn-outline-success">Editar</a>
                            <a class="btnBorrarCat btn btn-outline-danger">Borrar</a>
                        </td>
                    </tr>`
            });
            contenedor_cat.innerHTML = resultados_cat
        },
        error: (err) => {
            console.log(err);
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
    });
};

document.addEventListener("DOMContentLoaded", getAll_cat);

document.addEventListener("click", (e) => {

    if (e.target.matches(".btnBorrarCat")) {
        const fila = e.target.parentNode.parentNode
        const id = fila.firstElementChild.innerHTML
        console.log('Este es el id del elemento: ' , id)
        alertify.confirm(`¿Estás seguro de eliminar la finca ${id}?`,
            function () {
                ajax_cat({
                    url: url+("/")+id,
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "id": id
                    },
                    error: (err) => {alertify.error('La Categoria no puede ser eliminada dado que contiene Fincas relacionadas'),
                    console.log(err)},                    
                });
                window.setTimeout(function(){location.reload()},2000)
            },
            function () {
                alertify.warning('Eliminacion de Finca cancelada')
            });
        
    }
    if (e.target.matches(".btnEditarCat")) {
        const fila = e.target.parentNode.parentNode
        idCategoria.value = fila.children[0].innerHTML
        nombreCategoria.value = fila.children[1].innerHTML
        descripcionCategoria.value = fila.children[2].innerHTML
        opcion_cat = 'editar'
        modalCategoria.show()
    }
})

formCategoria.addEventListener('submit', (e) => {
    e.preventDefault()
    let metodo = "POST"
    let url2 = url +("/save")
    if (opcion_cat == 'editar') {
        metodo = "PUT"
        url2 = url +("/update")
    }
    ajax_cat({
        url: url2,
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        success: (res) => (alertify.success('Categoria guardada'),
                        window.setTimeout(function(){location.reload()},1200)),
        error: (err) =>
            $formCategoria.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
        data: {
            "id": idCategoria.value,
            "name": nombreCategoria.value,
            "description": descripcionCategoria.value
        },
    });
    modalCategoria.hide()
})
