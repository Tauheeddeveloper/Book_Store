const db = require('../db/db.js');

class Ticket {
  constructor(Passenger_ID, Flight_ID, Booking_Date, Seat_Class, Price, Status) {
    this.Passenger_ID = Passenger_ID;
    this.Flight_ID = Flight_ID;
    this.Booking_Date = Booking_Date;
    this.Seat_Class = Seat_Class;
    this.Price = Price;
    this.Status = Status;
  }

  save() {
    return db.execute(
      'INSERT INTO Tickets (Passenger_ID, Flight_ID, Booking_Date, Seat_Class, Price, Status) VALUES (?, ?, ?, ?, ?, ?)',
      [this.Passenger_ID, this.Flight_ID, this.Booking_Date, this.Seat_Class, this.Price, this.Status]
    );
  }

  static get_all_tickets() {
    return db.execute(`select *from Tickets left join  Passengers on Tickets.Passenger_ID=Passengers.Passenger_ID`);
  }

  static get_ticket_by_id(ticketID) {
    return db.execute('SELECT * FROM Tickets WHERE Ticket_ID = ?', [ticketID]);
  }

  static delete_ticket_by_id(ticketID) {
    return db.execute('DELETE FROM Tickets WHERE Ticket_ID = ?', [ticketID]);
  }
}

module.exports = Ticket;
