import styles from "../css/Inicio.module.css";
import { Link } from "react-router-dom";


//no usarrr
function Inicio() {
  return (
    <div className={styles.contenedor}>
      <h1>Bienvenido a la Biblioteca Musical</h1>

      <div className={styles.opciones}>
        <Link to="/canciones" className={styles.boton}>
          Ver Canciones
        </Link>

        <Link to="/canciones/nueva" className={styles.boton}>
          Crear Canción
        </Link>

        <Link to="/playlists" className={styles.boton}>
          Ver Playlists
        </Link>

        <Link to="/playlists/nueva" className={styles.boton}>
          Crear Playlist
        </Link>
      </div>
    </div>
  );
}

export default Inicio;
