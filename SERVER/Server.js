const express = require('express');
const app = express();
const cors=require('cors')
const port = process.env.PORT || 5001;
require('dotenv').config();
const dbConfig = require('./config/dbconfig');
app.use(express.json());
app.use(cors()) // connect between different ports
const userRoutes=require('./routes/usersRoutes')
app.use('/api/users', userRoutes);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`node server is listening on port ${port}`)
})