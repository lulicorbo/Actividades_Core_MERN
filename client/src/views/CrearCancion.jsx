import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/Formularios.module.css";

function CrearCancion({ listaCanciones, setListaCanciones }) {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    titulo: "",
    artista: "",
    anioLanzamiento: "",
    genero: ""
  });

  const [errores, setErrores] = useState({});

  const actualizar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/canciones", datos)
      .then((res) => {
        setListaCanciones([...listaCanciones, res.data]);
        navigate("/canciones");
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          setErrores(err.response.data.errors);
        }
      });
  };

  return (
    <form className={styles.formulario} onSubmit={enviar}>
      {/* H1 unificado */}
      <h1 className={styles.tituloPrincipal}>Nueva Cancion</h1>

      <label>Titulo:</label>
      <input name="titulo" value={datos.titulo} onChange={actualizar} />
      {errores.titulo && <p className={styles.error}>{errores.titulo}</p>}

      <label>Artista:</label>
      <input name="artista" value={datos.artista} onChange={actualizar} />
      {errores.artista && <p className={styles.error}>{errores.artista}</p>}

      <label>Año Lanzamiento:</label>
      <input
        name="anioLanzamiento"
        value={datos.anioLanzamiento}
        onChange={actualizar}
      />
      {errores.anioLanzamiento && (
        <p className={styles.error}>{errores.anioLanzamiento}</p>
      )}

      <label>Genero:</label>
      <input name="genero" value={datos.genero} onChange={actualizar} />
      {errores.genero && <p className={styles.error}>{errores.genero}</p>}

      <button type="submit">Crear Cancion</button>
    </form>
  );
}

export default CrearCancion;
