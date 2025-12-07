import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectToDb from './config/databaseConnect.js';
import cancionRouter from './rutas/cancion.route.js';
import playlistRouter from './rutas/playlist.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT2 || 8080;

// MIDDLEWARES
app.use(cors());    
app.use(express.json());

connectToDb();

app.use('/api/canciones', cancionRouter);
app.use('/api/playlists', playlistRouter);

app.listen(PORT, () => {
  console.log(`El server corre en puerto ${PORT}`);
});
