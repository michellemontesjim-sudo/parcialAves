import * as ecs from '@8thwall/ecs'

window.avesEids = window.avesEids || []
window.btnConfigurado = false
window.velocidadAlterna = false // Nuestra variable trampa

ecs.registerComponent({
  name: 'control-animacion',
  add: (world, component) => {
    const {eid} = component
    const btnAnimacion = document.getElementById('btn-animacion-html')

    // Registramos las aves
    if (!window.avesEids.includes(eid)) window.avesEids.push(eid)

    // Configuramos el botón
    if (btnAnimacion && !window.btnConfigurado) {
      window.btnConfigurado = true
      
      btnAnimacion.innerText = "🔄 Reiniciar Vuelo"
      btnAnimacion.style.background = "#2196F3"

      btnAnimacion.onclick = () => {
        // Alternamos la variable trampa
        window.velocidadAlterna = !window.velocidadAlterna

        window.avesEids.forEach(aveEid => {
          try {
            ecs.GltfModel.mutate(world, aveEid, (model) => {
              // Si es true, velocidad 1.01. Si es false, velocidad 1.0.
              // Al ser un valor nuevo, el motor reconstruye la animación desde el inicio.
              model.playbackRate = window.velocidadAlterna ? 1.01 : 1.0
            })
          } catch (e) {
            // Ignoramos si el modelo no está listo
          }
        })
      }
    }
  }
})