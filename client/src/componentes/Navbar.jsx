import { Link } from "react-router-dom";
import styles from "../css/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link to="/canciones">Canciones</Link></li>
        <li><Link to="/playlists">Playlists</Link></li>
        <li><Link to="/canciones/crear">Agregar Cancion</Link></li>
        <li><Link to="/playlists/crear">Agregar Playlist</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
