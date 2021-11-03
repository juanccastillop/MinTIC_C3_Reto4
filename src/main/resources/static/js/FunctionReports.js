const url = "http://localhost:8080/api/Reservation"
const contenedor_estados = document.getElementById('tbodyReporteEstados')
const contenedor_clientes = document.getElementById('tbodyReporteClientes')
const contenedor_fecha = document.getElementById('tbodyReporteFecha')
let resultados_estados = ''
let resultados_clientes = ''
let resultados_fecha = ''
let opcion = ''

const modalReporteFecha = new bootstrap.Modal(document.getElementById('modalReporteFecha'))
const formReporteFecha = document.getElementById('formuReporteFecha')
const fechaInReserva = document.getElementById('fechaInReser')
const fechaFinReserva = document.getElementById('fechaFinReser')

const ajax = (options) => {
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

const getAll_estados = () => {
    ajax({
        url: url+("/report-status"),
        method: "GET",
        success: (res) => {
            console.log(res);
                    resultados_estados += `<tr>
                        <td width="15%" align="center">${res.completed}</td>
                        <td width="15%" align="center">${res.cancelled}</td>
                    </tr>`
            contenedor_estados.innerHTML = resultados_estados
        },
        error: (err) => {
            console.log(err);
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
    });
};

document.addEventListener("DOMContentLoaded", getAll_estados);

const getAll_clientes = () => {
    ajax({
        url: url+("/report-clients"),
        method: "GET",
        success: (res) => {
            console.log(res);
                res.forEach((clientes) => {
                    resultados_clientes += `<tr>
                        <td width="15%" align="center">${clientes.total}</td>
                        <td width="15%" align="center">${clientes.client.name}</td>
                    </tr>`
                });
            contenedor_clientes.innerHTML = resultados_clientes
        },
        error: (err) => {
            console.log(err);
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
    });
};

document.addEventListener("DOMContentLoaded", getAll_clientes);

cerrar.addEventListener('click', () => {
    location.reload()
})

btnReporteFecha.addEventListener('click', () => {
    fechaInReserva.value = ''
    fechaFinReserva.value = ''
    modalReporteFecha.show()
    opcion = 'crear'
})

formReporteFecha.addEventListener('submit', (e) => {
    e.preventDefault()
    
    ajax({
        url: url+("/report-dates/")+fechaInReserva.value+"/"+fechaFinReserva.value,
        method: "GET",
        success: (res) => {
            console.log(res);
                res.forEach((fechas) => {
                    resultados_fecha += `<tr>
                        <td width="15%" align="center">${fechas.devolutionDate}</td>
                        <td width="15%" align="center">${fechas.startDate}</td>
                        <td width="15%" align="center">${fechas.status}</td>
                    </tr>`
                });
            contenedor_fecha.innerHTML = resultados_fecha
        },
        error: (err) => {
            console.log(err);
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
    });
    modalReporteFecha.hide()
})