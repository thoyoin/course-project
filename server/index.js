const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models/index');
const authRoutes = require('./routes/auth');
const templateRoutes = require('./routes/template');
const formRoutes = require('./routes/form');
const userRoutes = require('./routes/users');
const commentRoutes = require('./routes/comments');
const likeRoutes = require('./routes/likes');


dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://course-project-bjk6.onrender.com', 'https://course-project-back-tv8f.onrender.com'],
    credentials: true,
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/templates', likeRoutes);

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