import Layout from "../../components/Layout";
import clienteAxios from "../../config/clienteAxios";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import archivoContext from "../../context/archivoContext";
import Alerta from "../../components/Alerta";

const Enlace = () => {

    //context de archivos
    const ArchivoContext = useContext(archivoContext);
    const {mostrarAlerta, mensaje_archivo} = ArchivoContext;

  const [protegido, setProtegido] = useState(false);
  const [password, setPassword] = useState('');

  //Routing para obtener el ID actual
  const router = useRouter();
  const {
    query: { url },
  } = router;

  useEffect(() => {
    if (url) {
      const obtenerEnlace = async () => {
        const res = await clienteAxios(`/enlaces/${url}`);
        setProtegido(res.data.password);
      };
      obtenerEnlace();
    }
  }, [url]);

  //verificar el password
  const verificarPassword = async e => {
    e.preventDefault();

    const data = {
      password
    }
    try {
      const resultado = await clienteAxios.post(`/enlaces/${url}`, data)
      setProtegido(resultado.data.password)
    } catch (error) {
      mostrarAlerta(error.response.data.msg)
    }
  }

  
  return (
    <Layout>
      {protegido ? (
        <>
          <p className="text-center">Ingresa la contraseña para desbloquear el enlace</p>
          {mensaje_archivo && <Alerta />}
          <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg'>
              <form 
                onSubmit={e => verificarPassword(e)}
                className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                  <label
                    htmlFor='password'
                    className='block text-black text-sm font-bold mb-2'
                  >
                    Nombre
                  </label>
                  <input
                    type='password'
                    id='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
                  />
                </div>
                <motion.input
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type='submit'
                  value='Validar Contraseña'
                  className='w-full bg-transparent hover:bg-red-500 hover:text-white p-2 uppercase font-bold rounded-md border-2 border-red-500 transition-colors'
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className='text-4xl text-center text-gray-700'>
            Descarga tu archivo:
          </h1>
          <div className='flex items-center justify-center mt-10'>
            <a
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/archivos/${url}`}
              className='bg-red-500 px-10 text-center py-3 rounded uppercase font-bold text-white cursor-pointer'
              download
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Enlace;
