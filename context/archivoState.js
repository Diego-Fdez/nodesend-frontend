import archivoContext from "./archivoContext";
import archivoReducer from "./archivoReducer";
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
import { useReducer } from "react";
import clienteAxios from "../config/clienteAxios";

const ArchivoState = ({children}) => {

  const initialState = {
    mensaje_archivo: null,
    nombre: '',
    nombre_original: '',
    cargando: null,
    descargas: 1,
    password: '',
    autor: null,
    url: ''
  };

  //crear el reducer
  const [state, dispatch] = useReducer(archivoReducer, initialState);

  //muestra una alerta
  const mostrarAlerta = msg => {
    console.log(msg)
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg
    });
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA
      })
    }, 2500);
  };

  //función que sube los archivos a servidor
  const subirArchivo = async (formData, nombreArchivo) => {
    dispatch({
      type: SUBIR_ARCHIVO
    })
    try {
      const resultado = await clienteAxios.post('/archivos', formData);

      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombre_original: nombreArchivo
        }
      })
    } catch (error) {
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data
      })
    }
  };

  //función que crea el enlace
  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor
    };
    try {
      const resultado = await clienteAxios.post('/enlaces', data);
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: resultado.data.msg
      })
    } catch (error) {
      dispatch({
        type: CREAR_ENLACE_ERROR,
        payload: error.response.data
      })
    }
  };

  const limpiarState = () => {
    dispatch({
      type: LIMPIAR_STATE
    })
  };

  //agregar password al enlace
  const agregarPassword = password => {
    dispatch({
      type: AGREGAR_PASSWORD,
      payload: password
    })
  };

  //agrega un número de descargas
  const agregarDescargas = descargas => {
    dispatch({
      type: AGREGAR_DESCARGAS,
      payload: descargas
    })
  }

  return (
    <archivoContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        cargando: state.cargando,
        mostrarAlerta,
        subirArchivo,
        crearEnlace,
        limpiarState,
        agregarPassword,
        agregarDescargas
      }}
    >
    {children}
    </archivoContext.Provider>
  )
};

export default ArchivoState;