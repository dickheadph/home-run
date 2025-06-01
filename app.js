const express = require('express');
const cors = require('cors');
//const GlobalErrHandler = require('./Middlewares/GlobalErrHandler');
const AppErr = require('./Middlewares/AppError');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: '*',
    // origin: [
    //   'https://homerun-eight.vercel.app',
    //   'http://localhost:3000',
    //   'http://localhost:3001',
    //   'https://home-run.onrender.com',
    // ],
  })
);
const projectRoute = require('./Routes/projectRoute');
const usersRoute = require('./Routes/userRoute');
const profileRoute = require('./Routes/profileRoute');

app.get('/', (req, res) => {
  res.send(
    '<div><h1 > WELCOME TO HOMERUN: CONTRUCTION & ARCHITECTURE API!!!</h1 ><h3>Freetier has expired. Endpoints are failing.</h3><br/><p><em>(Please use INSOMNIA/POSTMAN for testing.XD)</em></p><br/><p>Endoint: <a href="https://home-run.onrender.com">https://home-run.onrender.com</a></p><ul><label>GET ALL Projects</label><li>/homerun/projects</li><label>GET ALL Users</label><li>/homerun/users</li></ul><br/><p>GET by TYPE/CATEGORY</p><ul><label>GET ALL Architectures</label><li>/homerun/architectures</li><label>GET ALL Planning/Layout</label><li>/homerun/planning</li><label>GET ALL Construction</label><li>/homerun/construction</li></ul></div > '
  );
});
app.use('/homerun/projects', projectRoute);
app.use('/homerun/users', usersRoute);
app.use('/homerun/profile', profileRoute);

app.all('*', (err, req, res, next) => {
  return next(
    new AppErr(
      `Cannot find ${req.originalUrl} endpoit. Refer to API Documentation.`
    )
  );
});

// app.use(GlobalErrHandler);

module.exports = app;
