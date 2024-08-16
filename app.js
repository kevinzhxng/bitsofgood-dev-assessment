import express from 'express';
import cors from 'cors';
import db from './firebase.js'; 

const app = express();
const APP_PORT = 4000; 

app.use(cors({ origin: true }));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Bits of Good API TESTING');
});

app.get('/api/health', (req, res) => {
    res.json({ healthy: true })
});

app.listen(APP_PORT, () => {
  console.log(`API listening at http://localhost:${APP_PORT}`);
});
