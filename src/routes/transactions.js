const express = require('express');
const router = express.Router();
const riskEngine = require('../riskEngine');
const { validateTransaction } = require('../validation');
const logger = require('../logger');
const memoryStore = require('../storage/memoryStore');
const Transaction = require('../models/transaction');


router.post('/score',(req,res)=>{
    
   const { error, value } = validateTransaction(req.body);

   if (error){
        return res.status(400).json({ error: error.details[0].message});
   }

    //Generate transaction ID
    const transaction = new Transaction(value);
    const result = riskEngine.evaluate(value);

    //Save transaction with risk result
    const transactionID = memoryStore.save({
        ...transaction.toJSON(),
        ...result
    });

    //Save transaction to storage
    // const transactionID = memoryStore.save({
    //     userID: value.userID,
    //     amount: value.amount,
    //     newCustomer: value.newCustomer,
    //     paymentMethod: value.paymentMethod,
    //     merchantCategory:value.merchantCategory,
    //     country: value.country,
    //     ...result
    // });
    
    logger.info('Transaction scored', {
        transactionID,
        userID: value.userID,
        amount: value.amount,
        riskScore: result.riskScore,
        decision: result.decision
    });
    
    res.json({ 
        transactionID, 
        userID:value.userID, 
        ...result
    });

});

//GET transaction by ID

router.get('/:id', (req,res)=>{
    const transaction = memoryStore.findById(req.params.id);
    if(!transaction){
        return res.status(404).json({error : 'Transaction not found'});
    }
    res.json(transaction);
});

//GET all transactions for a user
router.get('/user/:userID', (req, res)=>{
    const transactions = memoryStore.findByUser(req.params.userID);
    res.json({
        userID: req.params.userID,
        count: transactions.length,
        transactions
    });
});

module.exports = router;
