const express = require('express');
const connectDB = require('./config/db');
const users = require('./routes/users');
const auth = require('./routes/auth');
const comics = require('./routes/comics');
// const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

// app.use(cors());
app.use(express.json({ extended: true }));

connectDB();
// app.use(cors());

app.use('/user', users);
app.use('/auth', auth);
app.use('/comic', comics);

app.listen(port, () => {
  console.log(`Server started on ${port}...`);
});
