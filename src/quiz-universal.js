import * as ecs from '@8thwall/ecs'

const preguntas = [
  { ave: 'Torcaza', pregunta: '¿Cuál es el hábitat principal de la torcaza?', opciones: ['Zonas abiertas urbanas y rurales', 'Zonas de alta montaña'], correcta: 0 },
  { ave: 'Colibrí', pregunta: '¿De qué color es el colibrí esmeralada macho?', opciones: ['Completamente verde esmeralda y cola azul', 'Verdes y gris pálido'], correcta: 0 },
  { ave: 'Loro', pregunta: '¿Los loros cabeciamarilla van en parvadas o en solitario?', opciones: ['Van en solitario', 'En parejas o parvadas pequeñas'], correcta: 1 },
  { ave: 'Bichofué', pregunta: '¿De dónde proviene el nombre "bichofué"?', opciones: ['Su canto', 'Su plumaje'], correcta: 0 },
  { ave: 'Pechirrojo', pregunta: '¿Qué color predomina en la corona de los pechirrojos machos adultos?', opciones: ['Grisáceo opaco', 'Rojo brillante'], correcta: 1 },
  { ave: 'Torcaza', pregunta: '¿En qué continente se encuentra ampliamente distribuida la torcaza?', opciones: ['Europa y Asia', 'Suramérica'], correcta: 1 },
  { ave: 'Colibrí', pregunta: '¿Dónde se encuentra usualmente el colibrí esmeralda?', opciones: ['Hábitats bastante secos y abiertos', 'Bosques frondosos'], correcta: 0 },
  { ave: 'Loro', pregunta: 'A diferencia de otros pericos ¿cómo vuela el loro cabeciamarilla?', opciones: ['Con pequeños rebotes distintivos', 'Ondulante en forma de zig-zag'], correcta: 0 },
  { ave: 'Bichofué', pregunta: '¿En qué áreas suele encontrarse el bichofué?', opciones: ['Bosques cerrados o densos', 'Áreas con arbustos o cuerpos de agua'], correcta: 1 },
  { ave: 'Pechirrojo', pregunta: '¿De qué se alimenta principalmente el pechirrojo?', opciones: ['Insectos', 'Granos de tamaño grande'], correcta: 0 }

]

ecs.registerComponent({
  name: 'quiz-universal',
  add: () => {
    let preguntaActual = 0
    let puntaje = 0

    const btnIniciar = document.getElementById('btn-quiz-universal')
    const quizCard = document.getElementById('quiz-card')
    const quizTitle = document.getElementById('quiz-title')
    const quizQuestion = document.getElementById('quiz-question')
    const quizOptionsContainer = document.getElementById('quiz-options')
    const feedbackMsj = document.getElementById('feedback-msj')
    const btnCerrar = document.getElementById('btn-cerrar')

    // Cerrar quiz a la fuerza
    if (btnCerrar) {
      btnCerrar.onclick = () => {
        quizCard.style.display = 'none'
        btnIniciar.style.display = 'block'
      }
    }

    // Iniciar la Trivia
    if (btnIniciar) {
      btnIniciar.onclick = () => {
        preguntaActual = 0
        puntaje = 0
        btnIniciar.style.display = 'none'
        quizCard.style.display = 'block'
        mostrarPregunta()
      }
    }

    const mostrarPregunta = () => {
      // Pantalla final de resultados
      if (preguntaActual >= preguntas.length) {
        quizTitle.innerText = "¡Completaste el libro!"
        quizQuestion.innerText = `Acertaste ${puntaje} de ${preguntas.length} preguntas.`
        quizOptionsContainer.innerHTML = ''
        
        const btnReinicio = document.createElement('button')
        btnReinicio.innerText = 'Volver a intentar 🔄'
        btnReinicio.style.cssText = "display: block; width: 100%; margin: 8px 0; padding: 12px; background: #2196F3; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer;"
        
        btnReinicio.onclick = () => {
          quizCard.style.display = 'none'
          btnIniciar.style.display = 'block'
        }
        quizOptionsContainer.appendChild(btnReinicio)
        return
      }

      const info = preguntas[preguntaActual]
      quizTitle.innerText = `Pregunta ${preguntaActual + 1}`
      quizQuestion.innerText = info.pregunta
      quizOptionsContainer.innerHTML = ''
      feedbackMsj.style.display = 'none'
      quizOptionsContainer.style.display = 'block'

      info.opciones.forEach((texto, index) => {
        const btn = document.createElement('button')
        btn.innerText = texto
        btn.style.cssText = "display: block; width: 100%; margin: 8px 0; padding: 12px; background: #f0f0f0; border: 2px solid #ddd; border-radius: 8px; font-size: 16px; cursor: pointer;"
        
        btn.onclick = () => {
          quizOptionsContainer.style.display = 'none'
          feedbackMsj.style.display = 'block'
          
          if (index === info.correcta) {
            puntaje++
            feedbackMsj.innerText = "¡Correcto! 🎉"
            feedbackMsj.style.color = "#4CAF50"
          } else {
            feedbackMsj.innerText = `Incorrecto. Era: ${info.opciones[info.correcta]} ❌`
            feedbackMsj.style.color = "#F44336"
          }

          // Salta a la siguiente pregunta automáticamente después de 2 segundos
          setTimeout(() => {
            preguntaActual++
            mostrarPregunta()
          }, 2000)
        }
        quizOptionsContainer.appendChild(btn)
      })
    }
  }
})