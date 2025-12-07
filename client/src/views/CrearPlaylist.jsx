import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/Formularios.module.css";

function CrearPlaylist({ listaPlaylists, setListaPlaylists }) {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [canciones, setCanciones] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/api/canciones")
      .then(res => setCanciones(res.data))
      .catch(err => console.log(err));
  }, []);

  const toggleCancion = (titulo) => {
    if (seleccionadas.includes(titulo)) {
      setSeleccionadas(seleccionadas.filter(t => t !== titulo));
    } else {
      setSeleccionadas([...seleccionadas, titulo]);
    }
  };

  const enviar = (e) => {
    e.preventDefault();

    const data = {
      name: nombre,
      canciones: seleccionadas
    };

    axios.post("http://localhost:8000/api/playlists", data)
      .then(res => {
        setListaPlaylists([...listaPlaylists, res.data]);
        navigate("/playlists");
      })
      .catch(err => {
        if (err.response?.data?.errors) {
          setErrores(err.response.data.errors);
        }
        if (err.response?.data?.message) {
          setErrores({ general: err.response.data.message });
        }
      });
  };

  return (
    <form className={styles.formulario} onSubmit={enviar}>
      <h2>Nueva Playlist</h2>

      <label>Nombre:</label>
      <input value={nombre} onChange={e => setNombre(e.target.value)} />
      {errores.name && <p className={styles.error}>{errores.name.message}</p>}

      <h3>Seleccioná canciones:</h3>

      {canciones.length === 0 ? (
        <p>No hay canciones cargadas.</p>
      ) : (
        canciones.map(c => (
          <div key={c._id} className={styles.checkboxItem}>
            <input
              type="checkbox"
              checked={seleccionadas.includes(c.titulo)}
              onChange={() => toggleCancion(c.titulo)}
            />
            <label>{c.titulo} – {c.artista}</label>
          </div>
        ))
      )}

      {errores.general && <p className={styles.error}>{errores.general}</p>}

      <button type="submit">Crear Playlist</button>
    </form>
  );
}

export default CrearPlaylist;
