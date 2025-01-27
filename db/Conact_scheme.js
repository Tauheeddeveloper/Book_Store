
const mongose=require('mongoose')
const contact_scheme=new mongose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  message:{
    type:String,
    required:true
  }
})
const contact_modal=mongose.model("contact",contact_scheme)
module.exports=contact_modal