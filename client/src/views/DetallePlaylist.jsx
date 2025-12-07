import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "../css/DetallePlaylist.module.css";

function DetallePlaylist({ listaPlaylists, setListaPlaylists }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/playlists/${id}`)
      .then((res) => setPlaylist(res.data))
      .catch(() => setError(true));
  }, [id]);

  const eliminarPlaylist = () => {
    axios
      .delete(`http://localhost:8000/api/playlists/${id}`)
      .then(() => {
        const nuevaLista = listaPlaylists.filter((pl) => pl._id !== id);
        setListaPlaylists(nuevaLista);
        navigate("/playlists");
      })
      .catch((err) => console.log(err));
  };

  if (error) return <p>Error: la playlist no existe.</p>;
  if (!playlist) return <p>Cargando...</p>;

  return (
    <div className={styles.contenedor}>
      <h1 className={styles.tituloPrincipal}>{playlist.name}</h1>

      <h3 className={styles.subtitulo}>Canciones</h3>

      <ul className={styles.lista}>
        {playlist.canciones.map((c, idx) => (
          <li key={idx}>
            {c.titulo} – {c.artista}
          </li>
        ))}
      </ul>

      <div className={styles.botones}>
        <button
          className={styles.botonEditar}
          onClick={() => navigate(`/playlists/editar/${id}`)}
        >
          Editar Playlist
        </button>

        <button
          className={styles.botonEliminar}
          onClick={eliminarPlaylist}
        >
          Eliminar Playlist
        </button>
      </div>

      <Link className={styles.volver} to="/playlists">
        Volver a la lista
      </Link>
    </div>
  );
}

export default DetallePlaylist;
