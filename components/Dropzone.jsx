import {useDropzone} from "react-dropzone";
import { useCallback, useContext } from "react";
import { motion } from "framer-motion";
import archivoContext from "../context/archivoContext";
import Spinner from "./Spinner";
import authContext from "../context/authContext";
import Formulario from "./Formulario";

const Dropzone = () => {

  //context de archivos
  const ArchivoContext = useContext(archivoContext);
  const {mostrarAlerta, cargando, subirArchivo, crearEnlace} = ArchivoContext;

  //context de auth
  const AuthContext = useContext(authContext);
  const {usuario, autenticado} = AuthContext;

  //definir que archivos se aceptan (tamaño)
  const onDropRejected = () => {
    mostrarAlerta('No se pudo subir el archivo, el limite es 1MB, obtén una cuenta gratis para subir archivos mas grandes');
  };

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    //crear un form data
    const formData = new FormData();
    formData.append('archivo', acceptedFiles[0]);
    subirArchivo(formData, acceptedFiles[0].path);
  }, []);

  //extraer contenido de dropzone
  const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000});

  const archivos = acceptedFiles.map(archivo => (
    <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
      <p className="font-bold text-xl break-words">{archivo.path}</p>
      <p className="text-sm text-gray-500">{(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
    </li>
  ));

  return (
    <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 px-4 bg-gray-100'>
      { acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Archivos</h2>
          <ul>
        {archivos}
        </ul>
        {autenticado ? <Formulario /> : ''}
      { cargando ? (
        <div className="flex justify-center items-center">
          <Spinner /> 
        </div>
      ): (
        <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={() => crearEnlace()}
        className="bg-blue-700 font-bold my-10 text-white w-full py-3 rounded-lg hover:bg-transparent hover:border-2 hover:border-blue-700 hover:text-blue-700 transition-colors"
        >
          Crear enlace
        </motion.button>
      )}
        </div>
      ) : (
        <div {...getRootProps({className: 'dropzone w-full py-32'})}>
            <input className="h-100" {...getInputProps()} />
            { isDragActive ? <p className="text-2xl text-center text-gray-600">Suelta el archivo</p> :
            <div className="text-center">
                <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrástralo aquí</p>
                <motion.button className="bg-blue-700 font-bold my-10 text-white w-full py-3 rounded-lg hover:bg-transparent hover:border-2 hover:border-blue-700 hover:text-blue-700 transition-colors"
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}>
                SELECCIONA ARCHIVOS
              </motion.button>
            </div>
              }
          </div>
      )}
          
        </div>
  )
};

export default Dropzone;