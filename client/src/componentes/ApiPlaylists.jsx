import { useEffect } from "react";
import axios from "axios";

function ApiPlaylists({ setListaPlaylists }) {
  useEffect(() => {
    const URL = "http://localhost:8000/api/playlists";

    axios.get(URL)
      .then(res => setListaPlaylists(res.data))
      .catch(err => console.log("Error al obtener playlists:", err));
  }, [setListaPlaylists]);

  return <></>;
}

export default ApiPlaylists;
