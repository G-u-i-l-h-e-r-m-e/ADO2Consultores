import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const dbPath = path.join(__dirname, 'database.json');

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

function writeDB(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// LISTAR
router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.consultores);
});

// BUSCAR POR ID
router.get('/:id', (req, res) => {
  const db = readDB();
  const item = db.consultores.find((c: any) => c.id == req.params.id);
  res.json(item || null);
});

// ADICIONAR
router.post('/', (req, res) => {
  const db = readDB();
  const novo = req.body;
  novo.id = Date.now();

  db.consultores.push(novo);
  writeDB(db);

  res.json(novo);
});

// EDITAR
router.put('/:id', (req, res) => {
  const db = readDB();
  const index = db.consultores.findIndex((c: any) => c.id == req.params.id);

  db.consultores[index] = { ...db.consultores[index], ...req.body };
  writeDB(db);

  res.json(db.consultores[index]);
});

// EXCLUIR
router.delete('/:id', (req, res) => {
  const db = readDB();
  db.consultores = db.consultores.filter((c: any) => c.id != req.params.id);
  writeDB(db);

  res.json({ message: 'Removido' });
});

export default router;
