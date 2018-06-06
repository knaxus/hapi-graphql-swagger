const hapi = require('hapi');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');

const schema = require('./graphql/schema');

const server = hapi.server({
  port: 4000,
  host: 'localhost'
});
const init = async () => {
  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphqlOptions: {
        endpointURL: '/graphql'
      },
      route: {
        cors: true
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
