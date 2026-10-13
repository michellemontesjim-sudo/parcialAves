import * as ecs from '@8thwall/ecs'

const latidosBotones = new Map()

ecs.registerComponent({
  name: 'boton-galeria-seguro',
  schema: {
    aveId: ecs.string, 
  },
  add: (world, component) => {
    latidosBotones.set(component.eid, Date.now())

    const alTocar = () => {
      // Leemos el valor del inspector
      const miAve = (component.schema.aveId || '').toLowerCase().trim()

      // Si el valor está vacío, te avisamos de inmediato para arreglarlo en el editor
      if (miAve === '') {
        alert("⚠️ Falta el aveId. Ve a Niantic Studio, escribe el nombre en el botón y presiona ENTER.")
        console.error("❌ ERROR: El campo aveId en el inspector de este botón está vacío.")
        return
      }

      // 🛡️ ESCUDO DE LATIDO (Anti-Fantasmas)
      const ultimoLatido = latidosBotones.get(component.eid) || 0
      const diferencia = Date.now() - ultimoLatido

      if (diferencia > 300) {
        console.log(`👻 Fantasma de '${miAve}' bloqueado.`)
        return
      }

      // 🎯 ÉXITO
      console.log(`✅ Clic válido. Abriendo galería de: ${miAve}`)
      if (window.abrirGaleriaAve) {
        window.abrirGaleriaAve(miAve)
      }
    }

    world.events.addListener(component.eid, 'click', alTocar)
    world.events.addListener(component.eid, 'touchstart', alTocar)
  },
  tick: (world, component) => {
    // Mantiene el pulso del botón mientras esté visible
    latidosBotones.set(component.eid, Date.now())
  },
  remove: (world, component) => {
    latidosBotones.delete(component.eid)
  }
})