import * as ecs from '@8thwall/ecs'

// Tu base de datos. La 'clave' debe estar contenida en el nombre de tu imagen en 8th Wall.
const aves = [
  { clave: 'ave-torcaza', nombre: 'Torcaza', audio: 'assets/cantoTorcaza.mp3' },
  //{ clave: 'colibri', nombre: 'Colibrí', audio: 'assets/canto_colibri.mp3' },
  //{ clave: 'loro', nombre: 'Loro', audio: 'assets/canto_loro.mp3' },
  //{ clave: 'bichofue', nombre: 'Bichofué', audio: 'assets/canto_bichofue.mp3' },
  //{ clave: 'pechirrojo', nombre: 'Pechirrojo', audio: 'assets/canto_pechirrojo.mp3' }
]

let audioReproductor = null
let aveActual = null

ecs.registerComponent({
  name: 'controlador-audio',
  add: () => {
    const btnSonido = document.getElementById('btn-sonido-html')
    if (!btnSonido) return

    // 1. Lógica del botón blindada con manejo de promesas
    btnSonido.onclick = async () => {
      if (!aveActual) {
        const textoOriginal = btnSonido.innerText
        btnSonido.innerText = "📷 Apunta a un ave primero"
        btnSonido.style.background = "#FF9800"
        
        setTimeout(() => {
          btnSonido.innerText = textoOriginal
          btnSonido.style.background = "#2196F3"
        }, 2000)
        return
      }

      try {
        if (audioReproductor) {
          audioReproductor.pause()
          audioReproductor.currentTime = 0
        }
        
        // Creamos la instancia y esperamos a que cargue
        audioReproductor = new Audio(aveActual.audio)
        
        // Intentamos reproducir de forma segura
        await audioReproductor.play()
        btnSonido.innerText = `🔊 Cantando: ${aveActual.nombre}`
        
      } catch (error) {
        console.error("Error al reproducir el audio:", error)
        btnSonido.innerText = "⚠️️ Error de reproducción"
        btnSonido.style.background = "#F44336"
      }
    }

    // 2. Evento global nativo: El motor escanea cualquier imagen
    window.addEventListener('xrimagefound', (event) => {
      // Tomamos el nombre exacto de la imagen que el motor detectó
      const nombreImagenAR = event.detail.name.toLowerCase()
      
      // Buscamos cuál de nuestras aves coincide con ese nombre
      const aveEncontrada = aves.find(a => nombreImagenAR.includes(a.clave))

      if (aveEncontrada) {
        aveActual = aveEncontrada
        btnSonido.innerText = `🔊 Escuchar ${aveActual.nombre}`
        btnSonido.style.background = "#2196F3"
      }
    })

    // 3. Evento global nativo: El motor pierde de vista la imagen
    window.addEventListener('xrimagelost', () => {
      aveActual = null // Borramos el ave de la memoria
      
      if (audioReproductor) {
        audioReproductor.pause()
        audioReproductor = null
      }
      
      btnSonido.innerText = '🔊 Escuchar Ave'
      btnSonido.style.background = "#2196F3"
    })
  }
})