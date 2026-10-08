import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'animacion-maestro',
  schema: {
    // Aquí escribiremos los nombres separados por comas
    nombresModelos: ecs.string, 
  },
  add: (world, component) => {
    const {schema} = component
    const btnAnimacion = document.getElementById('btn-animacion-html')
    let estaPausado = false

    if (btnAnimacion) {
      btnAnimacion.onclick = () => {
        // 1. Cambiamos el estado (Verdadero / Falso)
        estaPausado = !estaPausado
        
        // 2. Actualizamos el botón visualmente
        btnAnimacion.innerText = estaPausado ? "▶️ Reanudar Vuelo" : "⏸️ Pausar Vuelo"
        btnAnimacion.style.background = estaPausado ? "#4CAF50" : "#9C27B0" // Verde para reanudar, morado para pausar

        // 3. Tomamos los nombres que escribas en el Inspector y los separamos
        const listaNombres = schema.nombresModelos.split(',').map(nombre => nombre.trim())

        // 4. LA MAGIA: Buscamos cada modelo por su nombre y lo pausamos
        listaNombres.forEach(nombreExacto => {
          const eidModelo = world.findEntityByName(nombreExacto)
          
          if (eidModelo) {
            ecs.GltfModel.mutate(world, eidModelo, (model) => {
              model.animationClip = '*' // Forzamos el Play All
              model.paused = estaPausado
            })
          }
        })
      }
    }
  }
})