const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/cheeses', require('./controllers/cheeses'));
app.use('/api/v1/desserts', require('./controllers/desserts'));
app.use('/api/v1/sauces', require('./controllers/sauces'));
app.use('/api/v1/meals', require('./controllers/meals'));
app.use('/api/v1/drinks', require('./controllers/drinks'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
