// const hapi = require('hapi');
// const mongoose = require('mongoose');
// const Painting = require('./models/Painting');
// const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');

// const schema = require('./graphql/schema');

// mongoose.connect('mongodb://localhost/modern-api');
// mongoose.connection.once('open', () => {
//   console.log('connected to database');
// });
// const server = hapi.server({
//   port: 4000,
//   host: 'localhost'
// });

// const init = async () => {
//   server.route([
//     {
//       method: 'GET',
//       path: '/',
//       handler: function(request, reply) {
//         return `<h1>Modern apis</h1>`;
//       }
//     },
//     {
//       method: 'GET',
//       path: '/api/v1/paintings',
//       handler: (req, reply) => {
//         return Painting.find();
//       }
//     },
//     {
//       method: 'POST',
//       path: '/api/v1/paintings',
//       handler: async (req, reply) => {
//         const { name, url, techniques } = req.payload;
//         const painting = new Painting({
//           name,
//           url,
//           techniques
//         });
//         return await painting.save();
//       }
//     }
//   ]);
//   await server.start();
// };

// init();
