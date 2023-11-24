// const express = require('express');
// const app = express();
// const port = 3001;

// const Alitas = require('./Alitas');

// app.use(express.json());
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });

// app.get('/', (req, res) => {
//   Alitas.getAlitas()
//     .then(response => {
//       // Extract only the needed information (sabor and precio) from each alita
//       const simplifiedResponse = response.map(alita => ({
//         sabor: alita.sabor,
//         precio: alita.precio,
//       }));

//       res.status(200).send(simplifiedResponse);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     });
// });

// app.post('/alitas', async (req, res) => {
//     const alita = {
//       piezas: req.body.piezas,
//       sabor: req.body.sabor,
//       precio: req.body.precio,
//       cantidad_disponible: req.body.cantidad_disponible,
//     };
  
//     try {
//       const response = await Alitas.createAlita(alita);
//       res.status(200).send(response);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

// app.delete('/alitas/:id', (req, res) => {
//   const alitaId = req.params.id;

//   Alitas.deleteAlita(alitaId)
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     });
// });

// app.put('/alitas', (req, res) => {
//   const alita = {
//     id_alitas: req.body.id_alitas,
//     piezas: req.body.piezas,
//     sabor: req.body.sabor,
//     precio: req.body.precio,
//     cantidaddisponible: req.body.cantidaddisponible,
//   };

//   Alitas.updateAlita(alita)
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     });
// });

// app.listen(port, () => {
//   console.log(`App sorriendo en el puerto: ${port}.`);
// });
