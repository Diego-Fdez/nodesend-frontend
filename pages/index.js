import Layout from "../components/Layout";
import React, { useEffect, useContext } from "react";
import authContext from "../context/authContext";
import archivoContext from "../context/archivoContext";
import Link from "next/link";
import Dropzone from "../components/Dropzone";
import Alerta from "../components/Alerta";
import { motion } from "framer-motion";
import { withRouter } from "next/router";

const Home = () => {
  //extraer el usuario del storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  //extraer el mensaje de error de archivos
  const ArchivoContext = useContext(archivoContext);
  const { mensaje_archivo, url } = ArchivoContext;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      usuarioAutenticado();
    }
  }, []);

  return (
    <Layout>
      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        {url ? (
          <>
          <p className="text-center text-2xl break-words mt-10">
            <span className="font-bold uppercase text-red-500 text-4xl">Tu URL es:</span> {`${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${url}`}
          </p>
          <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${url}`)}
          className="w-full mt-10 bg-transparent hover:bg-red-500 hover:text-white p-2 uppercase font-bold rounded-md border-2 border-red-500 transition-colors"
        >
          Copiar Enlace
        </motion.button>
        </>
        ) : (
          <>
            {mensaje_archivo && <Alerta />}
            <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>
              <Dropzone />
              <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
                <h2 className='text-4xl font-sans font-bold text-gray-800 my-4'>
                  Compartir archivos de forma sencilla y privada
                </h2>
                <p className='text-lg leading-loose'>
                  <span className='text-red-500 font-bold'>ReactNodeSend</span>{" "}
                  te permite compartir archivos con cifrado de extremo a extremo
                  y un archivo que es eliminado después de ser descargado. Así
                  que puedes mantener lo que compartes en privado y asegurarte
                  de que tus cosas no permanezcan en línea para siempre.
                </p>
                <Link href='/crear-cuenta'>
                  <a className='text-red-500 font-bold text-lg hover:text-red-700'>
                    Crea una cuenta para mayores beneficios
                  </a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default withRouter(Home);