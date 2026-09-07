$(document).ready(function () {

    var baseUrl = 'http://127.0.0.1:9000/clinica-san-rafael';

    var pacienteEditandoId = null;

    actualizarTablaPacientes();

    $('#agregarPacienteBtn').click(function () {
        $('#PacienteForm')[0].reset();
        pacienteEditandoId = null;
        $('#modalPacienteLabel').text('Registro de paciente');
        $('#modalPaciente').modal('show');
    });

    $('#guardarPaciente').click(function () {
        var pacienteData = {
            documentType: $('#documentType').val(),
            document: $('#document').val(),
            firstName: $('#firstName').val(),
            secondName: $('#secondName').val(),
            firstLastName: $('#firstLastName').val(),
            secondLastName: $('#secondLastName').val(),
            mail: $('#mail').val(),
            phoneNumber: $('#phoneNumber').val(),
            contactPersonName: $('#contactPersonName').val(),
            contactPersonPhone: $('#contactPersonPhone').val(),
            status: $('#status').val() === 'true'
        };

        if (pacienteEditandoId) {
            $.ajax({
                url: baseUrl + '/pacientes/' + pacienteEditandoId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(pacienteData),
                success: function () {
                    alert('Cambios realizados satisfactoriamente!');
                    $('#modalPaciente').modal('hide');
                    actualizarTablaPacientes();
                },
                error: function (error) { manejarErrorGuardado(error); }
            });
        } else {
            $.ajax({
                url: baseUrl + '/pacientes',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(pacienteData),
                success: function () {
                    alert('Paciente agregado satisfactoriamente!');
                    $('#modalPaciente').modal('hide');
                    actualizarTablaPacientes();
                },
                error: function (error) { manejarErrorGuardado(error); }
            });
        }
    });

    function manejarErrorGuardado(error) {
        if (error.status === 400) {
            alert(error.responseText);
        } else {
            alert('Hubo un error al intentar guardar los cambios.');
            console.error(error);
        }
    }

    $('#pacienteTable').on('click', '.eliminar-paciente', function () {
        var id = $(this).data('id');
        var nombre = $(this).closest('tr').find('td:eq(2)').text();
        if (confirm('¿Está seguro de que desea eliminar al paciente ' + nombre + '?')) {
            $.ajax({
                url: baseUrl + '/pacientes/' + id,
                type: 'DELETE',
                success: function () {
                    alert('El paciente ' + nombre + ' fue eliminado exitosamente.');
                    actualizarTablaPacientes();
                },
                error: function (error) {
                    alert('Hubo un error al intentar eliminar al paciente ' + nombre + '.');
                    console.error(error);
                }
            });
        }
    });

    $('#pacienteTable').on('click', '.editar-paciente', function () {
        var id = $(this).data('id');
        $.ajax({
            url: baseUrl + '/pacientes',
            type: 'GET',
            success: function (response) {
                var paciente = response.find(function (p) { return p.id === id; });
                if (!paciente) return;

                pacienteEditandoId = id;
                $('#documentType').val(paciente.documentType);
                $('#document').val(paciente.document);
                $('#firstName').val(paciente.firstName);
                $('#secondName').val(paciente.secondName);
                $('#firstLastName').val(paciente.firstLastName);
                $('#secondLastName').val(paciente.secondLastName);
                $('#mail').val(paciente.mail);
                $('#phoneNumber').val(paciente.phoneNumber);
                $('#contactPersonName').val(paciente.contactPersonName);
                $('#contactPersonPhone').val(paciente.contactPersonPhone);
                $('#status').val(paciente.status ? 'true' : 'false');

                $('#modalPacienteLabel').text('Editar paciente');
                $('#modalPaciente').modal('show');
            },
            error: function (error) {
                console.error(error);
                alert('Hubo un error al intentar obtener los datos del paciente.');
            }
        });
    });

    $('#searchPaciente').on('keyup', function () {
        var searchText = $(this).val().toLowerCase();
        $.ajax({
            url: baseUrl + '/pacientes',
            type: 'GET',
            success: function (response) {
                var filtrados = response.filter(function (paciente) {
                    return (
                        String(paciente.id).includes(searchText) ||
                        (paciente.document || '').toLowerCase().includes(searchText) ||
                        (paciente.firstName || '').toLowerCase().includes(searchText) ||
                        (paciente.firstLastName || '').toLowerCase().includes(searchText) ||
                        (paciente.mail || '').toLowerCase().includes(searchText)
                    );
                });
                renderizarTabla(filtrados);
            },
            error: function (error) {
                console.error(error);
                alert('Hubo un error al intentar obtener los datos de los pacientes.');
            }
        });
    });

    function nombre(paciente) {
        return [paciente.firstName, paciente.secondName].filter(Boolean).join(' ');
    }

    function apellidos(paciente) {
        return [paciente.firstLastName, paciente.secondLastName].filter(Boolean).join(' ');
    }

    function badgeEstado(status) {

        var clase = status ? 'is-inactive' : 'is-active';
        var texto = status ? 'Deshabilitado' : 'Habilitado';
        return '<span class="badge-status ' + clase + '">' + texto + '</span>';
    }

    function actualizarTablaPacientes() {
        $.ajax({
            url: baseUrl + '/pacientes',
            type: 'GET',
            success: function (response) { renderizarTabla(response); },
            error: function (error) {
                console.error(error);
                alert('Hubo un error al intentar obtener los datos de los pacientes.');
            }
        });
    }

    function renderizarTabla(pacientes) {
        var tbody = $('#pacienteTable tbody');
        tbody.empty();

        if (!pacientes.length) {
            tbody.append('<tr><td colspan="9"><div class="empty-state"><i class="bx bx-user"></i>Todavía no hay pacientes registrados.</div></td></tr>');
            return;
        }

        pacientes.forEach(function (paciente) {
            var fila = '<tr>' +
                '<td>' + paciente.id + '</td>' +
                '<td>' + paciente.documentType + ' · ' + paciente.document + '</td>' +
                '<td>' + nombre(paciente) + '</td>' +
                '<td>' + apellidos(paciente) + '</td>' +
                '<td>' + paciente.phoneNumber + '</td>' +
                '<td>' + paciente.mail + '</td>' +
                '<td>' + paciente.contactPersonName + '<br><small class="text-muted">' + paciente.contactPersonPhone + '</small></td>' +
                '<td>' + badgeEstado(paciente.status) + '</td>' +
                '<td>' +
                '<div class="row-actions">' +
                '<button class="btn btn-sm btn-primary editar-paciente" data-id="' + paciente.id + '"><i class="bx bx-edit"></i> Editar</button>' +
                '<button class="btn btn-sm btn-danger eliminar-paciente" data-id="' + paciente.id + '"><i class="bx bx-trash"></i> Eliminar</button>' +
                '</div>' +
                '</td>' +
                '</tr>';
            tbody.append(fila);
        });
    }
});
