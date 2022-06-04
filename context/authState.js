import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { USUARIO_AUTENTICADO, 
  REGISTRO_ERROR,
  REGISTRO_EXITOSO,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION } from "../types";
import clienteAxios from "../config/clienteAxios";
import {useRouter} from "next/router";
import tokenAuth from "../config/tokenAuth";

const AuthState = ({children}) => {

  const router = useRouter();

  //definir un state inicial
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    autenticado: null,
    usuario: null,
    mensaje: null
  };

  //definir el reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  //registrar nuevos usuarios
  const registrarUsuario = async datos => {
    try {
      const resultado = await clienteAxios.post('/usuarios', datos);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: resultado.data.msg
      });
      router.push('/login');
    } catch (error) {
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg
      })
    }
    //limpia la alerta después de 3 segundos
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA
      })
    }, 2000);
  };

  //logear usuarios
  const iniciarSesion = async datos => {
    try {
      const respuesta = await clienteAxios.post('/usuarios/login', datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token
      })
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data
      });
    }
    //limpia la alerta después de 3 segundos
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA
      })
    }, 2000);
  };

  //usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');
    if(token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios('/usuarios/perfil');
      if(respuesta.data.usuario) {
        dispatch({
          type: USUARIO_AUTENTICADO,
          payload: respuesta.data.usuario
        })
      }
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data
      });
    }
    //limpia la alerta después de 3 segundos
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA
      })
    }, 2000);
  };

  //cerrar la sesión
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthState;