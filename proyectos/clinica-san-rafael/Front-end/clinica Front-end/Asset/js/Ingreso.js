$(document).ready(function () {

    var baseUrl = 'http://127.0.0.1:9000/clinica-san-rafael';

    var ingresoEditandoId = null;

    cargarSelects();
    actualizarTablaIngresos();

    $('#agregarIngresoBtn').click(function () {
        $('#IngresoForm')[0].reset();
        ingresoEditandoId = null;
        $('#modalIngresoLabel').text('Registro de ingreso');
        $('#modalIngreso').modal('show');
    });

    $('#guardarIngreso').click(function () {
        var patientId = $('#patientId').val();
        var doctorId = $('#doctorId').val();

        if (!patientId || !doctorId) {
            alert('Debe seleccionar un paciente y un médico.');
            return;
        }

        var ingresoData = {
            room: $('#room').val(),
            bed: $('#bed').val(),
            admissionDate: $('#admissionDate').val(),
            dischargeDate: $('#dischargeDate').val() || null,
            status: $('#status').val(),
            paciente: { id: parseInt(patientId, 10) },
            medico: { id: parseInt(doctorId, 10) }
        };

        if (ingresoEditandoId) {
            $.ajax({
                url: baseUrl + '/ingresos/' + ingresoEditandoId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(ingresoData),
                success: function () {
                    alert('Cambios realizados satisfactoriamente!');
                    $('#modalIngreso').modal('hide');
                    actualizarTablaIngresos();
                },
                error: function (error) {
                    manejarErrorGuardado(error);
                }
            });
        } else {
            $.ajax({
                url: baseUrl + '/ingresos',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(ingresoData),
                success: function () {
                    alert('Ingreso registrado satisfactoriamente!');
                    $('#modalIngreso').modal('hide');
                    actualizarTablaIngresos();
                },
                error: function (error) {
                    manejarErrorGuardado(error);
                }
            });
        }
    });

    function manejarErrorGuardado(error) {
        if (error.status === 400) {
            alert(error.responseText);
        } else {
            alert('Hubo un error al intentar guardar el ingreso.');
            console.error(error);
        }
    }

    $('#ingresoTable').on('click', '.editar-ingreso', function () {
        var id = $(this).data('id');
        $.ajax({
            url: baseUrl + '/ingresos',
            type: 'GET',
            success: function (response) {
                var ingreso = response.find(function (i) { return i.id === id; });
                if (!ingreso) return;

                ingresoEditandoId = id;
                $('#room').val(ingreso.room);
                $('#bed').val(ingreso.bed);
                $('#admissionDate').val(ingreso.admissionDate);
                $('#dischargeDate').val(ingreso.dischargeDate || '');
                $('#status').val(ingreso.status);
                $('#patientId').val(ingreso.paciente ? ingreso.paciente.id : '');
                $('#doctorId').val(ingreso.medico ? ingreso.medico.id : '');

                $('#modalIngresoLabel').text('Editar ingreso');
                $('#modalIngreso').modal('show');
            },
            error: function (error) {
                console.error(error);
                alert('Hubo un error al intentar obtener los datos del ingreso.');
            }
        });
    });

    $('#ingresoTable').on('click', '.eliminar-ingreso', function () {
        var id = $(this).data('id');
        var nombre = $(this).closest('tr').find('td:eq(3)').text();
        if (confirm('¿Está seguro de que desea eliminar el ingreso de ' + nombre + '?')) {
            $.ajax({
                url: baseUrl + '/ingresos/' + id,
                type: 'DELETE',
                success: function () {
                    alert('El ingreso fue eliminado exitosamente.');
                    actualizarTablaIngresos();
                },
                error: function (error) {
                    alert('Hubo un error al intentar eliminar el ingreso.');
                    console.error(error);
                }
            });
        }
    });

    $('#searchIngreso').on('keyup', function () {
        var searchText = $(this).val().toLowerCase();
        $.ajax({
            url: baseUrl + '/ingresos',
            type: 'GET',
            success: function (response) {
                var filtrados = response.filter(function (ingreso) {
                    var paciente = nombreCompleto(ingreso.paciente).toLowerCase();
                    var medico = nombreCompleto(ingreso.medico).toLowerCase();
                    return (
                        paciente.includes(searchText) ||
                        medico.includes(searchText) ||
                        (ingreso.room || '').toLowerCase().includes(searchText)
                    );
                });
                renderizarTabla(filtrados);
            },
            error: function (error) {
                console.error(error);
            }
        });
    });

    function cargarSelects() {
        $.ajax({
            url: baseUrl + '/pacientes',
            type: 'GET',
            success: function (response) {
                var select = $('#patientId');
                response.forEach(function (paciente) {
                    select.append('<option value="' + paciente.id + '">' + nombreCompleto(paciente) + '</option>');
                });
            },
            error: function (error) {
                console.error(error);
                alert('Hubo un error al intentar obtener los pacientes.');
            }
        });

        $.ajax({
            url: baseUrl + '/medicos',
            type: 'GET',
            success: function (response) {
                var select = $('#doctorId');
                response.forEach(function (medico) {
                    select.append('<option value="' + medico.id + '">' + nombreCompleto(medico) + '</option>');
                });
            },
            error: function (error) {
                console.error(error);
                alert('Hubo un error al intentar obtener los médicos.');
            }
        });
    }

    function nombreCompleto(persona) {
        if (!persona) return 'Sin datos';
        return [persona.firstName, persona.secondName, persona.firstLastName, persona.secondLastName]
            .filter(Boolean).join(' ');
    }

    function badgeEstado(status) {
        var esAlta = (status || '').toLowerCase().indexOf('alta') !== -1;
        var clase = esAlta ? 'is-active' : 'is-info';
        return '<span class="badge-status ' + clase + '">' + status + '</span>';
    }

    function actualizarTablaIngresos() {
        $.ajax({
            url: baseUrl + '/ingresos',
            type: 'GET',
            success: function (response) {
                renderizarTabla(response);
            },
            error: function (error) {
                console.error(error);
                alert('Hubo un error al intentar obtener los datos de los ingresos.');
            }
        });
    }

    function renderizarTabla(ingresos) {
        var tbody = $('#ingresoTable tbody');
        tbody.empty();

        if (!ingresos.length) {
            tbody.append('<tr><td colspan="9"><div class="empty-state"><i class="bx bx-bed"></i>Todavía no hay ingresos registrados.</div></td></tr>');
            return;
        }

        ingresos.forEach(function (ingreso) {
            var fila = '<tr>' +
                '<td>' + ingreso.id + '</td>' +
                '<td>' + ingreso.room + '</td>' +
                '<td>' + ingreso.bed + '</td>' +
                '<td>' + nombreCompleto(ingreso.paciente) + '</td>' +
                '<td>' + nombreCompleto(ingreso.medico) + '</td>' +
                '<td>' + (ingreso.admissionDate || '-') + '</td>' +
                '<td>' + (ingreso.dischargeDate || '-') + '</td>' +
                '<td>' + badgeEstado(ingreso.status) + '</td>' +
                '<td>' +
                '<div class="row-actions">' +
                '<button class="btn btn-sm btn-primary editar-ingreso" data-id="' + ingreso.id + '"><i class="bx bx-edit"></i> Editar</button>' +
                '<button class="btn btn-sm btn-danger eliminar-ingreso" data-id="' + ingreso.id + '"><i class="bx bx-trash"></i> Eliminar</button>' +
                '</div>' +
                '</td>' +
                '</tr>';
            tbody.append(fila);
        });
    }
});
