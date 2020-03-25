const express = require('express');
const indexRoute = require('./routes/api/index');
const config = require('config');
const PORT = process.env.PORT || config.get('port');
const connectDB = require('./config/connectDB');
const cors = require('cors');

const app = express();
//CORS
app.use(cors());

// let corsOptions = {
//   origin: 'localhost:3000',
// }
//
// app.get('/products/:id', cors(corsOptions), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for only localhost:3000.'})
// });

//connect to db
connectDB();

//set a middleware to parse data
app.use(express.json());

app.use('/api', indexRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
