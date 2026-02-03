const express = require('express');
const Joi = require('joi');
const Logger = require('winston');
const app = express();
const port = 3000;

app.use(express.json());

function calculateRisk(transaction){
    let score =0
    if (transaction.amount >10000) score +=30;
    if (transaction.amount >50000) score +=50;
    if (transaction.newCustomer) score +=15;
    return score


}

app.get('/',(req,res)=>{
    res.send('Hello world, server is running on port 3000');
})

app.get('/health',(req,res)=>{
    res.json({
        "status":"ok",
        "timestamp": new Date().toDateString()
    });
});

const schema = Joi.object({
    amount:Joi.number().positive().required(),
    userID:Joi.string().required(),
    newCustomer:Joi.boolean()
});

app.post('/api/score',(req,res)=>{
    //access json sent in the request
    const {userID, amount, newCustomer}=req.body;
   
    if(!userID || amount== undefined){
        return res.status(400).json({error: "Missing required field "});
    }

    const riskScore = calculateRisk({amount, newCustomer});
    let decision = "APPROVE"
    if (riskScore >=45) decision = "REVIEW";
    if (riskScore>=80) decision= "REJECT";

    //Generate transaction ID
    const transactionID = `txn_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;

    Logger.info('Transaction scored',{
        userID,amount, riskScore, decision
    });

    res.json({ transactionID, userID, riskScore, decision });

});

app.post('/api/echo', (req,res)=>{
    const receivedData = req.body;
    res.json(receivedData);
});

app.use((err, req, res, next) => {
    Logger.error('Unhandled error', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  });


app.listen(port,()=>{
    console.log(`example app listening to port ${port}`);

})
