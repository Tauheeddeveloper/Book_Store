const db=require('../db/db.js')

class LoginP{
  constructor(Admin_name,Password_A){
    this.Admin_name=Admin_name
    this.Password_A=Password_A
  }
  save(){
      return db.execute(
        'insert into Login (Admin_name,Password_A) values(?,?)',
        [this.Admin_name,this.Password_A])
  }
  get(){
    return db.execute('select *from Login where Password_A=? ',[Password_A])
  }
  static check(Password_A){
   return  db.execute('select *from Login where Password_A=?',[Password_A])
  }
}
module.exports=LoginP