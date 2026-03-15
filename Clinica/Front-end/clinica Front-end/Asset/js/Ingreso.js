// // Ingreso //
// $(document).ready(function () {

//     // URL de base de la API \\
//     var baseUrl = 'http://localhost:9000/Clinica';

//     // Contador de los Id de los ingresos \\
//     var contadorIngresos = 1;

//     actualizarTablasIngresos();

//     // Ingreso \\
//     $('#agregarIngresoBtn').click(function () {
//         $('#IngresoForm')[0].reset();
//         ingresoEditandoId = null;
//         $('#modalIngreso').modal('show');
//     });

//     $('#guardarIngreso').click(function () {
//         var fechaActual = new Date();
//         var dia = agregarCeroDelante(fechaActual.getDate());
//         var mes = agregarCeroDelante(fechaActual.getMonth() + 1);
//         var anio = fechaActual.getFullYear();
//         var formatoFecha = anio + '-' + mes + '-' + dia;
//         function agregarCeroDelante(numero) {
//             return numero < 10 ? '0' + numero : numero;
//         }
//         $('#admission_date').val(formatoFecha);
//         var ingresoData = {
//             room: $('#room').val(),
//             bed: $('#bed').val(),
//             petent: $('#petent').val(),
//             doctor: $('#doctor').val(),
//             admission_date: formatoFecha,
//             status: ' En observación',
//             doctor_id: null,
//             patient_id: null,
//         };

//         // Peticion del PUT (Editar), de ingreso al Back-end //
//         if (ingresoEditandoId) {
//             $.ajax({
//                 url: baseUrl + '/ingresos/' + ingresoEditandoId,
//                 type: 'PUT',
//                 contentType: 'application/json',
//                 data: JSON.stringify(ingresoData),
//                 success: function (response) {
//                     alert("Cambios realizados satisfactoriamente!");
//                     actualizarTablasIngresos();
//                     $('#modalIngreso').modal('hide');
//                 },
//                 error: function (error) {
//                     if (error.status === 400 && error.responseText === "El campo 'Estado', no puede qudar vacío") {
//                         alert(error.responseText)
//                     } else {
//                         alert("Hubo un error al intentar guardar los cambios.");
//                         console.error(error);
//                     }
//                 }
//             });

//             // Peticion del POST (Agregar), de ingreso al Back-end //
//         } else {
//             $.ajax({
//                 url: baseUrl + '/ingresos',
//                 type: 'POST',
//                 contentType: 'application/json',
//                 data: JSON.stringify(ingresoData),
//                 success: function (response) {
//                     alert("Ingreso registrado satisfactoriamente!");
//                     $('#modalIngreso').modal('hide');
//                     actualizarTablasIngresos();
//                 },
//                 error: function (error) {
//                     alert("Hubo un error al intentar registrar el ingreso.");
//                     console.error(error);
//                 }
//             });
//         }

//         // Peticion del GET (Buscar), del ingreso al Back-end //
//         $('#searchIngreso').on('change', function () {
//             var searchText = $(this).val().toLowerCase();
//             return (
//                 ingreso.id.toLowerCase().includes(searchText) ||
//                 ingreso.documentType.toLowerCase().includes(searchText) ||
//                 ingreso.document.toLowerCase().includes(searchText) ||
//                 ingreso.firstName.toLowerCase().includes(searchText) ||
//                 ingreso.firstLastName.toLowerCase().includes(searchText)
//             );
//         });
//     });

//     // Peticion del DELETE (Eliminar), del ingreso al Back-end //
//     $('#ingresoTable').on('click', '.eliminar-ingreso', function () {
//         var idIngreso = $(this).data('id');
//         var nombreIngreso = obtenerNombrePersona($(this));
//         if (confirm("¿Está seguro de que desea eliminar al ingreso " + nombreIngreso + "?")) {
//             $.ajax({
//                 url: baseUrl + '/ingresos/' + idIngreso,
//                 type: 'DELETE',
//                 success: function (response) {
//                     eliminarFila($(this));
//                     alert("El ingreso " + nombreIngreso + " fue eliminado exitosamente.");
//                     actualizarTablasIngresos();
//                 },
//                 error: function (error) {
//                     alert("Hubo un error al intentar eliminar al ingreso " + nombreIngreso + ".");
//                     console.error(error);
//                 }
//             });
//         }
//     });


//     $('#modalIngreso').modal('hide');

//     // Función para actualizar la tabla de ingresos
//     function actualizarTablasIngresos() {
//         $.ajax({
//             url: baseUrl + '/ingresos',
//             type: 'GET',
//             success: function (response) {
//                 $('#IngresoTable tbody').empty();
//                 response.forEach(function (ingreso) {
//                     // Aquí puedes hacer una llamada AJAX para obtener el nombre del paciente y del médico basándote en los IDs
//                     $.when(
//                         $.ajax({
//                             url: baseUrl + '/pacientes/' + ingreso.patient_id,
//                             type: 'GET'
//                         }),
//                         $.ajax({
//                             url: baseUrl + '/medicos/' + ingreso.doctor_id,
//                             type: 'GET'
//                         })
//                     ).done(function (paciente, medico) {
//                         var pacienteNombre = "";
//                         var medicoNombre = "";
//                         if (paciente[0]) {
//                             pacienteNombre = paciente[0].firstName + " " + paciente[0].secondName + " " + paciente[0].firstLastName + " " + paciente[0].secondLastName;
//                         }
//                         if (medico[0]) {
//                             medicoNombre = medico[0].firstName + " " + medico[0].secondName + " " + medico[0].firstLastName + " " + medico[0].secondLastName;
//                         }
//                         var fila = '<tr>' +
//                             '<td>' + ingreso.id + '</td>' +
//                             '<td>' + ingreso.room + '</td>' +
//                             '<td>' + ingreso.bed + '</td>' +
//                             '<td>' + pacienteNombre + '</td>' +
//                             '<td>' + medicoNombre + '</td>' +
//                             '<td>' + ingreso.admission_date + '</td>' +
//                             '<td>' + ingreso.discharge_date + '</td>' +
//                             '<td>' + (ingreso.status ? 'Observacion' : 'En alta') + '</td>' +
//                             '<td>' +
//                             '<button class="btn btn-sm btn-primary editar-ingreso" data-id="' + ingreso.id + '">Editar</button>' +
//                             '<button class="btn btn-sm btn-danger eliminar-ingreso" data-id="' + ingreso.id + '">Eliminar</button>' +
//                             '</td>' +
//                             '</tr>';
//                         $('#IngresoTable tbody').append(fila);
//                     }).fail(function (error) {
//                         console.error(error);
//                     });
//                 });
//             },
//             error: function (error) {
//                 console.error(error);
//                 alert("Hubo un error al intentar obtener los datos de los ingresos.");
//             }
//         });
//     }


//     function actualizarTablaIngresos(ingresos) {
//         $('#ingresoTable tbody').empty();
//         ingresos.forEach(function (ingreso) {
//             var fila = '<tr>' +
//                 '<td>' + ingreso.id + '</td>' +
//                 '<td>' + ingreso.room + '</td>' +
//                 '<td>' + ingreso.bed + '</td>' +
//                 '<td>' + ingreso.patient + '</td>' +
//                 '<td>' + ingreso.doctor + '</td>' +
//                 '<td>' + ingreso.admission_date + '</td>' +
//                 '<td>' + ingreso.discharge_date + '</td>' +
//                 '<td>' + (ingreso.status ? 'Observacion' : 'En alta') + '</td>' +
//                 '<td>' +
//                 '<button class="btn btn-sm btn-primary editar-ingreso" data-id="' + ingreso.id + '">Editar</button>' +
//                 '<button class="btn btn-sm btn-danger eliminar-ingreso" data-id="' + ingreso.id + '">Eliminar</button>' +
//                 '</td>' +
//                 '</tr>';
//             $('#ingresoTable tbody').append(fila);
//         });
//     }

//     // Funcion del ID unico \\

//     function generarIDIngreso() {
//         return "PAS" + contadorIngresos;
//     }

//     // Función para obtener los datos de una fila de la tabla //
//     function obtenerDatosFila(elemento) {
//         var fila = elemento.closest('tr');
//         var datos = {
//             room: fila.find('td:eq(1)').text(),
//             bed: fila.find('td:eq(2)').text(),
//             patient: fila.find('td:eq(3)').text(),
//             admission_date: fila.find('td:eq(4)').text(),
//             discharge_date: fila.find('td:eq(5)').text(),
//             status: fila.find('td:eq(11)').text()
//         };
//         return datos;
//     }

//     // Función para llenar el formulario del Ingreso con los datos de un ingreso //
//     function llenarFormularioIngreso(ingresoData) {
//         $('#room').val(ingresoData.room);
//         $('#bed').val(ingresoData.bed);
//         $('#patient').val(ingresoData.patient);
//         $('#admissionDate').val(ingresoData.admissionDate);
//         $('#dischargeDate').val(ingresoData.dischargeDate);
//         $('#status').val(ingresoData.status);
//     }

//     // Función para obtener el nombre de la persona de una fila //
//     function obtenerNombrePersona(elemento) {
//         var fila = elemento.closest('tr');
//         var nombre = fila.find('td:eq(3)').text() + " " + fila.find('td:eq(5)').text();
//         return nombre;
//     }

//     // Función para eliminar una fila de la tabla //
//     function eliminarFila(elemento) {
//         var fila = elemento.closest('tr');
//         fila.remove();
//     }

//     // Función para seleccionar un médico y cargarlo en el input del doctor
//     function seleccionarMedico() {
//         var medicoSeleccionadoId = $('input[type="checkbox"]:checked').val();
//         var medicoSeleccionadoNombre = $('input[type="checkbox"]:checked').next('label').text();
//         $('#doctor').val(medicoSeleccionadoNombre);
//         $('#modalSeleccionDoctor').modal('hide');

//         guardarIngresoConMedico(medicoSeleccionadoId);
//     }

//     // Llamar a la función cargarMedicos cuando se abra el modal de selección de médico
//     $('#modalSeleccionDoctor').on('show.bs.modal', function () {
//         cargarMedicos();
//     });

//     // Evento de clic para seleccionar un médico y cerrar el modal
//     $('#modalSeleccionDoctor').on('click', '.btn-secondary', function () {
//         seleccionarMedico();
//     });

//     // Función para cargar los médicos al modal de selección de médico
//     function cargarMedicos() {
//         $.ajax({
//             url: baseUrl + '/medicos',
//             type: 'GET',
//             success: function (response) {
//                 $('#modalSeleccionDoctor .modal-body').empty();
//                 response.forEach(function (medico) {
//                     var fila = '<div>' +
//                         '<input type="checkbox" id="medico_' + medico.id + '" value="' + medico.id + '">' +
//                         '<label for="medico_' + medico.id + '">' + medico.firstName + ' ' + medico.secondName + ' ' + medico.firstLastName + ' ' + medico.secondLastName + '</label>' +
//                         '</div>';
//                     $('#modalSeleccionDoctor .modal-body').append(fila);
//                 });
//             },
//             error: function (error) {
//                 console.error(error);
//                 alert("Hubo un error al intentar obtener los datos de los médicos.");
//             }
//         });
//     }

//     // Evento de clic para abrir el modal de selección de médico y cargar la lista de médicos
//     $('#selectDoctorBtn').click(function () {
//         $('#modalSeleccionDoctor').modal('show');
//     });

//     // Función para seleccionar un paciente y cargarlo en el input del patient
//     function seleccionarPaciente() {
//         var pacienteSeleccionadoId = $('input[type="checkbox"]:checked').val();
//         var pacienteSeleccionadoNombre = $('input[type="checkbox"]:checked').next('label').text();
//         $('#patient').val(pacienteSeleccionadoNombre);
//         $('#modalSeleccionPaciente').modal('hide');

//         guardarIngresoConPaciente(pacienteSeleccionadoId);
//     }

//     // Llamar a la función cargarPaciente cuando se abra el modal de selección de paciente
//     $('#modalSeleccionPaciente').on('show.bs.modal', function () {
//         cargarPaciente();
//     });

//     // Evento de clic para seleccionar un paciente y cerrar el modal
//     $('#modalSeleccionPaciente').on('click', '.btn-secondary', function () {
//         seleccionarPaciente();
//     });

//     // Función para cargar los pacientes al modal de selección de paciente
//     function cargarPaciente() {
//         $.ajax({
//             url: baseUrl + '/pacientes',
//             type: 'GET',
//             success: function (response) {
//                 $('#modalSeleccionPaciente .modal-body').empty();
//                 response.forEach(function (paciente) {
//                     var fila = '<div>' +
//                         '<input type="checkbox" id="paciente_' + paciente.id + '" value="' + paciente.id + '">' +
//                         '<label for="paciente_' + paciente.id + '">' + paciente.firstName + ' ' + paciente.secondName + ' ' + paciente.firstLastName + ' ' + paciente.secondLastName + '</label>' +
//                         '</div>';
//                     $('#modalSeleccionPaciente .modal-body').append(fila);
//                 });
//             },
//             error: function (error) {
//                 console.error(error);
//                 alert("Hubo un error al intentar obtener los datos de los pacientes.");
//             }
//         });
//     }

//     // Evento de clic para abrir el modal de selección de médico y cargar la lista de pacientes
//     $('#selectPatientBtn').click(function () {
//         $('#modalSeleccionPaciente').modal('show');
//     });

//     // Función para guardar el ingreso con el médico seleccionado
//     function guardarIngresoConMedico(medicoId) {
//         ingresoData.doctor_id = medicoId;
//         $.ajax({
//             url: baseUrl + '/ingresos',
//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify(ingresoData),
//             success: function (response) {
//                 alert("Ingreso registrado satisfactoriamente!");
//                 $('#modalIngreso').modal('hide');
//                 actualizarTablasIngresos();
//             },
//             error: function (error) {
//                 alert("Hubo un error al intentar registrar el ingreso.");
//                 console.error(error);
//             }
//         });
//     }

//     // Función para guardar el ingreso con el paciente seleccionado
//     function guardarIngresoConPaciente(pacienteId) {
//         ingresoData.patient_id = pacienteId;
//         $.ajax({
//             url: baseUrl + '/ingresos',
//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify(ingresoData),
//             success: function (response) {
//                 alert("Ingreso registrado satisfactoriamente!");
//                 $('#modalIngreso').modal('hide');
//                 actualizarTablasIngresos();
//             },
//             error: function (error) {
//                 alert("Hubo un error al intentar registrar el ingreso.");
//                 console.error(error);
//             }
//         });
//     }

// });



// Ingreso //
$(document).ready(function () {

    // URL de base de la API \\
    var baseUrl = 'http://localhost:9000/Clinica';

    // Contador de los Id de los ingresos \\
    var contadorIngresos = 1;

    actualizarTablasIngresos();

    // Ingreso \\
    $('#agregarIngresoBtn').click(function () {
        $('#IngresoForm')[0].reset();
        ingresoEditandoId = null;
        $('#modalIngreso').modal('show');
    });

    $('#guardarIngreso').click(function () {
        var fechaActual = new Date();
        var dia = agregarCeroDelante(fechaActual.getDate());
        var mes = agregarCeroDelante(fechaActual.getMonth() + 1);
        var anio = fechaActual.getFullYear();
        var formatoFecha = anio + '-' + mes + '-' + dia;
        function agregarCeroDelante(numero) {
            return numero < 10 ? '0' + numero : numero;
        }
        $('#admission_date').val(formatoFecha);
        var ingresoData = {
            room: $('#room').val(),
            bed: $('#bed').val(),
            petent: $('#petent').val(),
            doctor: $('#doctor').val(),
            admission_date: formatoFecha,
            status: ' En observación',
            doctor_id: null,
            patient_id: null,
        };

        // Peticion del PUT (Editar), de ingreso al Back-end //
        if (ingresoEditandoId) {
            $.ajax({
                url: baseUrl + '/ingresos/' + ingresoEditandoId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(ingresoData),
                success: function (response) {
                    alert("Cambios realizados satisfactoriamente!");
                    actualizarTablasIngresos();
                    $('#modalIngreso').modal('hide');
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

            // Peticion del POST (Agregar), de ingreso al Back-end //
        } else {
            $.ajax({
                url: baseUrl + '/ingresos',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(ingresoData),
                success: function (response) {
                    alert("Ingreso registrado satisfactoriamente!");
                    $('#modalIngreso').modal('hide');
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
                ingreso.firstLastName.toLowerCase().includes(searchText)
            );
        });
    });

    // Peticion del DELETE (Eliminar), del ingreso al Back-end //
    $('#ingresoTable').on('click', '.eliminar-ingreso', function () {
        var idIngreso = $(this).data('id');
        var nombreIngreso = obtenerNombrePersona($(this));
        if (confirm("¿Está seguro de que desea eliminar al ingreso " + nombreIngreso + "?")) {
            $.ajax({
                url: baseUrl + '/ingresos/' + idIngreso,
                type: 'DELETE',
                success: function (response) {
                    eliminarFila($(this));
                    alert("El ingreso " + nombreIngreso + " fue eliminado exitosamente.");
                    actualizarTablasIngresos();
                },
                error: function (error) {
                    alert("Hubo un error al intentar eliminar al ingreso " + nombreIngreso + ".");
                    console.error(error);
                }
            });
        }
    });


    $('#modalIngreso').modal('hide');

    // Función para llenar el formulario del ingreso con los datos de un ingreso //
    function actualizarTablasIngresos() {
        $.ajax({
            url: baseUrl + '/ingresos',
            type: 'GET',
            success: function (response) {
                $('#IngresoTable tbody').empty();
                response.forEach(function (ingreso) {
                    var fila = '<tr>' +
                        '<td>' + ingreso.id + '</td>' +
                        '<td>' + ingreso.room + '</td>' +
                        '<td>' + ingreso.bed + '</td>' +
                        '<td>' + ingreso.patient + '</td>' +
                        '<td>' + ingreso.doctor + '</td>' +
                        '<td>' + ingreso.admission_date + '</td>' +
                        '<td>' + ingreso.discharge_date + '</td>' +
                        '<td>' + (ingreso.status ? 'Observacion' : 'En alta') + '</td>' +
                        '<td>' +
                        '<button class="btn btn-sm btn-primary editar-ingreso" data-id="' + ingreso.id + '">Editar</button>' +
                        '<button class="btn btn-sm btn-danger eliminar-ingreso" data-id="' + ingreso.id + '">Eliminar</button>' +
                        '</td>' +
                        '</tr>';
                    $('#IngresoTable tbody').append(fila);
                });
            },
            error: function (error) {
                console.error(error);
                alert("Hubo un error al intentar obtener los datos de los ingresos.");
            }
        });
    }

    function actualizarTablaIngresos(ingresos) {
        $('#ingresoTable tbody').empty();
        ingresos.forEach(function (ingreso) {
            var fila = '<tr>' +
                '<td>' + ingreso.id + '</td>' +
                '<td>' + ingreso.room + '</td>' +
                '<td>' + ingreso.bed + '</td>' +
                '<td>' + ingreso.patient + '</td>' +
                '<td>' + ingreso.doctor + '</td>' +
                '<td>' + ingreso.admission_date + '</td>' +
                '<td>' + ingreso.discharge_date + '</td>' +
                '<td>' + (ingreso.status ? 'Observacion' : 'En alta') + '</td>' +
                '<td>' +
                '<button class="btn btn-sm btn-primary editar-ingreso" data-id="' + ingreso.id + '">Editar</button>' +
                '<button class="btn btn-sm btn-danger eliminar-ingreso" data-id="' + ingreso.id + '">Eliminar</button>' +
                '</td>' +
                '</tr>';
            $('#ingresoTable tbody').append(fila);
        });
    }

    // Funcion del ID unico \\

    function generarIDIngreso() {
        return "PAS" + contadorIngresos;
    }

    // Función para obtener los datos de una fila de la tabla //
    function obtenerDatosFila(elemento) {
        var fila = elemento.closest('tr');
        var datos = {
            room: fila.find('td:eq(1)').text(),
            bed: fila.find('td:eq(2)').text(),
            patient: fila.find('td:eq(3)').text(),
            admission_date: fila.find('td:eq(4)').text(),
            discharge_date: fila.find('td:eq(5)').text(),
            status: fila.find('td:eq(11)').text()
        };
        return datos;
    }

    // Función para llenar el formulario del Ingreso con los datos de un ingreso //
    function llenarFormularioIngreso(ingresoData) {
        $('#room').val(ingresoData.room);
        $('#bed').val(ingresoData.bed);
        $('#patient').val(ingresoData.patient);
        $('#admissionDate').val(ingresoData.admissionDate);
        $('#dischargeDate').val(ingresoData.dischargeDate);
        $('#status').val(ingresoData.status);
    }

    // Función para obtener el nombre de la persona de una fila //
    function obtenerNombrePersona(elemento) {
        var fila = elemento.closest('tr');
        var nombre = fila.find('td:eq(3)').text() + " " + fila.find('td:eq(5)').text();
        return nombre;
    }

    // Función para eliminar una fila de la tabla //
    function eliminarFila(elemento) {
        var fila = elemento.closest('tr');
        fila.remove();
    }

    // Función para seleccionar un médico y cargarlo en el input del doctor
    function seleccionarMedico() {
        var medicoSeleccionadoId = $('input[type="checkbox"]:checked').data('id');
        var medicoSeleccionadoNombre = $('input[type="checkbox"]:checked').next('label').text();
        $('#doctor').val(medicoSeleccionadoNombre);
        $('#modalSeleccionDoctor').modal('hide');

        // Aquí envía el ID del médico seleccionado al servidor
        guardarIngresoConMedico(medicoSeleccionadoId);
    }

    // Llamar a la función cargarMedicos cuando se abra el modal de selección de médico
    $('#modalSeleccionDoctor').on('show.bs.modal', function () {
        cargarMedicos();
    });

    // Evento de clic para seleccionar un médico y cerrar el modal
    $('#modalSeleccionDoctor').on('click', '.btn-secondary', function () {
        seleccionarMedico();
    });

    // Función para cargar los médicos al modal de selección de médico
    function cargarMedicos() {
        $.ajax({
            url: baseUrl + '/medicos',
            type: 'GET',
            success: function (response) {
                $('#modalSeleccionDoctor .modal-body').empty();
                response.forEach(function (medico) {
                    var fila = '<div>' +
                        '<input type="checkbox" id="medico_' + medico.id + '" value="' + medico.id + '">' +
                        '<label for="medico_' + medico.id + '">' + medico.firstName + ' ' + medico.secondName + ' ' + medico.firstLastName + ' ' + medico.secondLastName + '</label>' +
                        '</div>';
                    $('#modalSeleccionDoctor .modal-body').append(fila);
                });
            },
            error: function (error) {
                console.error(error);
                alert("Hubo un error al intentar obtener los datos de los médicos.");
            }
        });
    }

    // Evento de clic para abrir el modal de selección de médico y cargar la lista de médicos
    $('#selectDoctorBtn').click(function () {
        $('#modalSeleccionDoctor').modal('show');
    });

    // Función para seleccionar un paciente y cargarlo en el input del patient
    function seleccionarPaciente() {
        var pacienteSeleccionadoId = $('input[type="checkbox"]:checked').data('id');
        var pacienteSeleccionadoNombre = $('input[type="checkbox"]:checked').next('label').text();
        $('#patient').val(pacienteSeleccionadoNombre);
        $('#modalSeleccionPaciente').modal('hide');

        // Aquí envía el ID del paciente seleccionado al servidor
        guardarIngresoConPaciente(pacienteSeleccionadoId);
    }

    // Llamar a la función cargarPaciente cuando se abra el modal de selección de paciente
    $('#modalSeleccionPaciente').on('show.bs.modal', function () {
        cargarPaciente();
    });

    // Evento de clic para seleccionar un paciente y cerrar el modal
    $('#modalSeleccionPaciente').on('click', '.btn-secondary', function () {
        seleccionarPaciente();
    });

    // Función para cargar los pacientes al modal de selección de paciente
    function cargarPaciente() {
        $.ajax({
            url: baseUrl + '/pacientes',
            type: 'GET',
            success: function (response) {
                $('#modalSeleccionPaciente .modal-body').empty();
                response.forEach(function (paciente) {
                    var fila = '<div>' +
                        '<input type="checkbox" id="paciente_' + paciente.id + '" value="' + paciente.id + '">' +
                        '<label for="paciente_' + paciente.id + '">' + paciente.firstName + ' ' + paciente.secondName + ' ' + paciente.firstLastName + ' ' + paciente.secondLastName + '</label>' +
                        '</div>';
                    $('#modalSeleccionPaciente .modal-body').append(fila);
                });
            },
            error: function (error) {
                console.error(error);
                alert("Hubo un error al intentar obtener los datos de los pacientes.");
            }
        });
    }

    // Evento de clic para abrir el modal de selección de médico y cargar la lista de pacientes
    $('#selectPatientBtn').click(function () {
        $('#modalSeleccionPaciente').modal('show');
    });

    function guardarIngresoConMedico(medicoId) {
        ingresoData.doctor_id = medicoId;
        $.ajax({
            url: baseUrl + '/ingresos',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(ingresoData),
            success: function (response) {
                alert("Ingreso registrado satisfactoriamente!");
                $('#modalIngreso').modal('hide');
                actualizarTablasIngresos();
            },
            error: function (error) {
                alert("Hubo un error al intentar registrar el ingreso.");
                console.error(error);
            }
        });
    }
    
    function guardarIngresoConPaciente(pacienteId) {
        ingresoData.patient_id = pacienteId;
        $.ajax({
            url: baseUrl + '/ingresos',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(ingresoData),
            success: function (response) {
                alert("Ingreso registrado satisfactoriamente!");
                $('#modalIngreso').modal('hide');
                actualizarTablasIngresos();
            },
            error: function (error) {
                alert("Hubo un error al intentar registrar el ingreso.");
                console.error(error);
            }
        });
    }

});