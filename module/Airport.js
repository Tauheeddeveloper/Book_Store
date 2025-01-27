const db=require('../db/db.js')

class Airport{
  constructor(Airport_Name,Location_A,Country,Code){
   
    this.Airport_Name=Airport_Name
    this.Location_A=Location_A
    this.Country=Country
    this.Code=Code
  }
  save(){
    return db.execute('insert into Airports(Airport_Name,Location_A,Country,Code) values(?,?,?,?)',[this.Airport_Name,this.Location_A,this.Country,this.Code])
  }
  get_All(){
    return db.execute('select *from Airports')

  }
  static delete_data(id){
    return db.execute('delete from Airports where id=?',[id])
  }
}
module.exports=Airport