import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/Formularios.module.css";

function EditarPlaylist({ listaPlaylists, setListaPlaylists }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const encontrada = listaPlaylists.find(pl => pl._id === id);

  const [playlist, setPlaylist] = useState(encontrada || null);
  const [nombre, setNombre] = useState(encontrada ? encontrada.name : "");
  const [seleccionadas, setSeleccionadas] = useState(
    encontrada
      ? encontrada.canciones.map(c =>
          typeof c === "string" ? c : c.titulo
        )
      : []
  );
  const [canciones, setCanciones] = useState([]);
  const [setErrores] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/canciones")
      .then((res) => setCanciones(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (encontrada) return;

    axios
      .get(`http://localhost:8000/api/playlists/${id}`)
      .then((res) => {
        const pl = res.data;
        setPlaylist(pl);
        setNombre(pl.name);
        setSeleccionadas(
          pl.canciones.map((c) =>
            typeof c === "string" ? c : c.titulo
          )
        );
      })
      .catch(() => navigate("/playlists"));
  }, [id, encontrada, navigate]);

  const estaSeleccionada = (titulo) =>
    seleccionadas.some((t) => t.toLowerCase() === titulo.toLowerCase());

  const toggleCancion = (titulo) => {
    const normal = titulo.toLowerCase();

    if (estaSeleccionada(titulo)) {
      setSeleccionadas(
        seleccionadas.filter((t) => t.toLowerCase() !== normal)
      );
    } else {
      setSeleccionadas([...seleccionadas, titulo]);
    }
  };

  const enviar = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/playlists/${id}`, {
        name: nombre,
        canciones: seleccionadas.map((t) => t.trim()),
      })
      .then((res) => {
        // actualizar lista en memoria
        const nuevaLista = listaPlaylists.map((pl) =>
          pl._id === id ? res.data : pl
        );
        setListaPlaylists(nuevaLista);

        // 🔥 ESTA ERA LA PARTE QUE FALLABA
        navigate("/playlists");
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          setErrores(err.response.data.errors);
        }
        if (err.response?.data?.message) {
          setErrores({ general: err.response.data.message });
        }
      });
  };

  if (!playlist) return <p>Cargando...</p>;

  return (
    <form className={styles.formulario} onSubmit={enviar}>
      <h2>Editar Playlist</h2>

      <label>Nombre:</label>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <h3>Seleccioná canciones:</h3>

      {canciones.map((c) => (
        <div key={c._id} className={styles.checkboxItem}>
          <input
            type="checkbox"
            checked={estaSeleccionada(c.titulo)}
            onChange={() => toggleCancion(c.titulo)}
          />
          <label>
            {c.titulo} – {c.artista}
          </label>
        </div>
      ))}

      <button type="submit">Guardar Cambios</button>
    </form>
  );
}

export default EditarPlaylist;
