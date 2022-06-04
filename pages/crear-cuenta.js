import Layout from "../components/Layout";
import {motion} from "framer-motion";
import {useFormik} from "formik";
import * as Yup from "yup";
import { useContext, useEffect } from "react";
import authContext from "../context/authContext";
import Alerta from "../components/Alerta";

const crearCuenta = () => {

  const AuthContext = useContext(authContext);
  const {mensaje, registrarUsuario} = AuthContext;

  //formulario y validación con formik y Yup
  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                .required('El nombre es obligatorio'),
      email: Yup.string()
                .required('El correo es obligatorio'),
      password: Yup.string()
                .required('Debes escribir una contraseña')
                .min(6, 'La contraseña debe tener al menos 6 caracteres')
    }),
    onSubmit: valores => {
      registrarUsuario(valores);
    }
  });

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center">
          Crear Cuenta
        </h2>
        {mensaje && <Alerta />}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
          <form 
            onSubmit={formik.handleSubmit}
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label 
                  htmlFor="nombre"
                  className="block text-black text-sm font-bold mb-2">
                  Nombre
                </label>
                <input 
                  type="text"
                  id="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Nombre de Usuario"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
                />
                { formik.touched.nombre && formik.errors.nombre ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.nombre}</p>
                  </div>
                ) : null }
              </div>
              <div className="mb-4">
                <label 
                  htmlFor="email"
                  className="block text-black text-sm font-bold mb-2">
                  Correo
                </label>
                <input 
                  type="email"
                  id="email"
                  placeholder="Correo de Usuario"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
                />
                { formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
                  </div>
                ) : null }
              </div>
              <div className="mb-4">
                <label 
                  htmlFor="password"
                  className="block text-black text-sm font-bold mb-2">
                  Contraseña
                </label>
                <input 
                  type="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Contraseña"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
                />
                { formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null }
              </div>
              <motion.input 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                value="Crear Cuenta"
                className="w-full bg-transparent hover:bg-red-500 hover:text-white p-2 uppercase font-bold rounded-md border-2 border-red-500 transition-colors"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default crearCuenta