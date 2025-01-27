
const mongose=require('mongoose')
const updated_book=new mongose.Schema({
  name:{type:String, required:true},
  title:{type:String, required:true},
  price:{type:Number, required:true},
  image:{type:String, required:true}
})
const update_model=mongose.model('UBook',updated_book)
module.exports=update_model