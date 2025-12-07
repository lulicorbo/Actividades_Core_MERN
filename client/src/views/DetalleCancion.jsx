import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "../css/DetalleCancion.module.css";

function DetalleCancion({ listaCanciones, setListaCanciones }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cancion, setCancion] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/canciones/${id}`)
      .then((res) => setCancion(res.data))
      .catch(() => setError(true));
  }, [id]);

  const eliminarCancion = () => {
    axios
      .delete(`http://localhost:8000/api/canciones/${id}`)
      .then(() => {
        const nuevaLista = listaCanciones.filter((c) => c._id !== id);
        setListaCanciones(nuevaLista);
        navigate("/canciones");
      })
      .catch((err) => console.log(err));
  };

  if (error) return <p>Error: la cancion no existe.</p>;
  if (!cancion) return <p>Cargando...</p>;

  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>{cancion.titulo}</h1>

      <p className={styles.info}><strong>Artista:</strong> {cancion.artista}</p>
      <p className={styles.info}><strong>Año de Lanzamiento:</strong> {cancion.anioLanzamiento}</p>
      <p className={styles.info}><strong>Genero:</strong> {cancion.genero}</p>

      <div className={styles.botones}>
        <button className={styles.btnEditar} onClick={() => navigate(`/canciones/editar/${id}`)}>
          Editar Cancion
        </button>

        <button className={styles.btnEliminar} onClick={eliminarCancion}>
          Eliminar
        </button>
      </div>

      <Link to="/canciones" className={styles.volver}>
        Volver a la lista
      </Link>
    </div>
  );
}

export default DetalleCancion;
