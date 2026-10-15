import * as ecs from '@8thwall/ecs'

const latidosBotonesMap = new Map()

ecs.registerComponent({
  name: 'mapa-bichofue', // 👈 NOMBRE ÚNICO DEL SCRIPT
  add: (world, component) => {
    latidosBotonesMap.set(component.eid, Date.now())

    const alTocar = () => {
      const miAve = 'bichofue' // 👈 ESCRITO A LA FUERZA PARA ESTE BOTÓN

      // 🛡️ ESCUDO DE LATIDO (Anti-Fantasmas)
      const ultimoLatido = latidosBotonesMap.get(component.eid) || 0
      const diferencia = Date.now() - ultimoLatido

      if (diferencia > 300) {
        console.log(`👻 Fantasma bloqueado en el mapa de '${miAve}'.`)
        return
      }

      console.log(`✅ Abriendo Google Maps de: ${miAve}`)
      if (window.abrirMapaUbicacion) {
        window.abrirMapaUbicacion(miAve)
      }
    }

    world.events.addListener(component.eid, 'click', alTocar)
    world.events.addListener(component.eid, 'touchstart', alTocar)
  },
  tick: (world, component) => {
    latidosBotonesMap.set(component.eid, Date.now())
  },
  remove: (world, component) => {
    latidosBotonesMap.delete(component.eid)
  }
})