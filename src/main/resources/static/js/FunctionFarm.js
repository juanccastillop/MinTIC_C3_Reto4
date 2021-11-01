const url = "http://localhost:8080/api/Farm"
const contenedor_f = document.getElementById('tbodyFinca')
let resultados_f = ''
let opcion_f = ''

const modalFinca = new bootstrap.Modal(document.getElementById('modalFinca'))
const formFinca = document.getElementById('formularioFinca')
const idFinca = document.getElementById('id')
const nombreFinca = document.getElementById('nombre')
const direccionFinca = document.getElementById('direccion')
const extensionFinca = document.getElementById('extension')
const descripcionFinca = document.getElementById('descripcion')
const categoriaFinca = document.getElementById('selCategoria')

function getNombreCategorias(){
    ajax_f({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#selCategoria");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}

btnCrear.addEventListener('click', () => {
    nombreFinca.value = ''
    direccionFinca.value = ''
    extensionFinca.value = ''
    descripcionFinca.value = ''
    categoriaFinca.value= getNombreCategorias()
    modalFinca.show()
    opcion_f = 'crear'
})

cerrar.addEventListener('click', () => {
    location.reload()
})

const ajax_f = (options) => {
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

const getAll_f = () => {
    ajax_f({
        url: url+("/all"),
        method: "GET",
        success: (res) => {
            console.log("json getAll",res);

            res.forEach((fincas) => {
                resultados_f += `<tr>
                        <td width="10%" style="display:none">${fincas.id}</td>
                        <td width="15%">${fincas.name}</td>
                        <td width="15%">${fincas.address}</td>
                        <td width="15%">${fincas.extension}</td>
                        <td width="15%">${fincas.description}</td>
                        <td width="15%">${fincas.category.name}</td>
                        <td class="text-center" width="20%">
                            <a class="btnEditarF btn btn-outline-success">Editar</a>
                            <a class="btnBorrarF btn btn-outline-danger">Borrar</a>
                        </td>
                    </tr>`
            });
            contenedor_f.innerHTML = resultados_f
        },
        error: (err) => {
            console.log(err);
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
    });
};

document.addEventListener("DOMContentLoaded", getAll_f);

document.addEventListener("click", (e) => {

    if (e.target.matches(".btnBorrarF")) {
        const fila = e.target.parentNode.parentNode
        const id = fila.firstElementChild.innerHTML
        console.log('Este es el id del elemento: ' , id)
        alertify.confirm(`¿Estás seguro de eliminar la finca ${id}?`,
            function () {
                ajax_f({
                    url: url+("/")+id,
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "id": id
                    },
                    error: (err) => {alertify.error('La Finca no puede ser eliminada dado que contiene Mensajes relacionados'),
                    console.log(err)},                    
                });
                window.setTimeout(function(){location.reload()},2000)
            },
            function () {
                alertify.warning('Eliminacion de Finca cancelada')
            });
        
    }
    if (e.target.matches(".btnEditarF")) {
        const fila = e.target.parentNode.parentNode
        idFinca.value = fila.children[0].innerHTML
        nombreFinca.value = fila.children[1].innerHTML
        direccionFinca.value = fila.children[2].innerHTML
        extensionFinca.value = fila.children[3].innerHTML
        descripcionFinca.value = fila.children[4].innerHTML
        categoriaFinca.value = getNombreCategorias()
        opcion_f = 'editar'
        modalFinca.show()
    }
})

formFinca.addEventListener('submit', (e) => {
    e.preventDefault()
    let metodo = "POST"
    let url2 = url +("/save")
    if (opcion_f == 'editar') {
        metodo = "PUT"
        url2 = url +("/update")
    }
    ajax_f({
        url: url2,
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        success: (res) => (alertify.success('Finca guardada'),
                        window.setTimeout(function(){location.reload()},1200)),
        error: (err) =>
            $formfinca.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
        data: {
            "id": idFinca.value,
            "name": nombreFinca.value,
            "address": direccionFinca.value,
            "extension": extensionFinca.value,
            "description": descripcionFinca.value,
            "category": {"id": categoriaFinca.value}
        },
    });
    modalFinca.hide()
})
