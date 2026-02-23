const express = require('express');
const transactionRoutes = require('./src/routes/transactions');
const logger = require('./src/logger');


const app = express();
const port = 3000;

app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Hello world, server is running on port 3000');
});

app.get('/health',(req,res)=>{
    res.json({
        "status":"ok",
        "timestamp": new Date().toDateString()
    });
});

app.use('/api/transactions', transactionRoutes);

app.use((err, req, res, next) => {
    logger.error('Unhandled error', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  });


app.listen(port,()=>{
    logger.info(`example app listening to port ${port}`);

});
