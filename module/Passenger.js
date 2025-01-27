const db=require('../db/db.js')

class Passenger{
  constructor(Name, Date_of_Birth ,Gender,Email, Phone_Number ){
  
    this.Name=Name
    this.Date_of_Birth=Date_of_Birth
    this.Gender=Gender
    this.Email=Email
    this.Phone_Number=Phone_Number
  }
  save(){
    return db.execute('insert into Passengers(Name,Date_of_Birth ,Gender,Email, Phone_Number) values( ?,?,?,?,?)',
      [this.Name,this.Date_of_Birth,this.Gender,this.Email,this.Phone_Number]
    )
     
  }
 static get_passenger(){
    return db.execute('select *from Passengers')
  }
  static get_name(Name){
    return db.execute('select *from Passengers where Name=?',[Name])
  }
  static delete(Name){
    return db.execute('delete from Passengers where Name=?',[Namep])
  }


}
module.exports=Passenger