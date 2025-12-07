import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/ListaPlaylists.module.css";

function ListaPlaylists({ listaPlaylists }) {
  const [busqueda, setBusqueda] = useState("");

  const filtradas = listaPlaylists.filter(pl =>
    pl.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className={styles.contenedor}>
      <h1>Todas las Playlists</h1>

      <input
        type="text"
        className={styles.buscador}
        placeholder="Buscar playlists"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {filtradas.length === 0 ? (
        <p>No se encontraron playlists.</p>
      ) : (
        <ul className={styles.lista}>
          {filtradas.map((pl) => (
            <li key={pl._id} className={styles.item}>
              <Link to={`/playlists/${pl._id}`} className={styles.link}>
                {pl.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaPlaylists;
