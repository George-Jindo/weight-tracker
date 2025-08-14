const express = require('express');
const router = express.Router();
const { pool } = require('../db');

/*
 * Routes for weight entries CRUD operations.
 * Table schema assumed:
 *   CREATE TABLE weight_entries (
 *     id SERIAL PRIMARY KEY,
 *     date DATE NOT NULL,
 *     weight DECIMAL NOT NULL
 *   );
 */

// GET all entries sorted by date ascending
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM weight_entries ORDER BY date ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single entry by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM weight_entries WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create a new entry
router.post('/', async (req, res) => {
  const { date, weight } = req.body;
  if (!date || weight == null) {
    return res.status(400).json({ error: 'Date and weight are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO weight_entries (date, weight) VALUES ($1, $2) RETURNING *',
      [date, weight]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update an existing entry
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date, weight } = req.body;
  if (!date || weight == null) {
    return res.status(400).json({ error: 'Date and weight are required' });
  }
  try {
    // Verify the entry exists
    const find = await pool.query('SELECT id FROM weight_entries WHERE id = $1', [id]);
    if (find.rows.length === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    await pool.query(
      'UPDATE weight_entries SET date = $1, weight = $2 WHERE id = $3',
      [date, weight, id]
    );
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE an entry
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Verify the entry exists
    const find = await pool.query('SELECT id FROM weight_entries WHERE id = $1', [id]);
    if (find.rows.length === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    await pool.query('DELETE FROM weight_entries WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;