const Joi = require('joi');
const transactionSchema = Joi.object({
    userID:Joi.string().required(),
    amount:Joi.number().positive().required(),
    merchantCategory:Joi.string().valid('retail','gambling','crypto','adult'),
    country:Joi.string().length(2),
    paymentMethod:Joi.string().valid('bank_transfer','debit_card','credit_card','crypto'),
    newCustomer:Joi.boolean()
});

function validateTransaction(data){
    return transactionSchema.validate(data);
}

module.exports = { validateTransaction };