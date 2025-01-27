const db = require('../db/db.js'); // Import the db connection

class Staff {
  constructor(Name_Staff, Role_Staff, Email, Phone_Number, Flight_ID) {
    this.Name_Staff = Name_Staff;
    this.Role_Staff = Role_Staff;
    this.Email = Email;
    this.Phone_Number = Phone_Number;
    this.Flight_ID = Flight_ID;
  }

  // Save function to insert data into the Staff table
  save() {
    return db.execute(
      'INSERT INTO Staff (Name_Staff, Role_Staff, Email, Phone_Number, Flight_ID) VALUES (?, ?, ?, ?, ?)',
      [this.Name_Staff, this.Role_Staff, this.Email, this.Phone_Number, this.Flight_ID]
    );
  }

  // Static function to retrieve all staff data
  static getAll() {
    return db.execute('SELECT * FROM Staff');
  }

 
  static getByName(Staff_ID) {
    return db.execute('SELECT * FROM Staff WHERE Staff_ID = ?', [Staff_ID]);
  }
  static getStaff_Flight(){
     return db.execute(`SELECT 
    Staff.Staff_ID,
    Staff.name_staff,
    Staff.role_Staff,
    Staff.Email,
    Staff.Phone_Number,
    Flights.Flight_ID
FROM 
    Staff
JOIN 
    Flights
ON 
    Staff.Flight_ID = Flights.Flight_ID;
`)
  }

  // Static function to delete a staff member by name
  static deleteByName(Staff_ID) {
    return db.execute('DELETE FROM Staff WHERE Staff_ID = ?', [Staff_ID]);
  }
}

module.exports = Staff;
