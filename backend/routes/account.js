const express = require("express");
const { authMiddleware } = require("../authMiddleware");
const { Account } = require("../db");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/balance",authMiddleware,async(req,res)=>{
    const account = await Account.findOne({
        userId:req.userId,
    })
    res.json({
        balance:account.balance,
    })
});

router.post("/transfer",authMiddleware,async(req,res)=>{

   
    const session = await mongoose.startSession();
    session.startTransaction();

    const {to,amount} = req.body;

    const senderAccount = await Account.findOne({
        userId : req.userId,
    }).session(session);

    if(!senderAccount||senderAccount.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Insufficient balance/invalid Account"
        })
    }

    const recieverAccount = await Account.findOne({
        userId:to
    }).session(session);

    if(!recieverAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Invalid Account"
        })
    }

    await Account.updateOne({
        userId:senderAccount.userId,
    },{
        $inc:{
            balance:-amount,
        }
    })
    await Account.updateOne({
        userId:recieverAccount.userId,
    },{
        $inc:{
            balance:amount,
        }
    })

    await session.commitTransaction();

    res.json({
        message:"Transfer Successful"
    })
})


module.exports = router
