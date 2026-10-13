import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'abrir-galeria-3d',
  schema: {
    aveId: ecs.string, 
  },
  add: (world, component) => {
    
    const alTocar = () => {
      const idCorrecto = component.schema.aveId.toLowerCase().trim()
      
      // 🔍 EL RASTREADOR: Te dirá en la consola exactamente qué botón detectó el toque
      console.log("👉 Botón de 8th Wall presionado. El motor intentará cargar:", idCorrecto)
      
      if (window.abrirGaleriaAve && idCorrecto !== '') {
        window.abrirGaleriaAve(idCorrecto)
      }
    }

    world.events.addListener(component.eid, 'click', alTocar)
    world.events.addListener(component.eid, 'touchstart', alTocar)
  }
})