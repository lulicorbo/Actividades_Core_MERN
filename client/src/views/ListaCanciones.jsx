import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/ListaCanciones.module.css";

function ListaCanciones({ listaCanciones }) {
  const [busqueda, setBusqueda] = useState("");

  const filtradas = listaCanciones.filter((c) =>
    c.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.artista.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.genero.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className={styles.contenedor}>
      <h1>Todas las canciones</h1>

      <input
        type="text"
        className={styles.buscador}
        placeholder="Buscar por titulo, artista o genero"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {filtradas.length === 0 ? (
        <p>No hay canciones que coincidan con la busqueda.</p>
      ) : (
        <ul className={styles.lista}>
          {filtradas.map((cancion) => (
            <li key={cancion._id} className={styles.item}>
              <Link
                to={`/canciones/${cancion._id}`}
                className={styles.link}
              >
                {cancion.titulo}
              </Link>{" "}
              <span className={styles.detalle}>
                por {cancion.artista} ({cancion.genero})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaCanciones;
