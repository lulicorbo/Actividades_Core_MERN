import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/Formularios.module.css";

function EditarCancion({ listaCanciones, setListaCanciones }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    titulo: "",
    artista: "",
    anioLanzamiento: "",
    genero: ""
  });

  const [setErrores] = useState({});

  // Cargar la canción existente
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/canciones/${id}`)
      .then((res) => {
        setDatos({
          titulo: res.data.titulo,
          artista: res.data.artista,
          anioLanzamiento: res.data.anioLanzamiento,
          genero: res.data.genero
        });
      })
      .catch(() => navigate("/canciones"));
  }, [id, navigate]);

  const actualizar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/canciones/${id}`, datos)
      .then((res) => {
        const nuevaLista = listaCanciones.map((c) =>
          c._id === id ? res.data : c
        );

        setListaCanciones(nuevaLista);
        navigate(`/canciones/${id}`);
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          setErrores(err.response.data.errors);
        }
      });
  };

  return (
    <form className={styles.formulario} onSubmit={enviar}>
      <h1 className={styles.tituloPrincipal}>Editar Cancion</h1>

      <label>Titulo:</label>
      <input name="titulo" value={datos.titulo} onChange={actualizar} />

      <label>Artista:</label>
      <input name="artista" value={datos.artista} onChange={actualizar} />

      <label>Año Lanzamiento:</label>
      <input
        name="anioLanzamiento"
        value={datos.anioLanzamiento}
        onChange={actualizar}
      />

      <label>Genero:</label>
      <input name="genero" value={datos.genero} onChange={actualizar} />

      <button type="submit">Guardar Cambios</button>
    </form>
  );
}

export default EditarCancion;
