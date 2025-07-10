import express from 'express';
import pkg from 'pg';
import bcrypt from 'bcryptjs';
const { Pool } = pkg;

const app = express();
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/attachment_system',
});

app.get('/', (req, res) => {
  res.send('Attachment System API running');
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    // Check if user exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert user
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Example: Get all students
app.get('/students', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM student');
  res.json(rows);
});

// Example: Create a student
app.post('/students', async (req, res) => {
  const { name, email, organization_id } = req.body;
  const result = await pool.query(
    'INSERT INTO student (name, email, organization_id) VALUES ($1, $2, $3) RETURNING *',
    [name, email, organization_id]
  );
  res.json(result.rows[0]);
});

// Add similar CRUD endpoints for Organization, Attendance, Evaluation, User as needed

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
