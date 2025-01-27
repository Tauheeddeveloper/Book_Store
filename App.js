const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const app = express();
const path=require('path')
app.use(cors());
app.use(express.json());

const mongo_url = "mongodb://localhost:27017/Book_Store_App";

const usermodel = require('./db/user.js');
const new_model=require('./db/New_scheme.js')
const contact_modal=require('./db/Conact_scheme.js')


mongoose.connect(mongo_url)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("Error connecting to MongoDB:", error.message));




// const inertBook=(async ()=>{
//   try{
//     const result=await new_model.insertMany(data)
//     if(result){
//       console.log("data inserted successfully",result)
//     }
//   }
//   catch(er){
//     console.log("Error occur in data saving",er)
//   }
// })
// inertBook()
app.use(express.static(path.join(__dirname,'frontend','my-portfolio','dist')))
app.get('/',((req,res)=>{
  console.log("frontend")
 
  res.sendFile(path.join(__dirname,'frontend','my-portfolio','dist','index.html'))

}))

app.get('/books', async (req, res) => {
  try {
    const books = await new_model.find({ price: 0 });
    res.json(books);
   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/paid', async (req, res) => {
  try {
    const Paid_book = await new_model.find({ price: { $gt: 0 } });
    res.json(Paid_book);
  } catch (er) {
    res.status(500).json("Error in data fetching");
  }
});

app.post('/signup', async (req, res) => {
  console.log("Data received:", req.body);
  const { name, email, password } = req.body;

  try {
    const user_find = await usermodel.findOne({ email });
    if (user_find) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash_password = await bcryptjs.hash(password, 10);
    const user = new usermodel({
      name,
      email,
      password: hash_password,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (er) {
    console.error("Signup Error:", er);
    res.status(500).json({ message: "Internal Server error issue" });
  }
});
app.post('/login',(async (req,res)=>{
  const {email,password}=req.body
  try{
    const user_find=await usermodel.findOne({email})
    const isMatch=await bcryptjs.compare(password,user_find.password)
    if(!user_find || !isMatch){
      res.status(400).json({message:"Invalid User"})
    }
    res.status(201).json("Login Successfull")

  }
  catch(er){
    res.status(500).json({message:"Internal Server Error"})
  }

}))
app.post('/contact',(async (req,res)=>{
  console.log(req.body)
  const {name,email,message}=req.body
  try{
    const check=await usermodel.findOne({email})
    if(check){
     
      const contact_info=new contact_modal({
        name,
        email,
        message
      })
      await contact_info.save()
      console.log("message save succfully")
      res.status(201).json({message:"Message Reached Successfully and Saved"})

    }
  }
  catch(er){
    console.log("Error occur",er)
    res.send(501).json("Internal Server error")
  }

}))


app.listen(4000, () => {
  console.log("Server working on port 4000");
});
