require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB config
const db =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_ATLAS_URI
    : process.env.MONGODB_LOCAL_URI;

// Connect to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on('error', (error) =>
  console.log('Connection error', error)
);

mongoose.connection.once('open', () =>
  console.log('Local database is connected...')
);

// Use Routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
