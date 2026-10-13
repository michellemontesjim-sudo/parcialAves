import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'detector-global-clics',
  add: (world) => {
    
    const procesarToque = (evento) => {
      // evento.target es el número de ID interno único del objeto que tocaste
      const entidadTocada = evento.target
      if (!entidadTocada) return

      // Buscamos en nuestro registro si ese ID interno pertenece a un botón de ave
      const aveDetectada = window.registroBotonesAves[entidadTocada]

      // Si encontramos el ID en el registro, sabemos EXACTAMENTE qué botón se tocó
      if (aveDetectada) {
        console.log(`🎯 ¡Director Global detectó toque EXACTO en el botón de: ${aveDetectada}!`)
        
        if (window.abrirGaleriaAve) {
          window.abrirGaleriaAve(aveDetectada)
        }
      }
    }

    // El Director escucha cualquier clic en cualquier parte de la pantalla
    world.events.addListener(world.events.globalId, 'click', procesarToque)
    world.events.addListener(world.events.globalId, 'touchstart', procesarToque)
  }
})