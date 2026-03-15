$(document).ready(function () {
    // URL de base de la API //
    var baseUrl = 'http://127.0.0.1:9000/Clinica';

    // Contador de los id de las 3 vistas //
    var contadorMedicos = 1;

    // Los id para editar //
    var medicoEditandoId = null;

    actualizarTablasMedicos();

    // Medico //
    $('#agregarMedicoBtn').click(function () {
        $('#medicoForm')[0].reset();
        medicoEditandoId = null;
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
            status: $('#status').val()
        };

        // Peticion del PUT (Editar), del medico al Back-end //
        if (medicoEditandoId) {
            $.ajax({
                url: baseUrl + '/medicos/' + medicoEditandoId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(medicoData),
                success: function (response) {
                    alert("Cambios realizados satisfactoriamente!");
                    actualizarTablasMedicos();
                    $('#modalMedico').modal('hide');
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

            // Peticion del POST (Agregar), del medico al Back-end //           
        } else {
            $.ajax({
                url: baseUrl + '/medicos',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(medicoData),
                success: function (response) {
                    alert("Médico agregado satisfactoriamente!");
                    actualizarTablasMedicos();
                },
                error: function (error) {
                    alert("Hubo un error al intentar agregar el médico.");
                    console.error(error);
                }
            });
        }

    });

    // Peticion del DELETE (Eliminar), del medico al Back-end //
    $('#medicoTable').on('click', '.eliminar-medico', function () {
        var idMedico = $(this).data('id');
        var nombreMedico = obtenerNombrePersona($(this));
        if (confirm("¿Está seguro de que desea eliminar al médico " + nombreMedico + "?")) {
            $.ajax({
                url: baseUrl + '/medicos/' + idMedico,
                type: 'DELETE',
                success: function (response) {
                    eliminarFila($(this));
                    alert("El médico " + nombreMedico + " fue eliminado exitosamente.");
                    actualizarTablasMedicos();
                },
                error: function (error) {
                    alert("Hubo un error al intentar eliminar al médico " + nombreMedico + ".");
                    console.error(error);
                }
            });
        }
    });

    $('#modalMedico').modal('hide');

    // Función para obtener y mostrar los datos de los médicos en la tabla
    function actualizarTablasMedicos(medicos) {
        $.ajax({
            url: baseUrl + '/medicos',
            type: 'GET',
            success: function (response) {
                $('#medicoTable tbody').empty();
                response.forEach(function (medico) {
                    var fila = '<tr>' +
                        '<td>' + medico.id + '</td>' +
                        '<td>' + medico.documentType + '</td>' +
                        '<td>' + medico.document + '</td>' +
                        '<td>' + medico.firstName + '</td>' +
                        '<td>' + medico.secondName + '</td>' +
                        '<td>' + medico.firstLastName + '</td>' +
                        '<td>' + medico.secondLastName + '</td>' +
                        '<td>' + medico.phoneNumber + '</td>' +
                        '<td>' + medico.mail + '</td>' +
                        '<td>' + (medico.status ? 'Deshabilitado' : 'Habilitado') + '</td>' +
                        '<td>' +
                        '<button class="btn btn-sm btn-primary editar-medico" data-id="' + medico.id + '">Editar</button>' +
                        '<button class="btn btn-sm btn-danger eliminar-medico" data-id="' + medico.id + '">Eliminar</button>' +
                        '</td>' +
                        '</tr>';
                    $('#medicoTable tbody').append(fila);
                });
            },
            error: function (error) {
                console.error(error);
                alert("Hubo un error al intentar obtener los datos de los médicos.");
            }
        });
    }


    // Funcion del ID unico \\

    function generarIDMedico() {
        return "MED" + contadorMedicos;
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

    // Función para llenar el formulario del médico con los datos de un médico //
    function llenarFormularioMedico(medicoData) {
        $('#documentType').val(medicoData.documentType);
        $('#document').val(medicoData.document);
        $('#firstName').val(medicoData.firstName);
        $('#secondName').val(medicoData.secondName);
        $('#firstLastName').val(medicoData.firstLastName);
        $('#secondLastName').val(medicoData.secondLastName);
        $('#phoneNumber').val(medicoData.phoneNumber);
        $('#mail').val(medicoData.mail);
        $('#status').val(medicoData.status);
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

    // Peticion del GET (Buscar), del medico al Back-end //
    $('#searchMedico').on('keyup', function () {
        var searchText = $(this).val().toLowerCase();
        $.ajax({
            url: baseUrl + '/medicos',
            type: 'GET',
            success: function (response) {
                var filteredMedicos = response.filter(function (medico) {
                    return (
                        medico.id.toString().toLowerCase().includes(searchText) ||
                        medico.documentType.toLowerCase().includes(searchText) ||
                        medico.document.toLowerCase().includes(searchText) ||
                        medico.firstName.toLowerCase().includes(searchText) ||
                        medico.firstLastName.toLowerCase().includes(searchText) ||
                        medico.mail.toLowerCase().includes(searchText)
                    );
                });
                actualizarTablaMedicos(filteredMedicos);
            },
            error: function (error) {
                console.error(error);
                alert("Hubo un error al intentar obtener los datos de los médicos.");
            }
        });
    });

    function actualizarTablaMedicos(medicos) {
        $('#medicoTable tbody').empty();
        medicos.forEach(function (medico) {
            var fila = '<tr>' +
                '<td>' + medico.id + '</td>' +
                '<td>' + medico.documentType + '</td>' +
                '<td>' + medico.document + '</td>' +
                '<td>' + medico.firstName + '</td>' +
                '<td>' + medico.secondName + '</td>' +
                '<td>' + medico.firstLastName + '</td>' +
                '<td>' + medico.secondLastName + '</td>' +
                '<td>' + medico.phoneNumber + '</td>' +
                '<td>' + medico.mail + '</td>' +
                '<td>' + (medico.status ? 'Deshabilitado' : 'Habilitado') + '</td>' +
                '<td>' +
                '<button class="btn btn-sm btn-primary editar-medico" data-id="' + medico.id + '">Editar</button>' +
                '<button class="btn btn-sm btn-danger eliminar-medico" data-id="' + medico.id + '">Eliminar</button>' +
                '</td>' +
                '</tr>';
            $('#medicoTable tbody').append(fila);
        });
    }

    $('#medicoTable').on('click', '.editar-medico', function () {
        var idMedico = $(this).data('id');
        medicoEditandoId = idMedico;
        // Obtener los datos del médico de la fila correspondiente en la tabla //
        var medicoData = obtenerDatosFila($(this));
        // Llenar el formulario del modal con los datos del médico //
        llenarFormularioMedico(medicoData);
        // Mostrar el modal //
        $('#modalMedico').modal('show');
    });
});