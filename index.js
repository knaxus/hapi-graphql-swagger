const hapi = require('hapi');
const mongoose = require('mongoose');
const { graphiqlHapi, graphqlHapi } = require('apollo-server-hapi');

const schema = require('./graphql/schema');

mongoose.connect('mongodb://localhost/modern-api');
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

const init = async () => {
  const server = new hapi.server({
    port: 4000,
    host: 'localhost'
  });
  await server.register([
    Inert,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Painting Api documentation',
          version: Pack.version
        }
      }
    }
  ]);
  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql'
      }
    }
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema
      },
      route: {
        cors: true
      }
    }
  });
  await server.start();
};

init();
