const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models/index');
const authRoutes = require('./routes/auth');
const templateRoutes = require('./routes/template');

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://course-project-bjk6.onrender.com'],
    credentials: true,
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes)
app.use('/run-migrations', async (req, res) => {
    try {
        await sequelize.sync({ force: true });
        res.status(200).send('Migrations applied successfully!');
    } catch (error) {
        console.error('Error running migrations:', error);
        res.status(500).send('Failed to apply migrations.');
    }
});

app.get('/', (req, res) => {
  res.send('API is working!');
});

const PORT = process.env.PORT || 5050;

sequelize.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });