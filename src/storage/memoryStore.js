/*To store and retrieve answer to these questions : 
"What was my transaction from yesterday?"
"Show me transaction ID txn_123"
"How many transactions did user_456 make?"
We need a memory where these information can be stored*/

class MemoryStore{
    constructor(){
        this.transactions = new Map();
    }

    save(transaction){
        const id = `txn_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;

        this.transactions.set(id,{
            ...transaction,
            id,
            createdAt: new Date()
        });
        return id;
    }

    findById(id){
        return this.transactions.get(id);
    }

    findByUser(userID){
        return Array.from(this.transactions.values())
        .filter(t=> t.userID == userID);

    }
}

module.exports = new MemoryStore();