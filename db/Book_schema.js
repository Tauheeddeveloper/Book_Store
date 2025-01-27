const mongose=require('mongoose')
const Book=new mongose.Schema({
  name: {type:String, requires:true },
 
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }

})
const book_model=mongose.model('book',Book)
module.exports=book_model
