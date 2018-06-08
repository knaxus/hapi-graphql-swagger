const hapi = require('hapi');
const { graphiqlHapi, graphqlHapi } = require('apollo-server-hapi');

const schema = require('./graphql/schema');

const init = async () => {
  const server = new hapi.server({
    port: 4000,
    host: 'localhost'
  });
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
