require('dotenv').config();
const app = require('./app');
const db = require('./models');

db.sequelize
  .sync({ alter: true }) // Hanya untuk dev, gunakan migrasi di production
  .then(() => console.log('Database synced'))
  .catch(console.error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
