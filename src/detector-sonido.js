import * as ecs from '@8thwall/ecs'

// Variables globales
window.aveActualParaSonido = null
window.audioReproductor = null
window.botonAudioConfigurado = false 

ecs.registerComponent({
  name: 'detector-sonido',
  schema: {
    nombreAve: ecs.string,
    archivoAudio: ecs.string,
  },
  add: (world, component) => {
    const {eid, schema} = component
    const btnSonido = document.getElementById('btn-sonido-html')

    // 1. Configuramos el botón una sola vez
    if (btnSonido && !window.botonAudioConfigurado) {
      window.botonAudioConfigurado = true 
      
      btnSonido.onclick = () => {
        if (!window.aveActualParaSonido) {
          btnSonido.innerText = "📷 Apunta a un ave primero"
          btnSonido.style.background = "#FF9800" 
          
          setTimeout(() => {
            // Restaurar texto dependiendo de si ya encontró un ave o no
            if (window.aveActualParaSonido) {
              btnSonido.innerText = `🔊 Escuchar ${window.aveActualParaSonido.nombre}`
            } else {
              btnSonido.innerText = "🔊 Escuchar Ave"
            }
            btnSonido.style.background = "#2196F3" 
          }, 2000)
          return
        }

        if (window.audioReproductor) {
          window.audioReproductor.pause()
          window.audioReproductor.currentTime = 0
        }
        
        window.audioReproductor = new Audio(window.aveActualParaSonido.audio)
        window.audioReproductor.play()
        btnSonido.innerText = `🔊 Cantando: ${window.aveActualParaSonido.nombre}`
      }
    }

    // 2. Funciones de encendido y apagado
    const encenderAve = () => {
      window.aveActualParaSonido = { nombre: schema.nombreAve, audio: schema.archivoAudio }
      if (btnSonido) {
        btnSonido.innerText = `🔊 Escuchar ${schema.nombreAve}`
        btnSonido.style.background = "#2196F3"
      }
    }

    const apagarAve = () => {
      if (window.aveActualParaSonido && window.aveActualParaSonido.nombre === schema.nombreAve) {
        window.aveActualParaSonido = null
        
        if (window.audioReproductor) {
          window.audioReproductor.pause()
          window.audioReproductor = null
        }
        if (btnSonido) {
          btnSonido.innerText = '🔊 Escuchar Ave'
          btnSonido.style.background = "#2196F3" 
        }
      }
    }

    // 3. LA SOLUCIÓN: Escuchar todas las nomenclaturas que usa Niantic Studio
    world.events.addListener(eid, 'targetfound', encenderAve)
    world.events.addListener(eid, 'targetlost', apagarAve)
    
    world.events.addListener(eid, 'targetFound', encenderAve)
    world.events.addListener(eid, 'targetLost', apagarAve)
    
    world.events.addListener(eid, 'imagefound', encenderAve)
    world.events.addListener(eid, 'imagelost', apagarAve)
  }
})