import * as ecs from '@8thwall/ecs'

let audioActual = null

const quizData = {
  'Torcaza': { pregunta: '¿Cuál es el hábitat principal de la torcaza?', opciones: ['Zonas urbanas y rurales', 'Selva profunda y oscura'], correcta: 0 },
  'Colibrí': { pregunta: '¿Cuántas veces por segundo bate sus alas el colibrí?', opciones: ['Hasta 80 veces', 'Solo 10 veces'], correcta: 0 },
  'Loro': { pregunta: '¿Qué característica hace únicos a los loros?', opciones: ['Vuelan hacia atrás', 'Pueden imitar sonidos'], correcta: 1 },
  'Bichofué': { pregunta: '¿De dónde proviene el nombre "bichofué"?', opciones: ['Por el sonido de su canto', 'Por el color de su plumaje'], correcta: 0 },
  'Pechirrojo': { pregunta: '¿Qué color predomina en el pecho de los machos?', opciones: ['Amarillo pálido', 'Rojo anaranjado intenso'], correcta: 1 }
}

const inyectarHTML = () => {
  if (document.getElementById('ui-aves')) return // Evita duplicados

  const uiAves = document.createElement('div')
  uiAves.id = 'ui-aves'
  // El contenedor es transparente a los toques (pointer-events: none)
  uiAves.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 100; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; padding-bottom: 40px;'
  
  uiAves.innerHTML = `
    <div id="quiz-card" style="display: none; pointer-events: auto; background: #fff; padding: 24px; border-radius: 16px; width: 85%; max-width: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); font-family: sans-serif; position: relative; text-align: center; margin-bottom: 20px;">
      <button id="btn-cerrar" style="position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
      <h2 id="quiz-title" style="margin-top: 0; color: #333;"></h2>
      <p id="quiz-question" style="color: #555; font-size: 1.1rem; margin-bottom: 20px;"></p>
      <div id="quiz-options"></div>
      <div id="feedback-msj" style="margin-top: 15px; font-size: 1.1rem; font-weight: bold; display: none;"></div>
    </div>

    <!-- Los botones SÍ aceptan toques (pointer-events: auto) -->
    <div id="contenedor-botones-ave" style="display: none; pointer-events: auto; gap: 15px;">
      <button id="btn-sonido-ave" style="background: #2196F3; color: white; border: none; padding: 12px 20px; border-radius: 30px; font-size: 1rem; font-weight: bold; box-shadow: 0 4px 10px rgba(0,0,0,0.3); cursor: pointer;">🔊 Escuchar</button>
      <button id="btn-abrir-quiz" style="background: #4CAF50; color: white; border: none; padding: 12px 20px; border-radius: 30px; font-size: 1rem; font-weight: bold; box-shadow: 0 4px 10px rgba(0,0,0,0.3); cursor: pointer;">📝 Quiz</button>
    </div>
  `
  document.body.appendChild(uiAves)
}

ecs.registerComponent({
  name: 'interfaz-ave',
  schema: {
    nombreAve: ecs.string,
    archivoAudio: ecs.string,
  },
  add: (world, component) => {
    inyectarHTML() // Fabricamos el HTML automáticamente

    const {eid, schema} = component

    const contenedorBotones = document.getElementById('contenedor-botones-ave')
    const btnSonido = document.getElementById('btn-sonido-ave')
    const btnAbrirQuiz = document.getElementById('btn-abrir-quiz')
    const quizCard = document.getElementById('quiz-card')
    const quizTitle = document.getElementById('quiz-title')
    const quizQuestion = document.getElementById('quiz-question')
    const quizOptionsContainer = document.getElementById('quiz-options')
    const feedbackMsj = document.getElementById('feedback-msj')
    const btnCerrar = document.getElementById('btn-cerrar')

    btnCerrar.onclick = () => quizCard.style.display = 'none'

    // EVENTO 1 CORREGIDO: 'imagefound'
    world.events.addListener(eid, 'imagefound', () => {
      contenedorBotones.style.display = 'flex'
      btnSonido.innerText = `🔊 Escuchar`
      btnAbrirQuiz.innerText = `📝 Quiz ${schema.nombreAve}`

      // Lógica de Sonido
      btnSonido.onclick = () => {
        if (audioActual) {
          audioActual.pause()
          audioActual.currentTime = 0
        }
        if (schema.archivoAudio) {
          audioActual = new Audio(schema.archivoAudio)
          audioActual.play()
        }
      }

      // Lógica de Quiz
      btnAbrirQuiz.onclick = () => {
        const infoAve = quizData[schema.nombreAve]
        if (!infoAve) return

        feedbackMsj.style.display = 'none'
        quizOptionsContainer.style.display = 'block'
        quizOptionsContainer.innerHTML = ''
        quizTitle.innerText = `Quiz del ${schema.nombreAve}`
        quizQuestion.innerText = infoAve.pregunta

        infoAve.opciones.forEach((textoOpcion, index) => {
          const btn = document.createElement('button')
          btn.innerText = textoOpcion
          btn.style.cssText = "display: block; width: 100%; margin: 8px 0; padding: 12px; background: #f0f0f0; border: 2px solid #ddd; border-radius: 8px; font-size: 16px; cursor: pointer;"
          
          btn.onclick = () => {
            quizOptionsContainer.style.display = 'none'
            feedbackMsj.style.display = 'block'
            if (index === infoAve.correcta) {
              feedbackMsj.innerText = "¡Correcto! Excelente trabajo. 🎉"
              feedbackMsj.style.color = "#4CAF50"
            } else {
              feedbackMsj.innerText = "Incorrecto. ¡Sigue intentando! 🔄"
              feedbackMsj.style.color = "#F44336"
            }
          }
          quizOptionsContainer.appendChild(btn)
        })

        quizCard.style.display = 'block'
      }
    })

    // EVENTO 2 CORREGIDO: 'imagelost'
    world.events.addListener(eid, 'imagelost', () => {
      contenedorBotones.style.display = 'none'
      quizCard.style.display = 'none'
      if (audioActual) {
        audioActual.pause()
        audioActual = null
      }
    })
  }
})