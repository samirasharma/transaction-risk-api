class Transaction{
    constructor(data){
        this.userID = data.userID;
        this.amount = data.amount;
        this.merchantCategory = data.merchantCategory;
        this.country = data.country;
        this.paymentMethod = data.paymentMethod;
        this.newCustomer = data.newCustomer;
        this.timestamp = new Date();
    }

    toJSON(){
        return {
            userID: this.userID,
            amount: this.amount,
            merchantCategory: this.merchantCategory,
            country: this.country,
            paymentMethod: this.paymentMethod,
            newCustomer:this.newCustomer,
            timestamp: this.timestamp

        };
    }
    }

    module.exports = Transaction;