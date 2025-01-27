const usermodel=require('../db/user')
const bcryptjs=require('bcryptjs')
const signup=( async (req,res)=>{
  try{
    const {name,email,password}=req.body
    const user= await usermodel.findOne({email})
    if(user){
      return res.status(400).json({message:"user already exist"})
    }
    const hash_password= await bcryptjs.hash(password,10)
   
      const created_user=new usermodel({
        name,
        email,
        password,
      })
     await  created_user.save()
      res.status(201).json({message:"user created successfully "})
    
  }
  catch(er){
    return res.status(500).json("Error in internal server")
  }
})
module.exports=signup
const login=async (req,res)=>{
  try{
    const {email,password}=req.body
    const user=await usermodel.findOne({email})
    const  isMatch=await bcryptjs.compare(password,user.password)
    if(!user || !isMatch){
      return res.status(400).json({message:"Ivalid username or password"
       
      })
    }
    else{
      res.status(200).json({message:"Login Successfull",user:{
        name:user.name,
        email:user.email
      }})
   
    }

  }
  catch(er){
    res.status(500).json("internal server Error")
    console.log(er)
  }
}
module.exports=login