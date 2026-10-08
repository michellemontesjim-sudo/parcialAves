import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'control-animacion-toque',
  add: (world, component) => {
    const {eid} = component
    
    // Estado interno controlado 100% por el script
    let estaVolando = true

    // 1. Inicializamos la animación por código en lugar del Inspector
    ecs.GltfModel.mutate(world, eid, (model) => {
      // Usar '*' equivale a 'Play All', o puedes escribir el nombre exacto de tu clip de Blender
      model.animationClip = '*' 
      model.paused = false
    })

    // 2. Gestionamos el toque para alternar el estado
    world.events.addListener(eid, 'pointerdown', () => {
      estaVolando = !estaVolando
      
      ecs.GltfModel.mutate(world, eid, (model) => {
        model.paused = !estaVolando
      })
    })
  }
})