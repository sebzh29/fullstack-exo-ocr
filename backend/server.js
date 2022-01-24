// const http = require('http'); //importe le package http de node

// const app = require('./app');




// // on créé le server
// // const server = http.createServer((req,res) => {
// //     res.end('Voilà la réponse du serveur !!');// on appelle la methode end de l objet reponse
// // });


// app.set('port',process.env.PORT || 3000); // on dit a l appli express sur quel port elle va tourner
// const server = http.createServer(app);



// // port d ecoute du server
// server.listen(process.env.PORT || 3000); //port 3000 par defaut
const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

