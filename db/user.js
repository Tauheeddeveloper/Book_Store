const mongose=require('mongoose')
const user_schema=new mongose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
  }
})
const user=mongose.model("user",user_schema)
module.exports=user