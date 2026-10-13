import * as ecs from '@8thwall/ecs'

// Memoria global compartida
window.aveVisibleActualmente = window.aveVisibleActualmente || ''

ecs.registerComponent({
  name: 'rastreador-imagen',
  schema: {
    aveId: ecs.string, // Ej: 'loro', 'torcaza'
  },
  add: (world, component) => {
    const miAve = component.schema.aveId.toLowerCase().trim()

    // Cuando el motor AR detecta esta imagen físicamente
    world.events.addListener(component.eid, 'image-target-found', () => {
      window.aveVisibleActualmente = miAve
      console.log(`👁️ La cámara ahora está enfocando a: ${miAve}`)
    })

    // Cuando quitas el libro de la cámara
    world.events.addListener(component.eid, 'image-target-lost', () => {
      if (window.aveVisibleActualmente === miAve) {
        window.aveVisibleActualmente = '' // Limpiamos la memoria
      }
    })
  }
})