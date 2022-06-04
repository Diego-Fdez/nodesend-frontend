import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import authContext from "../context/authContext";
import archivoContext from "../context/archivoContext";

const Header = () => {

  //routing
  const router = useRouter();

  //extraer el usuario del storage
  const AuthContext = useContext(authContext);
  const {usuarioAutenticado, usuario, cerrarSesion} = AuthContext;

  //context de archivos
  const ArchivoContext = useContext(archivoContext);
  const {limpiarState} = ArchivoContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  const redireccionar = () => {
    limpiarState();
  }

  return (
    <header className="py-2 mx-10 flex cursor-pointer flex-col md:flex-row items-center justify-between">
      <a href="/"
        onClick={() => redireccionar()}>
        <Image src="/logo.svg" width={68} height={50} className="mb-2 md:mb-0" />
        </a>
      { usuario ? (
        <div className="flex items-center">
          <p className="mr-2">Hola {usuario.nombre}</p>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            title="Cerrar Sesión"
            className="text-red-500 hover:text-black"
            type="button"
            onClick={() => cerrarSesion()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </motion.button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
        <Link href="/login" passHref>
          <motion.a 
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            title="Iniciar Sesión" 
            className="text-red-500 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          </motion.a>
        </Link>
        <Link href="/crear-cuenta" passHref>
          <motion.a 
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            title="Crear Cuenta" 
            className="text-red-500 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          </motion.a>
        </Link>
      </div>
        </>
      )}
    </header>
  )
}

export default Header