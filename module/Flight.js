const db=require('../db/db.js')
class Flight{
  constructor(Flight_Number,Departure_Airport_ID,Arrival_Airport_ID, Departure_Time,Arrival_Time, Details ){
    this.Flight_Number=Flight_Number
    this.Departure_Airport_ID=Departure_Airport_ID
    this.Arrival_Airport_ID=Arrival_Airport_ID
    this.Departure_Time=Departure_Time
    this.Arrival_Time=Arrival_Time
    this.Details=Details
  }
  save(){
   return  db.execute('insert into Flights(Flight_Number,Departure_Airport_ID,Arrival_Airport_ID, Departure_Time,Arrival_Time, Details) values(?,?,?,?,?,?)',[this.Flight_Number,this.Departure_Airport_ID,this.Arrival_Airport_ID,this.Departure_Time,this.Arrival_Time,this.Details])
  }
  static get_flight(){
    return db.execute(`SELECT Flights.Flight_ID,Flights.Departure_Airport_ID, Flights.Arrival_Airport_ID, Airports.Airport_Name 
FROM Flights 
JOIN Airports ON Airports.Airport_ID = Flights.Departure_Airport_ID`)
  }
}
module.exports=Flight
 