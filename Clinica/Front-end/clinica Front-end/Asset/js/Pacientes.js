$(document).ready(function () {

    // URL de base de la API //
    var baseUrl = 'http://127.0.0.1:9000/Clinica';

    // Contador de los id de los pacientes //
    var contadorPacientes = 1;

    // El id para editar //
    var pacienteEditandoId = null;

    actualizarTablasPacientes();

    // Paciente //
    $('#agregarPacienteBtn').click(function () {
        $('#PacienteForm')[0].reset();
        pacienteEditandoId = null;
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
            status: $('#status').val()
        };

        // Peticion del PUT (Editar), del paciente al Back-end //
        if (pacienteEditandoId) {
            $.ajax({
                url: baseUrl + '/pacientes/' + pacienteEditandoId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(pacienteData),
                success: function (response) {
                    alert("Cambios realizados satisfactoriamente!");
                    actualizarTablasPacientes()
                    $('#modalPaciente').modal('hide');
                },
                error: function (error) {
                    if (error.status === 400 && error.responseText === "El campo 'Estado', no puede quedar vacío.") {
                        alert(error.responseText);
                    } else {
                        alert("Hubo un error al intentar guardar los cambios.");
                        console.error(error);
                    }
                }
            });

            // Peticion del POST (Agregar), del paciente al Back-end //
        } else {
            $.ajax({
                url: baseUrl + '/pacientes',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(pacienteData),
                success: function (response) {
                    alert("Paciente agregado satisfactoriamente!");
                    actualizarTablasPacientes()
                },
                error: function (error) {
                    alert("Hubo un error al intentar agregar el paciente.");
                    console.error(error);
                }
            });
        }
    });

    // Peticion del DELETE (Eliminar), del paciente al Back-end //
    $('#pacienteTable').on('click', '.eliminar-paciente', function () {
        var idPaciente = $(this).data('id');
        var nombrePaciente = obtenerNombrePersona($(this));
        if (confirm("¿Está seguro de que desea eliminar al paciente " + nombrePaciente + "?")) {
            $.ajax({
                url: baseUrl + '/pacientes/' + idPaciente,
                type: 'DELETE',
                success: function (response) {
                    eliminarFila($(this));
                    alert("El paciente " + nombrePaciente + " fue eliminado exitosamente.");
                    actualizarTablasPacientes();
                },
                error: function (error) {
                    alert("Hubo un error al intentar eliminar al paciente " + nombrePaciente + ".");
                    console.error(error);
                }
            });
        }
    });
    $('#modalPaciente').modal('hide');

    // Función para obtener y mostrar los datos de los pacientes en la tabla //
    function actualizarTablasPacientes(pacientes) {
        $.ajax({
            url: baseUrl + '/pacientes',
            type: 'GET',
            success: function (response) {
                $('#pacienteTable tbody').empty();
                response.forEach(function (paciente) {
                    var fila = '<tr>' +
                        '<td>' + paciente.id + '</td>' +
                        '<td>' + paciente.documentType + '</td>' +
                        '<td>' + paciente.document + '</td>' +
                        '<td>' + paciente.firstName + '</td>' +
                        '<td>' + paciente.secondName + '</td>' +
                        '<td>' + paciente.firstLastName + '</td>' +
                        '<td>' + paciente.secondLastName + '</td>' +
                        '<td>' + paciente.phoneNumber + '</td>' +
                        '<td>' + paciente.mail + '</td>' +
                        '<td>' + paciente.contactPersonName + '</td>' +
                        '<td>' + paciente.contactPersonPhone + '</td>' +
                        '<td>' + (paciente.status ? 'Deshabilitado' : 'Habilitado') + '</td>' +
                        '<td>' +
                        '<button class="btn btn-sm btn-primary editar-paciente" data-id="' + paciente.id + '">Editar</button>' +
                        '<button class="btn btn-sm btn-danger eliminar-paciente" data-id="' + paciente.id + '">Eliminar</button>' +
                        '</td>' +
                        '</tr>';
                    $('#pacienteTable tbody').append(fila);
                });
            },
            error: function (error) {
                console.error(error);
                alert("Hubo un error al intentar obtener los datos de los pacientes.");
            }
        });
    }

    // Funcion del ID unico \\

    function generarIDPaciente() {
        return "PAS" + contadorPacientes;
    }

    // Función para obtener los datos de una fila de la tabla //
    function obtenerDatosFila(elemento) {
        var fila = elemento.closest('tr');
        var datos = {
            documentType: fila.find('td:eq(1)').text(),
            document: fila.find('td:eq(2)').text(),
            firstName: fila.find('td:eq(3)').text(),
            secondName: fila.find('td:eq(4)').text(),
            firstLastName: fila.find('td:eq(5)').text(),
            secondLastName: fila.find('td:eq(6)').text(),
            phoneNumber: fila.find('td:eq(7)').text(),
            mail: fila.find('td:eq(8)').text(),
            contactPersonName: fila.find('td:eq(9)').text(),
            contactPersonPhone: fila.find('td:eq(10)').text(),
            status: fila.find('td:eq(11)').text()
        };
        return datos;
    }

    // Función para llenar el formulario del paciente con los datos de un paciente //
    function llenarFormularioPaciente(pacienteData) {
        $('#documentType').val(pacienteData.documentType);
        $('#document').val(pacienteData.document);
        $('#firstName').val(pacienteData.firstName);
        $('#secondName').val(pacienteData.secondName);
        $('#firstLastName').val(pacienteData.firstLastName);
        $('#secondLastName').val(pacienteData.secondLastName);
        $('#phoneNumber').val(pacienteData.phoneNumber);
        $('#mail').val(pacienteData.mail);
        $('#contactPersonName').val(pacienteData.contactPersonName);
        $('#contactPersonPhone').val(pacienteData.contactPersonPhone);
        $('#status').val(pacienteData.status);
    }

    // Función para obtener el nombre de la persona de una fila //
    function obtenerNombrePersona(elemento) {
        var fila = elemento.closest('tr');
        var nombre = fila.find('td:eq(3)').text() + " " + fila.find('td:eq(5)').text(); // Primer nombre y primer apellido //
        return nombre;
    }

    // Función para eliminar una fila de la tabla //
    function eliminarFila(elemento) {
        var fila = elemento.closest('tr');
        fila.remove();
    }

    // Peticion del GET (Buscar), del paciente al Back-end //
    $('#searchPaciente').on('keyup', function () {
        var searchText = $(this).val().toLowerCase();
        $.ajax({
            url: baseUrl + '/pacientes',
            type: 'GET',
            success: function (response) {
                var filteredPacientes = response.filter(function (paciente) {
                    return (
                        paciente.id.toString().toLowerCase().includes(searchText) ||
                        paciente.documentType.toLowerCase().includes(searchText) ||
                        paciente.document.toLowerCase().includes(searchText) ||
                        paciente.firstName.toLowerCase().includes(searchText) ||
                        paciente.firstLastName.toLowerCase().includes(searchText) ||
                        paciente.mail.toLowerCase().includes(searchText)
                    );
                });
                actualizarTablaPacientes(filteredPacientes);
            },
            error: function (error) {
                console.error(error);
                alert("Hubo un error al intentar obtener los datos de los pacientes.")
            }
        }
        )
    });

    function actualizarTablaPacientes(pacientes) {
        $('#pacienteTable tbody').empty();
        pacientes.forEach(function (paciente) {
            var fila = '<tr>' +
                '<td>' + paciente.id + '</td>' +
                '<td>' + paciente.documentType + '</td>' +
                '<td>' + paciente.document + '</td>' +
                '<td>' + paciente.firstName + '</td>' +
                '<td>' + paciente.secondName + '</td>' +
                '<td>' + paciente.firstLastName + '</td>' +
                '<td>' + paciente.secondLastName + '</td>' +
                '<td>' + paciente.phoneNumber + '</td>' +
                '<td>' + paciente.mail + '</td>' +
                '<td>' + paciente.contactPersonName + '</td>' +
                '<td>' + paciente.contactPersonPhone + '</td>' +
                '<td>' + (paciente.status ? 'Deshabilitado' : 'Habilitado') + '</td>' +
                '<td>' +
                '<button class="btn btn-sm btn-primary editar-paciente" data-id="' + paciente.id + '">Editar</button>' +
                '<button class="btn btn-sm btn-danger eliminar-paciente" data-id="' + paciente.id + '">Eliminar</button>' +
                '</td>' +
                '</tr>';
            $('#pacienteTable tbody').append(fila);
        });
    }

    $('#pacienteTable').on('click', '.editar-paciente', function () {
        var idPaciente = $(this).data('id');
        pacienteEditandoId = idPaciente;
        // Obtener los datos del médico de la fila correspondiente en la tabla //
        var pacienteData = obtenerDatosFila($(this));
        // Llenar el formulario del modal con los datos del médico //
        llenarFormularioPaciente(pacienteData);
        // Mostrar el modal //
        $('#modalPaciente').modal('show');
    });
});