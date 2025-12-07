import { useEffect } from "react";
import axios from "axios";

function ApiCanciones({ setListaCanciones }) {
  useEffect(() => {
    const URL = "http://localhost:8000/api/canciones";

    axios.get(URL)
      .then(res => setListaCanciones(res.data))
      .catch(err => console.log("Error al obtener canciones:", err));
  }, [setListaCanciones]);

  return <></>;
}

export default ApiCanciones;
