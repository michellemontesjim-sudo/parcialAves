import * as ecs from '@8thwall/ecs'

// Base de datos de las aves (puedes editar las preguntas aquí)
const quizData = {
  'Torcaza': {
    pregunta: '¿Cuál es el hábitat principal de la torcaza?',
    opciones: ['Zonas urbanas y rurales', 'Selva profunda y oscura'],
    correcta: 0 // El índice 0 es la primera opción
  },
  'Colibrí': {
    pregunta: '¿Cuántas veces por segundo bate sus alas el colibrí?',
    opciones: ['Hasta 80 veces', 'Solo 10 veces'],
    correcta: 0
  },
  'Loro': {
    pregunta: '¿Qué característica hace únicos a los loros?',
    opciones: ['Vuelan hacia atrás', 'Pueden imitar sonidos'],
    correcta: 1
  },
  'Bichofué': {
    pregunta: '¿De dónde proviene el nombre "bichofué"?',
    opciones: ['Por el sonido de su canto', 'Por el color de su plumaje'],
    correcta: 0
  },
  'Pechirrojo': {
    pregunta: '¿Qué color predomina en el pecho de los machos?',
    opciones: ['Amarillo pálido', 'Rojo anaranjado intenso'],
    correcta: 1
  }
}

ecs.registerComponent({
  name: 'boton-quiz',
  schema: {
    tipoAve: ecs.string, 
  },
  add: (world, component) => {
    const {eid, schema} = component

    // Seleccionamos los elementos del HTML
    const quizCard = document.getElementById('quiz-card')
    const quizTitle = document.getElementById('quiz-title')
    const quizQuestion = document.getElementById('quiz-question')
    const quizOptionsContainer = document.getElementById('quiz-options')
    const feedbackMsj = document.getElementById('feedback-msj')
    const btnCerrar = document.getElementById('btn-cerrar')

    // Lógica para cerrar la tarjeta si el usuario toca la "X"
    if (btnCerrar) {
      btnCerrar.onclick = () => {
        quizCard.style.display = 'none'
      }
    }

    // Escuchar el evento de clic sobre el botón 3D
    world.events.addListener(eid, 'click', () => {
      // Buscar la información del ave en nuestra "base de datos"
      const infoAve = quizData[schema.tipoAve]
      
      // Si el ave no está en la base de datos o no hay HTML, no hace nada
      if (!infoAve || !quizCard) return

      // 1. Preparar la tarjeta (limpiar datos anteriores)
      feedbackMsj.style.display = 'none'
      quizOptionsContainer.style.display = 'block'
      quizOptionsContainer.innerHTML = '' // Borra los botones viejos
      
      // 2. Llenar los textos
      quizTitle.innerText = `Quiz del ${schema.tipoAve}`
      quizQuestion.innerText = infoAve.pregunta

      // 3. Crear los botones de respuesta dinámicamente
      infoAve.opciones.forEach((textoOpcion, index) => {
        const btn = document.createElement('button')
        btn.className = 'opcion-btn'
        btn.innerText = textoOpcion
        
        // ¿Qué pasa cuando tocas una respuesta?
        btn.onclick = () => {
          quizOptionsContainer.style.display = 'none' // Oculta los botones
          feedbackMsj.style.display = 'block' // Muestra el mensaje
          
          if (index === infoAve.correcta) {
            feedbackMsj.innerText = "¡Correcto! Excelente trabajo. 🎉"
            feedbackMsj.style.color = "#4CAF50"
          } else {
            feedbackMsj.innerText = "Incorrecto. ¡Sigue intentando! 🔄"
            feedbackMsj.style.color = "#F44336"
          }
        }
        // Añadir el botón al contenedor
        quizOptionsContainer.appendChild(btn)
      })

      // 4. Mostrar la tarjeta flotante
      quizCard.style.display = 'block'
    })
  }
})