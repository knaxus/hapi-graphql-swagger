const hapi = require('hapi');
const mongoose = require('mongoose');
const { graphiqlHapi, graphqlHapi } = require('apollo-server-hapi');
const Painting = require('./models/Painting');
const Inert = require('inert');
const Vision = require('vision');
const Pack = require('./package');

const HapiSwagger = require('hapi-swagger');

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
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Painting Api documentation'
          // version: Pack.version
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

  await server.route([
    {
      method: 'GET',
      path: '/api/v1/paintings',
      config: {
        description: 'Get all the paintings',
        tags: ['api', 'v1', 'painting']
      },
      handler: (req, reply) => {
        return PerformanceNavigationTiming.find();
      }
    },
    {
      method: 'POST',
      path: '/api/v1/paintings',
      config: {
        description: 'add new painting to the db',
        tags: ['api', 'v1', 'painting']
      },
      handler: (req, reply) => {
        const { name, url, technique } = req.payload;
        const painting = new Painting({
          name,
          url,
          technique
        });
      }
    }
  ]);
  await server.start();
};

init();
