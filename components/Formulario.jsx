import { useContext, useState } from "react";
import archivoContext from "../context/archivoContext";

const Formulario = () => {

  //context del archivo
  const ArchivoContext = useContext(archivoContext);
  const {agregarPassword, agregarDescargas} = ArchivoContext;

  const [tienePassword, setTienePassword] = useState(false);

  return (
    <div className="w-full mt-20">
      <div>
      <label className="text-lg text-gray-800">Limite de descargas</label>
      <select 
        onChange={e => agregarDescargas(parseInt(e.target.value))}
        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500">
        <option value="1" selected disable>1 Descarga</option>
        <option value="2" selected disable>2 Descargas</option>
        <option value="5" selected disable>5 Descargas</option>
        <option value="10" selected disable>10 Descargas</option>
        <option value="20" selected disable>20 Descargas</option>
      </select>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
        <label className="text-lg text-gray-800" mr-2>Proteger con contraseña</label>
        <input 
          type="checkbox" 
          onChange={() => setTienePassword(!tienePassword)}
        />
        </div>
        {tienePassword ? (
          <input 
          type="password" 
          onChange={e => agregarPassword(e.target.value)}
          className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500" 
        />
        ) : null}
      </div>
    </div>
  )
}

export default Formulario