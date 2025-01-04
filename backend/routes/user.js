const express = require("express");
const zod = require("zod");
const{User, Account} = require("../db"); 
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../authMiddleware");
const mongoose = require("mongoose");


const signupSchema = zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
})
const signinSchema = zod.object({
    username:zod.string(),
    password:zod.string(),
})




const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const{success,error,data} = signupSchema.safeParse(body)
    console.log(req.body)    
    if(!success){
      return res.json({
          message:"Invalid inputs",
          error:error,
          data:data,
      })
    }

  const user = await User.findOne({
    username:body.username,
  })

  if(user){
    return res.json({
        message:"Email already exists",
    })
  }

  const dbUser = await User.create(body);

  const userId = dbUser._id;

  await Account.create({
    userId:userId,
    balance:1+Math.random()*10000,
  })

  const token = jwt.sign({
    userId: dbUser._id,
  }, JWT_SECRET);

    res.json({
        message:"User created successfully",
        token: token,
    })

    
});


router.post("/signin", async (req,res)=>{
    const body = req.body;
    const{success} = signinSchema.safeParse(body);

    if(!success){
        return res.json({
            message:"Invalid inputs",
        })
    }
    const user = await User.findOne({
        username:body.username,
        password:body.password,
    })

    if(user){
        const token = jwt.sign({
            userId:user.id
        },JWT_SECRET)
    
          return res.json({
            message:"User signed in successfully",
            token:token,
            id:user._id
        });
    }

    res.status(401).json({
        message:"Error while signing in",
    })

})

const updateBody = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

router.put("/", authMiddleware, async (req,res)=>{
  const{success} = updateBody.safeParse(req.body);
  
  if(!success){
    return res.status(411).json({
        message:"Error while updating information",
    })
  }

  await User.updateOne({_id:req.userId},req.body);

  res.json({
        message:"Updated uccessfully",
  })

})

router.get("/bulk",async (req,res)=>{
   
    const filter = req.query.filter||"";
   
    const regex = new RegExp(`^${filter}`,"i");

    const users  = await User.find({
        $or:[{
            firstName:regex
        },{
            lastName:regex
        }]
    })
    
    res.json({
            users: users.map(user => ({
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
            }))
    })
})


module.exports = router;