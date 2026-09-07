$(document).ready(function () {

    var baseUrl = 'http://127.0.0.1:9000/clinica-san-rafael';

    var medicoEditandoId = null;

    actualizarTablaMedicos();

    $('#agregarMedicoBtn').click(function () {
        $('#medicoForm')[0].reset();
        medicoEditandoId = null;
        $('#modalMedicoLabel').text('Registro de médico');
        $('#modalMedico').modal('show');
    });

    $('#guardarMedico').click(function () {
        var medicoData = {
            documentType: $('#documentType').val(),
            document: $('#document').val(),
            firstName: $('#firstName').val(),
            secondName: $('#secondName').val(),
            firstLastName: $('#firstLastName').val(),
            secondLastName: $('#secondLastName').val(),
            phoneNumber: $('#phoneNumber').val(),
            mail: $('#mail').val(),
            status: $('#status').val() === 'true'
        };

        if (medicoEditandoId) {
            $.ajax({
                url: baseUrl + '/medicos/' + medicoEditandoId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(medicoData),
                success: function () {
                    alert('Cambios realizados satisfactoriamente!');
                    $('#modalMedico').modal('hide');
                    actualizarTablaMedicos();
                },
                error: function (error) { manejarErrorGuardado(error); }
            });
        } else {
            $.ajax({
                url: baseUrl + '/medicos',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(medicoData),
                success: function () {
                    alert('Médico agregado satisfactoriamente!');
                    $('#modalMedico').modal('hide');
                    actualizarTablaMedicos();
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

    $('#medicoTable').on('click', '.eliminar-medico', function () {
        var id = $(this).data('id');
        var nombre = $(this).closest('tr').find('td:eq(2)').text();
        if (confirm('¿Está seguro de que desea eliminar al médico ' + nombre + '?')) {
            $.ajax({
                url: baseUrl + '/medicos/' + id,
                type: 'DELETE',
                success: function () {
                    alert('El médico ' + nombre + ' fue eliminado exitosamente.');
                    actualizarTablaMedicos();
                },
                error: function (error) {
                    alert('Hubo un error al intentar eliminar al médico ' + nombre + '.');
                    console.error(error);
                }
            });
        }
    });

    $('#medicoTable').on('click', '.editar-medico', function () {
        var id = $(this).data('id');
        $.ajax({
            url: baseUrl + '/medicos',
            type: 'GET',
            success: function (response) {
                var medico = response.find(function (m) { return m.id === id; });
                if (!medico) return;

                medicoEditandoId = id;
                $('#documentType').val(medico.documentType);
                $('#document').val(medico.document);
                $('#firstName').val(medico.firstName);
                $('#secondName').val(medico.secondName);
                $('#firstLastName').val(medico.firstLastName);
                $('#secondLastName').val(medico.secondLastName);
                $('#phoneNumber').val(medico.phoneNumber);
                $('#mail').val(medico.mail);
                $('#status').val(medico.status ? 'true' : 'false');

                $('#modalMedicoLabel').text('Editar médico');
                $('#modalMedico').modal('show');
            },
            error: function (error) {
                console.error(error);
                alert('Hubo un error al intentar obtener los datos del médico.');
            }
        });
    });

    $('#searchMedico').on('keyup', function () {
        var searchText = $(this).val().toLowerCase();
        $.ajax({
            url: baseUrl + '/medicos',
            type: 'GET',
            success: function (response) {
                var filtrados = response.filter(function (medico) {
                    return (
                        String(medico.id).includes(searchText) ||
                        (medico.document || '').toLowerCase().includes(searchText) ||
                        (medico.firstName || '').toLowerCase().includes(searchText) ||
                        (medico.firstLastName || '').toLowerCase().includes(searchText) ||
                        (medico.mail || '').toLowerCase().includes(searchText)
                    );
                });
                renderizarTabla(filtrados);
            },
            error: function (error) {
                console.error(error);
                alert('Hubo un error al intentar obtener los datos de los médicos.');
            }
        });
    });

    function nombre(medico) {
        return [medico.firstName, medico.secondName].filter(Boolean).join(' ');
    }

    function apellidos(medico) {
        return [medico.firstLastName, medico.secondLastName].filter(Boolean).join(' ');
    }

    function badgeEstado(status) {
        var clase = status ? 'is-inactive' : 'is-active';
        var texto = status ? 'Deshabilitado' : 'Habilitado';
        return '<span class="badge-status ' + clase + '">' + texto + '</span>';
    }

    function actualizarTablaMedicos() {
        $.ajax({
            url: baseUrl + '/medicos',
            type: 'GET',
            success: function (response) { renderizarTabla(response); },
            error: function (error) {
                console.error(error);
                alert('Hubo un error al intentar obtener los datos de los médicos.');
            }
        });
    }

    function renderizarTabla(medicos) {
        var tbody = $('#medicoTable tbody');
        tbody.empty();

        if (!medicos.length) {
            tbody.append('<tr><td colspan="8"><div class="empty-state"><i class="bx bx-user-voice"></i>Todavía no hay médicos registrados.</div></td></tr>');
            return;
        }

        medicos.forEach(function (medico) {
            var fila = '<tr>' +
                '<td>' + medico.id + '</td>' +
                '<td>' + medico.documentType + ' · ' + medico.document + '</td>' +
                '<td>' + nombre(medico) + '</td>' +
                '<td>' + apellidos(medico) + '</td>' +
                '<td>' + medico.phoneNumber + '</td>' +
                '<td>' + medico.mail + '</td>' +
                '<td>' + badgeEstado(medico.status) + '</td>' +
                '<td>' +
                '<div class="row-actions">' +
                '<button class="btn btn-sm btn-primary editar-medico" data-id="' + medico.id + '"><i class="bx bx-edit"></i> Editar</button>' +
                '<button class="btn btn-sm btn-danger eliminar-medico" data-id="' + medico.id + '"><i class="bx bx-trash"></i> Eliminar</button>' +
                '</div>' +
                '</td>' +
                '</tr>';
            tbody.append(fila);
        });
    }
});
