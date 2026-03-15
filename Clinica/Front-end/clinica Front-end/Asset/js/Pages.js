$(document).ready(function () {

    // URL de base de la API //
    var baseUrl = 'http://127.0.0.1:9000/Clinica';

    // Contador de los id de las 3 vistas //
    var contadorMedicos = 1;
    var contadorPacientes = 1;
    var contadorIngresos = 1;

    // Los id para editar //
    var medicoEditandoId = null;
    var pacienteEditandoId = null;
    var ingresoEditandoId = null;

    actualizarTablasMedicos();
    actualizarTablasPacientes();

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

        // Peticion del GET (Buscar), del medico al Back-end //
        $('#searchMedico').on('change', function () {
            var searchText = $(this).val().toLowerCase();
            return (
                medico.id.toLowerCase().includes(searchText) ||
                medico.documentType.toLowerCase().includes(searchText) ||
                medico.document.toLowerCase().includes(searchText) ||
                medico.firstName.toLowerCase().includes(searchText) ||
                medico.firstLastName.toLowerCase().includes(searchText) ||
                medico.mail.toLowerCase().includes(searchText)
            );
        });
        // Actualizar la vista de la tabla con los resultados filtrados
        // actualizarTablaMedicos(filteredMedicos);
    });

    // Peticion del DELETE (Eliminar), del medico al Back-end //
    $('#medicoTable').on('click', '.eliminar-medico', function () {
        var idMedico = $(this).data('id');
        var nombreMedico = obtenerNombrePersona($(this));
        // Preguntar al usuario si está seguro de eliminar al médico //
        if (confirm("¿Está seguro de que desea eliminar al médico " + nombreMedico + "?")) {
            // Envía una solicitud AJAX para eliminar el médico de la base de datos //
            $.ajax({
                url: baseUrl + '/medicos/' + idMedico,
                type: 'DELETE',
                success: function (response) {
                    // Si la eliminación en el servidor es exitosa, elimina la fila de la tabla //
                    eliminarFila($(this));
                    // Muestra un mensaje de éxito al usuario //
                    alert("El médico " + nombreMedico + " fue eliminado exitosamente.");
                    actualizarTablasMedicos();
                },
                error: function (error) {
                    // Si hay un error en la eliminación en el servidor, muestra un mensaje de error //
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
    function actualizarTablaMedicos(medicos) {
        // Limpiar la tabla antes de agregar los resultados de la búsqueda
        $('#medicoTable tbody').empty();

        // Iterar sobre los resultados de la búsqueda y agregarlos a la tabla
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
                    actualizarTablaPacientes()
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
                    actualizarTablaPacientes()
                },
                error: function (error) {
                    alert("Hubo un error al intentar agregar el paciente.");
                    console.error(error);
                }
            });
        }

        // Peticion del GET (Buscar), del paciente al Back-end //
        $('#searchPaciente').on('keyup', function () {
            var searchText = $(this).val().toLowerCase();
            var pacientesFiltrados = pacientes.filter(function (paciente) {
                return (
                    paciente.id.toLowerCase().includes(searchText) ||
                    paciente.documentType.toLowerCase().includes(searchText) ||
                    paciente.document.toLowerCase().includes(searchText) ||
                    paciente.firstName.toLowerCase().includes(searchText) ||
                    paciente.firstLastName.toLowerCase().includes(searchText) ||
                    paciente.mail.toLowerCase().includes(searchText)
                );
            });
            actualizarTablaPacientes(pacientesFiltrados);
        });
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
    // function actualizarTablasPacientes(pacientes) {
    //     $('#pacienteTable tbody').empty();
    //     pacientes.forEach(function (paciente) {
    //         var fila = '<tr>' +
    //             '<td>' + paciente.id + '</td>' +
    //             '<td>' + paciente.documentType + '</td>' +
    //             '<td>' + paciente.document + '</td>' +
    //             '<td>' + paciente.firstName + '</td>' +
    //             '<td>' + paciente.secondName + '</td>' +
    //             '<td>' + paciente.firstLastName + '</td>' +
    //             '<td>' + paciente.secondLastName + '</td>' +
    //             '<td>' + paciente.phoneNumber + '</td>' +
    //             '<td>' + paciente.mail + '</td>' +
    //             '<td>' + paciente.contactPersonName + '</td>' +
    //             '<td>' + paciente.contactPersonPhone + '</td>' +
    //             '<td>' + (paciente.status ? 'Deshabilitado' : 'Habilitado') + '</td>' +
    //             '<td>' +
    //             '<button class="btn btn-sm btn-primary editar-paciente" data-id="' + paciente.id + '">Editar</button>' +
    //             '<button class="btn btn-sm btn-danger eliminar-paciente" data-id="' + paciente.id + '">Eliminar</button>' +
    //             '</td>' +
    //             '</tr>';
    //         $('#pacienteTable tbody').append(fila);
    //     });
    // }
    function actualizarTablasPacientes() {
        $.ajax({
            url: baseUrl + '/pacientes',
            type: 'GET',
            success: function (response) {
                actualizarTablaPacientes(response);
            },
            error: function (error) {
                console.error(error);
                alert("Hubo un error al intentar cargar los pacientes.");
            }
        });
    }
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

    // Ingreso //
    $('#agregarIngresoBtn').click(function () {
        $('#IngresoForm')[0].reset();
        ingresoEditandoId = null;
        $('#modalIngreso').modal('show');
    });

    $('#guardarIngreso').click(function () {
        var fechaActual = new Date().toISOString().slice(0, 16).replace("T", " ");
        $('#admision_date').val(fechaActual);

        var ingresoData = {
            room: $('#room').val(),
            bed: $('#bed').val(),
            petent: $('#petent').val(),
            doctor: $('#doctor').val(),
            admision_date: admision_date,
            status: $('#status').val()
        };

        // Peticion del PUT, de ingreso al Back-end //
        if (ingresoEditandoId) {
            $.ajax({
                url: baseUrl + '/ingresos/' + ingresoEditandoId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(ingresoData),
                success: function (response) {
                    alert("Cambios realizados satisfactoriamente!");
                    actualizarTablasIngresos();
                },
                error: function (error) {
                    if (error.status === 400 && error.responseText === "El campo 'Estado', no puede qudar vacío") {
                        alert(error.responseText)
                    } else {
                        alert("Hubo un error al intentar guardar los cambios.");
                        console.error(error);
                    }
                }
            });
            // Peticion del POST, de ingreso al Back-end //
        } else {
            $.ajax({
                url: baseUrl + '/ingresos',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(ingresoData),
                success: function (response) {
                    alert("Ingreso registrado satisfactoriamente!");
                    actualizarTablasIngresos();
                },
                error: function (error) {
                    alert("Hubo un error al intentar registrar el ingreso.");
                    console.error(error);
                }
            });
        }

        // Peticion del GET (Buscar), del ingreso al Back-end //
        $('#searchIngreso').on('change', function () {
            var searchText = $(this).val().toLowerCase();
            return (
                ingreso.id.toLowerCase().includes(searchText) ||
                ingreso.documentType.toLowerCase().includes(searchText) ||
                ingreso.document.toLowerCase().includes(searchText) ||
                ingreso.firstName.toLowerCase().includes(searchText) ||
                ingreso.firstLastName.toLowerCase().includes(searchText) ||
                ingreso.mail.toLowerCase().includes(searchText)
            );
        });
        // Actualizar la vista de la tabla con los resultados filtrados
        // actualizarTablaINgresos(filteredINgresos);
        $('#modalIngreso').modal('hide');
        // $('#IngresoForm')[0].reset();
    });

    // Peticion del DELETE (Eliminar), del ingreso al Back-end //
    $('#ingresoTable').on('click', '.eliminar-ingreso', function () {
        var idIngreso = $(this).data('id');
        var nombreIngreso = obtenerNombrePersona($(this));
        // Preguntar al usuario si está seguro de eliminar al ingreso //
        if (confirm("¿Está seguro de que desea eliminar al ingreso " + nombreIngreso + "?")) {
            // Envía una solicitud AJAX para eliminar el ingreso de la base de datos //
            $.ajax({
                url: baseUrl + '/ingreso/' + idIngreso,
                type: 'DELETE',
                success: function (response) {
                    // Si la eliminación en el servidor es exitosa, elimina la fila de la tabla //
                    eliminarFila($(this));
                    // Muestra un mensaje de éxito al usuario //
                    alert("El ingreso " + nombreIngreso + " fue eliminado exitosamente.");
                    actualizarTablasIngresos();
                },
                error: function (error) {
                    // Si hay un error en la eliminación en el servidor, muestra un mensaje de error //
                    alert("Hubo un error al intentar eliminar al ingreso " + nombreIngreso + ".");
                    console.error(error);
                }
            });
        }
    });

    // Funcion del id unico de las 3 vistas //
    function generarIDMedico() {
        return "MED" + contadorMedicos;
    }

    function generarIDPaciente() {
        return "PAC" + contadorPacientes;
    }

    function generarIDIngreso() {
        return "ING" + contadorIngresos;
    }

    // Funcion de editar al medico //
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



    // Manejar clics en botones de editar y eliminar de la tabla de pacientes //
    $('#pacienteTable').on('click', '.editar-paciente', function () {
        var idPaciente = $(this).data('id');
        pacienteEditandoId = idPaciente;
        var pacienteData = obtenerDatosFila($(this));
        llenarFormularioPaciente(pacienteData);
        $('#modalPaciente').modal('show');
    });

    // Manejar clics en botones de editar y eliminar de la tabla de ingresos //
    $('#IngresoTable').on('click', '.editar-ingreso', function () {
        var idIngreso = $(this).data('id');
        ingresoEditandoId = idIngreso;
        // Obtener los datos del ingreso de la fila correspondiente en la tabla //
        var ingresoData = obtenerDatosFila($(this));
        // Llenar el formulario del modal con los datos del ingreso //
        llenarFormularioIngreso(ingresoData);
        // Mostrar el modal //
        $('#modalIngreso').modal('show');
    });

    $('#IngresoTable').on('click', '.eliminar-ingreso', function () {
        var idIngreso = $(this).data('id');
        var nombrePaciente = obtenerNombrePersona($(this));
        // Preguntar al usuario si está seguro de eliminar el ingreso //
        if (confirm("¿Está seguro de que desea eliminar el ingreso del paciente " + nombrePaciente + "?")) {
            // Eliminar el ingreso de la tabla //
            eliminarFila($(this));
            // Mostrar mensaje de éxito //
            alert("El ingreso del paciente " + nombrePaciente + " fue eliminado exitosamente.");
        }
    });

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

    // Función para llenar el formulario del ingreso con los datos de un ingreso //
    function llenarFormularioIngreso(ingresoData) {
        $('#habitacion').val(ingresoData.habitacion);
        $('#cama').val(ingresoData.cama);
        $('#paciente').val(ingresoData.paciente);
        $('#medico').val(ingresoData.medico);
        $('#fecha_ingreso').val(ingresoData.fechaIngreso);
        $('#estado_ingreso').val(ingresoData.estado);
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
});