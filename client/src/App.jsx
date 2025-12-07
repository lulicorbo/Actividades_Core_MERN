import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import ApiCanciones from "./componentes/ApiCanciones";
import ApiPlaylists from "./componentes/ApiPlaylists";

// Canciones
import Inicio from "./views/Inicio";
import ListaCanciones from "./views/ListaCanciones";
import DetalleCancion from "./views/DetalleCancion";
import CrearCancion from "./views/CrearCancion";
import EditarCancion from "./views/EditarCancion";

// Playlists
import ListaPlaylists from "./views/ListaPlaylists";
import DetallePlaylist from "./views/DetallePlaylist";
import CrearPlaylist from "./views/CrearPlaylist";
import EditarPlaylist from "./views/EditarPlaylist";

//Menu navbar arriba
import Navbar from "./componentes/Navbar";

// 404
import NoEncontrado from "./componentes/NoEncontrado";

function App() {
  const [listaCanciones, setListaCanciones] = useState([]);
  const [listaPlaylists, setListaPlaylists] = useState([]);

  return (
    <div>
      <ApiCanciones setListaCanciones={setListaCanciones} />
      <ApiPlaylists setListaPlaylists={setListaPlaylists} />

      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route
          path="/canciones"
          element={<ListaCanciones listaCanciones={listaCanciones} />}
        />

        <Route
          path="/canciones/crear"
          element={
            <CrearCancion
              listaCanciones={listaCanciones}
              setListaCanciones={setListaCanciones}
            />
          }
        />

        <Route
          path="/canciones/editar/:id"
          element={
            <EditarCancion
              listaCanciones={listaCanciones}
              setListaCanciones={setListaCanciones}
            />
          }
        />

        <Route
          path="/canciones/:id"
          element={
            <DetalleCancion
              listaCanciones={listaCanciones}
              setListaCanciones={setListaCanciones}
            />
          }
        />

        <Route
          path="/playlists"
          element={<ListaPlaylists listaPlaylists={listaPlaylists} />}
        />

        <Route
          path="/playlists/crear"
          element={
            <CrearPlaylist
              listaPlaylists={listaPlaylists}
              setListaPlaylists={setListaPlaylists}
            />
          }
        />

        <Route
          path="/playlists/editar/:id"
          element={
            <EditarPlaylist
              listaPlaylists={listaPlaylists}
              setListaPlaylists={setListaPlaylists}
            />
          }
        />

        <Route
          path="/playlists/:id"
          element={
            <DetallePlaylist
              listaPlaylists={listaPlaylists}
              setListaPlaylists={setListaPlaylists}
            />
          }
        />

        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </div>
  );
}

export default App;
