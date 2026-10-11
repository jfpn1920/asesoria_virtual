//------------------------------------//
//--|funcionalidad_asesoria_virtual|--//
//------------------------------------//
const formulario_asesoria_virtual = document.getElementById("formulario_asesoria_virtual");
const nombre_asesoria_virtual = document.getElementById("nombre_asesoria_virtual");
const correo_asesoria_virtual = document.getElementById("correo_asesoria_virtual");
const tipo_asesoria_virtual = document.getElementById("tipo_asesoria_virtual");
const fecha_asesoria_virtual = document.getElementById("fecha_asesoria_virtual");
const hora_asesoria_virtual = document.getElementById("hora_asesoria_virtual");
const motivo_asesoria_virtual = document.getElementById("motivo_asesoria_virtual");
const boton_limpiar_asesoria = document.getElementById("boton_limpiar_asesoria");
const mensaje_asesoria_virtual = document.getElementById("mensaje_asesoria_virtual");
const clave_asesoria_virtual = "datos_asesoria_virtual";
const campos_asesoria_virtual = [nombre_asesoria_virtual, correo_asesoria_virtual, tipo_asesoria_virtual, fecha_asesoria_virtual, hora_asesoria_virtual, motivo_asesoria_virtual];
const hoy_asesoria_virtual = new Date();
const anio_asesoria_virtual = hoy_asesoria_virtual.getFullYear();
const mes_asesoria_virtual = String(hoy_asesoria_virtual.getMonth() + 1).padStart(2, "0");
const dia_asesoria_virtual = String(hoy_asesoria_virtual.getDate()).padStart(2, "0");
fecha_asesoria_virtual.min = `${anio_asesoria_virtual}-${mes_asesoria_virtual}-${dia_asesoria_virtual}`;
//---------------------------------------------------//
//--|guardar_y_recuperar_los_datos_en_localstorage|--//
//---------------------------------------------------//
function guardar_asesoria_virtual() {
    const datos_asesoria_virtual = {};
    campos_asesoria_virtual.forEach(function(campo_asesoria_virtual) {
        datos_asesoria_virtual[campo_asesoria_virtual.name] = campo_asesoria_virtual.value;
    });
    localStorage.setItem(clave_asesoria_virtual, JSON.stringify(datos_asesoria_virtual));
}
function recuperar_asesoria_virtual() {
    const datos_guardados_asesoria_virtual = localStorage.getItem(clave_asesoria_virtual);
    if (datos_guardados_asesoria_virtual) {
        try {
            const datos_asesoria_virtual = JSON.parse(datos_guardados_asesoria_virtual);
            campos_asesoria_virtual.forEach(
                function(campo_asesoria_virtual) {
                    if (typeof datos_asesoria_virtual[campo_asesoria_virtual.name] === "string") {
                        campo_asesoria_virtual.value = datos_asesoria_virtual[campo_asesoria_virtual.name];
                    }
                }
            );
        } 
        catch (error_asesoria_virtual) {
            localStorage.removeItem(clave_asesoria_virtual);
        }
    }
}
//--------------------------//
//--|mostramos_un_mensaje|--//
//--------------------------//
function mostrar_mensaje_asesoria_virtual(texto_asesoria_virtual, tipo_mensaje_asesoria_virtual) {
    mensaje_asesoria_virtual.textContent = texto_asesoria_virtual;
    mensaje_asesoria_virtual.className = "mensaje_asesoria_virtual " + tipo_mensaje_asesoria_virtual;
}
//------------------------------------------//
//--|guardar_automaticamente_al_modificar|--//
//------------------------------------------//
campos_asesoria_virtual.forEach(function(campo_asesoria_virtual) {
    campo_asesoria_virtual.addEventListener("input", function() {
        guardar_asesoria_virtual();
        mensaje_asesoria_virtual.textContent = "";
        mensaje_asesoria_virtual.className = "mensaje_asesoria_virtual";
    });
    campo_asesoria_virtual.addEventListener("change", function() {
        guardar_asesoria_virtual();
    });
});
//-----------------------------------------------------//
//--|validar_el_formulario_al_solicitar_una_asesoría|--//
//-----------------------------------------------------//
formulario_asesoria_virtual.addEventListener("submit", function(evento_asesoria_virtual) {
    evento_asesoria_virtual.preventDefault();
    if (!formulario_asesoria_virtual.checkValidity()) {
        formulario_asesoria_virtual.reportValidity();
        mostrar_mensaje_asesoria_virtual("Por favor, completa correctamente todos los campos.", "error");
        return;
    }
    if (fecha_asesoria_virtual.value < fecha_asesoria_virtual.min) {
        mostrar_mensaje_asesoria_virtual("Selecciona una fecha válida para la asesoría.", "error");
        return;
    }
    guardar_asesoria_virtual();
    mostrar_mensaje_asesoria_virtual("Formulario validado y datos guardados en este navegador. La solicitud aún no se ha enviado a un asesor.", "exito");
});
//--------------------------------------------//
//--|limpiar_los_campos_usando_localstorage|--//
//--------------------------------------------//
boton_limpiar_asesoria.addEventListener("click", function() {
    formulario_asesoria_virtual.reset();
    localStorage.removeItem(clave_asesoria_virtual);
    mensaje_asesoria_virtual.textContent = "";
    mensaje_asesoria_virtual.className = "mensaje_asesoria_virtual";
    fecha_asesoria_virtual.min = `${anio_asesoria_virtual}-${mes_asesoria_virtual}-${dia_asesoria_virtual}`;
});
recuperar_asesoria_virtual();