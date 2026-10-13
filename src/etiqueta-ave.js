import * as ecs from '@8thwall/ecs'

// Creamos un diccionario global secreto para guardar quién es quién
window.registroBotonesAves = window.registroBotonesAves || {}

ecs.registerComponent({
  name: 'etiqueta-ave',
  schema: {
    aveId: ecs.string, // Aquí pondrás 'torcaza', 'loro', etc. en el inspector
  },
  add: (world, component) => {
    // Cuando el botón aparece en la escena, registra su ID interno único (eid) 
    // y lo asocia con el nombre del ave que escribiste en el inspector.
    const idInterno = component.eid
    const nombreAve = component.schema.aveId.toLowerCase().trim()
    
    window.registroBotonesAves[idInterno] = nombreAve
  }
})