import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'animar-al-tocar',
  add: (world, component) => {
    const {eid} = component

    let estaPausado = false

    // Escuchamos el evento de toque en el objeto
    world.events.addListener(eid, 'pointerdown', () => {
      estaPausado = !estaPausado

      // Cambiamos el estado de pausa del modelo GLTF
      ecs.GltfModel.mutate(world, eid, (model) => {
        model.paused = estaPausado
      })
      
      console.log("¡Ave tocada! Estado de pausa:", estaPausado)
    })
  }
})