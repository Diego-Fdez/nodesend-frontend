import {
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  SUBIR_ARCHIVO,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  MOSTRAR_ALERTA,
  LIMPIAR_ALERTA,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS
} from "../types/index";

export default (state, action) => {
  switch(action.type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        mensaje_archivo: action.payload
      }
    case LIMPIAR_ALERTA:
      return {
        ...state,
        mensaje_archivo: null
      }
    case SUBIR_ARCHIVO:
      return {
        ...state,
        cargando: true
      }
    case SUBIR_ARCHIVO_EXITO:
      return {
        nombre: action.payload.nombre,
        nombre_original: action.payload.nombre_original,
        cargando: null
      }
    case SUBIR_ARCHIVO_ERROR:
    case CREAR_ENLACE_ERROR:
      return {
        ...state,
        mensaje_archivo: action.payload,
        cargando: null
      }
    case CREAR_ENLACE_EXITO:
      return {
        ...state,
        url: action.payload
      }
      case LIMPIAR_STATE:
        return {
          ...state,
          mensaje_archivo: null,
          nombre: '',
          nombre_original: '',
          cargando: null,
          descargas: 1,
          password: '',
          autor: null,
          url: ''
        }
      case AGREGAR_PASSWORD:
        return {
          ...state,
          password: action.payload
        }
      case AGREGAR_DESCARGAS:
        return {
          ...state,
          descargas: action.payload
        }
    default:
      return state
  }
}