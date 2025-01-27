const express=require('express')
const router=express.Router()
const login=require('../module/Login.js')
const Passenger=require('../module/Passenger.js')
const flight=require('../module/Flight.js')
const Airports=require('../module/Airport.js')
const Ticket=require('../module/Ticket.js')
const Staff=require('../module/Staff.js')
const Flight = require('../module/Flight.js')
router.get('/',((req,res)=>{
  res.render('Login')
}))
router.post('/login_A',((req,res)=>{
  const data=new login(req.body.username,req.body.password)
    login.check(req.body.password)
    .then(([R,i])=>{
      if(R.length>0){
        res.status(200).render('Flight')
      }
      
    })
    .catch((er)=>{
      res.status(400).send('<h1>Sorry Invalid Password</h1>')
    })
}))
router.get('/add_P',((req,res)=>{
  res.render('PD')
}))

router.post('/submit',((req,res)=>{
  const data=new  Passenger(req.body.name,req.body.date_of_birth,req.body.gender,req.body.email,req.body.phone_number)
  data.save()
  .then(()=>{
    res.redirect('/add_P')
  })
  .catch((er)=>{
    res.status(400).send("Error In Data Saving")
  })

}))




 




router.get('/view_p',((req,res)=>{


     Passenger.get_passenger()
     .then(([data,j])=>{
        res.render('PV',{data})
     })
     
}))
router.get('/passenger/delete/:passenger_ID',((req,res)=>{
  let id=req.params.passenger_ID
  console.log(id)
  Passenger.delete(id)
  .then((req,res)=>{
    res.send("Delete")
  })
}))
//start airport here
router.get('/add_A',((req,res)=>{
  res.render('AirForm')
}))
router.post('/a_sbmit',((req,res)=>{
  console.log(req.body)
  const data=new Airports(req.body.name,req.body.location,req.body.country,req.body.code)
  data.save()
  .then((req,res)=>{
    res.render('Flight')
  })
  .catch((er)=>{
    res.status(400).status("Error In Data Saving")
  })
}))
router.get('/add_F',((req,res)=>{
  res.render('FD')
}))
router.post('/submit-flight',((req,res)=>{
  console.log(req.body)
  const data=new flight(req.body.flight_number,req.body.departure_airport,req.body.arrival_airport,req.body.departure_time,req.body.arrival_time,req.body.details)
  data.save()
  .then(()=>{
    res.status(200).send("Data save Successfully")
  })
  .catch((er)=>{
    res.status(400).send("Data Not Saved")
  })

  

}))
router.get('/add_T',((req,res)=>{
  res.render('Ticket')
}))
router.post('/T_submit',((req,res)=>{
  let data=new Ticket( req.body.passengerID, req.body.flightID,req.body.bookingDate, req.body.seatClass, req.body.price,req.body.status)
  data.save()
  .then(()=>{
    res.status(200).send("Data save successfully")
    
  })
  .catch((er)=>{
    res.status(500).send("error in data saving",er)
  })
  
}))
router.get('/add_S',((req,res)=>{
  res.render('Staff')
}))
router.post('/S_submit',((req,res)=>{
  const data=new Staff(req.body.staffName, req.body.staffRole, req.body.staffEmail, req.body.staffPhone, req.body.flightID)
  data.save()
  .then(()=>{
    res.status(200).send("Data save Successfullt")
  })
  .catch((er)=>{
    res.status(500).send("Error in data saving",er)
  })

}))
  


router.get('/staffs',((req,res)=>{
  Staff.getStaff_Flight()
  .then(([staffs])=>{
    res.render('Staffv',{staffs})
  })
 
}))
router.get('/staff/update/:Staff_ID',((req,res)=>{
  let id=req.params.Staff_ID
  Staff.getByName(id)
  .then(([data])=>{
    if(data){
      Staff.deleteByName(id)
      res.render('Staff')
    }
    
  })
  .catch((er)=>{
    res.status(500).send("Not Found")
  })
}))
router.post('/S_submit',((req,res)=>{
  const data=new Staff(req.body.staffName, req.body.staffRole, req.body.staffEmail, req.body.staffPhone, req.body.flightID)
  data.save()
  .then(()=>{
    res.status(200).send("Data save Successfullt")
  })
  .catch((er)=>{
    res.status(500).send("Error in data saving",er)
  })

}))
router.get('/staff/delete/:Staff_ID',((req,res)=>{
  let id=req.params.Staff_ID
  Staff.deleteByName(id)
  .then(()=>{
    res.send("Delete ")
  })
}))


router.get('/add_TR',((req,res)=>{
  res.render('Trans')
}))
router.get('/add_H',((req,res)=>{
  res.render('Boking_H')
}))
router.get('add_BAG',((req,res)=>{
  res.render('Bag')
}))
router.get('/flights',((req,res)=>{
  flight.get_flight()
  .then(([flights]) => { // Destructure to get `flights` from the result array
    res.render('FV', { flights }); // Pass flights data to the EJS template
  })
  .catch(err => {
    console.error('Error fetching flights:', err);
    res.status(500).send('An error occurred while fetching flights.');
  });
}));

router.get('/passengers',((req,res)=>{
  Passenger.get_passenger()
  .then(([data,j])=>{
     res.render('PV',{data})
  })
  
}))
router.get('/tickets',((req,res)=>{
  Ticket.get_all_tickets()
  .then(([tickets])=>{
    res.render('Tic_v',{tickets})
  })
}))



module.exports=router