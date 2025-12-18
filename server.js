const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Get all equipment
app.get('/api/equipment', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM equipment ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

// Add new equipment
app.post('/api/equipment', async (req, res) => {
  const { name, type, status, last_cleaned } = req.body;
  
  if (!name || !type || !status) {
    return res.status(400).json({ error: 'Name, type, and status are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO equipment (name, type, status, last_cleaned) VALUES (?, ?, ?, ?)',
      [name, type, status, last_cleaned || null]
    );
    
    const [newEquipment] = await db.query('SELECT * FROM equipment WHERE id = ?', [result.insertId]);
    res.status(201).json(newEquipment[0]);
  } catch (error) {
    console.error('Error adding equipment:', error);
    res.status(500).json({ error: 'Failed to add equipment' });
  }
});

// Update equipment
app.put('/api/equipment/:id', async (req, res) => {
  const { id } = req.params;
  const { name, type, status, last_cleaned } = req.body;

  try {
    await db.query(
      'UPDATE equipment SET name = ?, type = ?, status = ?, last_cleaned = ? WHERE id = ?',
      [name, type, status, last_cleaned || null, id]
    );
    
    const [updatedEquipment] = await db.query('SELECT * FROM equipment WHERE id = ?', [id]);
    
    if (updatedEquipment.length === 0) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    
    res.json(updatedEquipment[0]);
  } catch (error) {
    console.error('Error updating equipment:', error);
    res.status(500).json({ error: 'Failed to update equipment' });
  }
});

// Delete equipment
app.delete('/api/equipment/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await db.query('DELETE FROM equipment WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting equipment:', error);
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
});

// Create equipment table if it doesn't exist
async function initializeDatabase() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS equipment (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type ENUM('Machine', 'Vessel', 'Tank', 'Mixer') NOT NULL,
        status ENUM('Active', 'Inactive', 'Under Maintenance') NOT NULL,
        last_cleaned DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// Start server
app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Server running on http://localhost:${PORT}`);
});
