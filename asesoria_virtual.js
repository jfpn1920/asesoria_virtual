//----------------------------------------------//
//--|funcionalidad_asesoria_virtual|--//
//----------------------------------------------//
// Obtenemos el formulario principal.
const formulario_asesoria_virtual =
    document.getElementById("formulario_asesoria_virtual");
// Obtenemos los campos del formulario.
const nombre_asesoria_virtual =
    document.getElementById("nombre_asesoria_virtual");
const correo_asesoria_virtual =
    document.getElementById("correo_asesoria_virtual");
const tipo_asesoria_virtual =
    document.getElementById("tipo_asesoria_virtual");
const fecha_asesoria_virtual =
    document.getElementById("fecha_asesoria_virtual");
const hora_asesoria_virtual =
    document.getElementById("hora_asesoria_virtual");
const motivo_asesoria_virtual =
    document.getElementById("motivo_asesoria_virtual");
// Obtenemos los botones y el espacio de mensajes.
const boton_limpiar_asesoria =
    document.getElementById("boton_limpiar_asesoria");
const mensaje_asesoria_virtual =
    document.getElementById("mensaje_asesoria_virtual");
// Definimos la clave para almacenar los datos.
const clave_asesoria_virtual = "datos_asesoria_virtual";
// Guardamos los campos que deben conservar su información.
const campos_asesoria_virtual = [
    nombre_asesoria_virtual,
    correo_asesoria_virtual,
    tipo_asesoria_virtual,
    fecha_asesoria_virtual,
    hora_asesoria_virtual,
    motivo_asesoria_virtual
];
// Establecemos la fecha mínima permitida: hoy.
const hoy_asesoria_virtual = new Date();
const anio_asesoria_virtual = hoy_asesoria_virtual.getFullYear();
const mes_asesoria_virtual = String(
    hoy_asesoria_virtual.getMonth() + 1
).padStart(2, "0");
const dia_asesoria_virtual = String(
    hoy_asesoria_virtual.getDate()
).padStart(2, "0");
fecha_asesoria_virtual.min =
    `${anio_asesoria_virtual}-${mes_asesoria_virtual}-${dia_asesoria_virtual}`;
// Guardamos los datos actuales en localStorage.
function guardar_asesoria_virtual() {
    const datos_asesoria_virtual = {};
    // Recorremos los campos y obtenemos sus valores.
    campos_asesoria_virtual.forEach(function(campo_asesoria_virtual) {
        datos_asesoria_virtual[campo_asesoria_virtual.name] =
            campo_asesoria_virtual.value;
    });
    // Convertimos los datos en texto JSON.
    localStorage.setItem(
        clave_asesoria_virtual,
        JSON.stringify(datos_asesoria_virtual)
    );
}
// Recuperamos los datos guardados anteriormente.
function recuperar_asesoria_virtual() {
    const datos_guardados_asesoria_virtual =
        localStorage.getItem(clave_asesoria_virtual);
    // Si existen datos, los cargamos en el formulario.
    if (datos_guardados_asesoria_virtual) {
        try {
            const datos_asesoria_virtual =
                JSON.parse(datos_guardados_asesoria_virtual);
            campos_asesoria_virtual.forEach(
                function(campo_asesoria_virtual) {
                    if (
                        typeof datos_asesoria_virtual[campo_asesoria_virtual.name]
                        === "string"
                    ) {
                        campo_asesoria_virtual.value =
                            datos_asesoria_virtual[campo_asesoria_virtual.name];
                    }
                }
            );
        } catch (error_asesoria_virtual) {
            // Eliminamos los datos si el contenido no es válido.
            localStorage.removeItem(clave_asesoria_virtual);
        }
    }
}
// Mostramos un mensaje al usuario.
function mostrar_mensaje_asesoria_virtual(texto_asesoria_virtual, tipo_mensaje_asesoria_virtual) {
    mensaje_asesoria_virtual.textContent = texto_asesoria_virtual;
    mensaje_asesoria_virtual.className =
        "mensaje_asesoria_virtual " + tipo_mensaje_asesoria_virtual;
}
// Guardamos automáticamente al modificar cualquier campo.
campos_asesoria_virtual.forEach(function(campo_asesoria_virtual) {
    campo_asesoria_virtual.addEventListener("input", function() {
        guardar_asesoria_virtual();
        mensaje_asesoria_virtual.textContent = "";
        mensaje_asesoria_virtual.className = "mensaje_asesoria_virtual";
    });
    // También guardamos los cambios de los selectores.
    campo_asesoria_virtual.addEventListener("change", function() {
        guardar_asesoria_virtual();
    });
});
// Validamos el formulario al solicitar una asesoría.
formulario_asesoria_virtual.addEventListener("submit", function(evento_asesoria_virtual) {
    // Evitamos que la página se recargue al enviar.
    evento_asesoria_virtual.preventDefault();
    // Verificamos que los campos obligatorios sean válidos.
    if (!formulario_asesoria_virtual.checkValidity()) {
        formulario_asesoria_virtual.reportValidity();
        mostrar_mensaje_asesoria_virtual(
            "Por favor, completa correctamente todos los campos.",
            "error"
        );
        return;
    }
    // Impedimos seleccionar una fecha anterior a hoy.
    if (fecha_asesoria_virtual.value < fecha_asesoria_virtual.min) {
        mostrar_mensaje_asesoria_virtual(
            "Selecciona una fecha válida para la asesoría.",
            "error"
        );
        return;
    }
    // Conservamos los datos de la solicitud.
    guardar_asesoria_virtual();
    // Informamos que la solicitud está preparada.
    mostrar_mensaje_asesoria_virtual(
        "Formulario validado y datos guardados en este navegador. La solicitud aún no se ha enviado a un asesor.",
        "exito"
    );
});
// Limpiamos los campos cuando el usuario lo decida.
boton_limpiar_asesoria.addEventListener("click", function() {
    // Borramos los valores del formulario.
    formulario_asesoria_virtual.reset();
    // Eliminamos los datos almacenados.
    localStorage.removeItem(clave_asesoria_virtual);
    // Quitamos los mensajes anteriores.
    mensaje_asesoria_virtual.textContent = "";
    mensaje_asesoria_virtual.className = "mensaje_asesoria_virtual";
    // Volvemos a establecer la fecha mínima permitida.
    fecha_asesoria_virtual.min =
        `${anio_asesoria_virtual}-${mes_asesoria_virtual}-${dia_asesoria_virtual}`;
});
// Restauramos la información al abrir o recargar la página.
recuperar_asesoria_virtual();