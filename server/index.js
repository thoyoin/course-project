const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models/index');
const authRoutes = require('./routes/auth');
const templateRoutes = require('./routes/template');

dotenv.config();

const app = express();

/* app.use(cors({
    origin: ['http://localhost:3000', 'https://course-project-bjk6.onrender.com'],
    credentials: true
})); */

app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes)

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