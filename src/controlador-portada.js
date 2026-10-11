import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'controlador-portada',
  schema: {
    // Aquí escribirás el nombre exacto de la imagen de tu portada en 8th Wall
    nombreMarcadorPortada: ecs.string, 
  },
  add: (world, component) => {
    const {schema} = component
    
    // Capturamos los elementos de tu HTML
    const menuPrincipal = document.getElementById('ui-menu-principal')
    const btnCerrar = document.getElementById('btn-cerrar-menu-escanear')

    // 1. Configuramos el botón rojo para cerrar el menú y volver al AR
    if (btnCerrar && menuPrincipal) {
      btnCerrar.onclick = () => {
        menuPrincipal.style.display = 'none'
      }
    }

    // 2. Escuchamos al motor de visión artificial del celular
    window.addEventListener('xrimagefound', (event) => {
      if (!schema.nombreMarcadorPortada) return

      const nombreImagenEscaneada = event.detail.name.toLowerCase()
      const clavePortada = schema.nombreMarcadorPortada.toLowerCase()

      // Si la imagen escaneada coincide con el nombre de tu portada
      if (nombreImagenEscaneada.includes(clavePortada)) {
        if (menuPrincipal) {
          // Mostramos la interfaz sobreponiéndola a la cámara
          menuPrincipal.style.display = 'flex' 
        }
      }
    })
  }
})