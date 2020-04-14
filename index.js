const express = require('express');
const authRoute = require('./routes/api/authorizationAPI');
const noAuthRoute = require('./routes/api/noAuthorizationAPI');
const config = require('config');
const PORT = process.env.PORT || config.get('port');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const auth = require('./middleware/auth');

const app = express();
//CORS
//app.use(cors());

// app.use(cors({
//   origin: 'https://maorutian.github.io/cake-factory-client'
// }));

let allowedOrigins = ['http://localhost:3000','https://maorutian.github.io'];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      let msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));



//connect to db
connectDB();


//set a middleware to parse data
app.use(express.json());

//without Authorization
app.use('/api', noAuthRoute);

//with Authorization
app.use(auth);
app.use('/api', authRoute);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
