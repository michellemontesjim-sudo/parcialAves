import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'abrir-enlace',
  schema: {
    url: ecs.string,
  },
  add: (world, component) => {
    const alTocar = () => {
      const enlace = (component.schema.url || '').trim()

      if (enlace !== '') {
        console.log("✅ Abriendo página web:", enlace)
        
        window.open(enlace, '_blank')
      } else {
        alert("⚠️ Falta poner el link en el inspector.")
      }
    }

    // Escuchamos el clic o toque en la pantalla
    world.events.addListener(component.eid, 'click', alTocar)
    world.events.addListener(component.eid, 'touchstart', alTocar)
  }
})