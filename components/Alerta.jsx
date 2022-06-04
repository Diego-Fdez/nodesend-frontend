import React, {useContext} from 'react';
import authContext from '../context/authContext';
import archivoContext from '../context/archivoContext';

const Alerta = () => {

  //extraer mensaje de error para usuarios
  const AuthContext = useContext(authContext);
  const {mensaje} = AuthContext;

  //extraer mensaje de error de archivos
  const ArchivoContext = useContext(archivoContext);
  const {mensaje_archivo} = ArchivoContext;

  return (
    <div
      className='bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto'
    >
      {mensaje || mensaje_archivo}
    </div>
  )
};

export default Alerta;