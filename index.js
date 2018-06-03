const hapi = require('hapi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/modern-api');
mongoose.connection.once('open', () => {
  console.log('connected to database');
});
const server = hapi.server({
  port: 4000,
  host: 'localhost'
});

const init = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      return `<h1>My modern api</h1>`;
    }
  });
  await server.start();
};

init();
