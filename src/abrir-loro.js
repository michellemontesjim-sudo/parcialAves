import * as ecs from '@8thwall/ecs'

const latidosBotones = new Map()

ecs.registerComponent({
  name: 'abrir-loro', // 👈 CAMBIO 1: Nombre del script
  add: (world, component) => {
    latidosBotones.set(component.eid, Date.now())

    const alTocar = () => {
      
      const miAve = 'loro' // 👈 CAMBIO 2: El nombre del ave

      // ... (el resto del código es exactamente igual al de la torcaza) ...
      const ultimoLatido = latidosBotones.get(component.eid) || 0
      const diferencia = Date.now() - ultimoLatido

      if (diferencia > 300) {
        console.log(`👻 Fantasma de '${miAve}' bloqueado.`)
        return
      }

      console.log(`✅ Clic válido. Abriendo galería de: ${miAve}`)
      if (window.abrirGaleriaAve) {
        window.abrirGaleriaAve(miAve)
      }
    }

    world.events.addListener(component.eid, 'click', alTocar)
    world.events.addListener(component.eid, 'touchstart', alTocar)
  },
  tick: (world, component) => {
    latidosBotones.set(component.eid, Date.now())
  },
  remove: (world, component) => {
    latidosBotones.delete(component.eid)
  }
})