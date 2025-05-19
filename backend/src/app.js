const express = require('express');
const cors = require('cors');
// const helmet = require('helmet');
const AppError = require('./core/error');
// const { swaggerUi, swaggerSpec } = require('./config/swagger');
const swaggerSpec = require('./config/swagger');
const redoc = require('redoc-express');

const authRoutes = require('./features/auth/auth.routes');
const userRoutes = require('./features/user/user.routes');
const storeRoutes = require('./features/store/store.routes');
const foodItemRoutes = require('./features/foodItem/foodItem.routes');

const app = express();

app.use(express.json());
app.use(cors());
// app.use(helmet());

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get(
  '/docs',
  redoc({
    title: 'BerbagiDec API Documentation',
    specUrl: '/docs/swagger.json',
    theme: {
      colors: {
        primary: {
          main: '#007bff',
        },
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        headings: {
          fontFamily: 'Inter, sans-serif',
        },
      },
    },
  })
);

app.get('/docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/store', storeRoutes);
app.use('/food', foodItemRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  return res.status(status).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
