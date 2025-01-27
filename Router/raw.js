// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const mongoConnect = require('./db/db.js'); // MongoDB connection import
// const { MongoClient, ObjectId } = require('mongodb');
// const { type } = require('os');
// const app = express();

// // Middleware setup
// app.use(cors());
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'Router', 'views'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public'))); // To serve static HTML, CSS, and JS

// // MongoDB connection
// mongoConnect(client => {
//   console.log('MongoDB connected');
//   const db = client.db('mydatabase');
//   const collection = db.collection('mycollection');
//   const second=db.collection('Passenger')
//   const third=db.collection('flight')
//   const Airport=db.collection('Airport')





//   // Route to render login page
//   app.get('/', (req, res) => {
//     res.render('Login');
//   });

//   // Route to handle login form submission and insert data
//   app.post('/login_A', (req, res) => {
//     const data = req.body;
//     console.log(data);
//     collection.insertOne(data)
//       .then(() => {
//         console.log("Data added successfully");
//         res.render('Flight')
//       })
//       .catch((er) => {
//         console.log("Error inserting data");
//       });
//   });

//   // Route to fetch data and send it to the front-end
//   app.get('/add_P',((req,res)=>{
//     res.render('PD')
//   }))
//   app.post('/submit',((req,res)=>{
//     const data=req.body
//     console.log(data)
//     second.insertOne(data)
//     .then((data)=>{
//       res.render('Flight')

//     })
//     .catch((er)=>{
//       console.log("Error occur during data saving :",er)
//     })
//   }))
//   app.get('/passengers',((req,res)=>{
//     second.find({}).toArray()
//     .then((data)=>{
//       console.log(data)
//       res.render('PV',{data})
//     })
//     .catch((er)=>{
//       console.log("Error occur during data viewing")
//     })
//   }))
//   app.get('/add_F',((req,res)=>{
//     res.render('FD')
//   }))
//   app.post('/submit-flight',((req,res)=>{
//     let data=req.body
//     third.insertOne(data)
//     .then(()=>{
//       console.log("data inserted successfully")
//       res.render('Flight')

//     })
//     .catch((er)=>{
//       res.status(400).send("Error in data saving due to network issue")
//     })

//   }))
//   app.get('/flights',((req,res)=>{
//     third.find({}).toArray()
//     .then((flights)=>{
//       console.log(flights)
//       res.render('FV',{flights})
//     })
//     .catch((er)=>{
//       res.status(400).send("Error in data base")
//     })
//   }))
//   app.get('/add_A',((req,res)=>{
//     res.render('AirForm')
//   }))
//   app.post('/a_sbmit',((req,res)=>{
//     const data=req.body
//     Airport.insertOne(data)
//     .then(()=>{
//       res.render('Flight')
//     })
//     .catch((er)=>{
//       res.status(400).send("Error in Datasaving Due to network issue")
//     })

//   }))
//   app.get('/Airports',((req,res)=>{
//     Airport.find({}).toArray()
//     .then((Airports)=>{
//       console.log(Airports)
//       res.render('AV',{Airports})
//     })
//   }))
//   app.get('/add_T',((req,res)=>{
//     res.render('Ticket')
//   }))
//   app.post('/T_submit',((req,res)=>{
//     const data={
//       type:'Ticket',
//       data:req.body
//     }
//     Airport.insertOne(data)
//     .then(()=>{
//       res.render('Flight')
//     })
//     .catch((er)=>{
//       res.status(400).send("error in data saving",er)
//     })
//   }))
//   app.get('/tickets',((req,res)=>{
//     Airport.find({type:'Ticket'}).toArray()
//     .then((tickets)=>{
//       console.log(tickets)
//     res.render('Tic_v',{tickets})
//     })
//     .catch((er)=>{
//       res.status(400).send("error in data showing")
//     })
//   }))
//   app.get('/add_S',((req,res)=>{
//     res.render('Staff')
//   }))
//   app.post('/S_submit',((req,res)=>{
//     const data={
//       type:'staff',
//       data:req.body
//     }
//     Airport.insertOne(data)
//     .then(()=>{
//       res.render('Flight')
//     })
//     .catch((er)=>{
//       res.status(500).send("error in data saving")
//     })
//   }))
//   app.get('/staffs',((req,res)=>{
//     Airport.find({type:'staff'})
//     .toArray()
//     .then((staffs)=>{
//       console.log(staffs)
//       res.render('Staffv',{staffs})
//     })
//     .catch((er)=>{
//       res.status(500).send("error in data saving")
//     })
//   }))
//   app.post('/tickets/delete/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await Airport.deleteOne({ _id: new ObjectId(id) });
//         console.log(`Ticket with ID ${id} deleted successfully`);
//         res.redirect('/tickets'); // Redirect to tickets page after deletion
//     } catch (error) {
//         console.error('Error deleting ticket:', error);
//         res.status(500).send('Error deleting ticket',er);
//     }
// });
// app.get('/tickets/edit/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//       const ticket = await Airport.findOne({ _id: new ObjectId(id) });
//       res.render('EditTicket', { ticket });
//   } catch (error) {
//       console.error('Error fetching ticket:', error);
//       res.status(500).send('Error fetching ticket');
//   }
// });
// app.post('/tickets/edit/:id', async (req, res) => {
//   const { id } = req.params;
//   const updatedData = {
//       "data.passengerID": req.body.id,
//       "data.email": req.body.email,
//       "data.flight": req.body.flight
//   };

//   try {
//       await Airport.updateOne(
//           { _id: new ObjectId(id) },
//           { $set: updatedData }
//       );
//       console.log(`Ticket with ID ${id} updated successfully`);
//       res.redirect('/tickets'); // Redirect to tickets page after update
//   } catch (error) {
//       console.error('Error updating ticket:', error);
//       res.status(500).send('Error updating ticket');
//   }
// });



//   // Server start
//   const port = 4000;
//   app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
//   });
// });