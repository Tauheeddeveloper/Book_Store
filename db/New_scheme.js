const mongose=require('mongoose')
const new_scheme=new mongose.Schema({
  id:{
    type:Number,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  }


})
const new_model=mongose.model("Books",new_scheme)
module.exports=new_model