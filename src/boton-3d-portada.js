import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'boton-3d-portada',
  add: (world, component) => {
    const {eid} = component
    
    // Capturamos tu interfaz HTML
    const menuPrincipal = document.getElementById('ui-menu-principal')
    const btnCerrar = document.getElementById('btn-cerrar-menu-escanear')

    // 1. Lógica para CERRAR el menú desde la interfaz HTML
    if (btnCerrar && menuPrincipal) {
      btnCerrar.onclick = () => {
        menuPrincipal.style.display = 'none'
      }
    }

    // 2. Lógica para ABRIR el menú al tocar el botón 3D
    // Escuchamos el evento nativo de clic sobre el colisionador de esta entidad
    world.events.addListener(eid, 'click', () => {
      if (menuPrincipal) {
        menuPrincipal.style.display = 'flex'
      }
    })
    
    // Añadimos también touchstart por máxima compatibilidad en móviles
    world.events.addListener(eid, 'touchstart', () => {
      if (menuPrincipal) {
        menuPrincipal.style.display = 'flex'
      }
    })
  }
})