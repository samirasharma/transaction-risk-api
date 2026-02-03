# Transaction Risk Scoring API

Real-time fintech API for transaction risk assessment. Built with Node.js + Express.

**Live Demo:** https://transaction-risk-api.onrender.com  
**Status:** ✅ Deployed & Running

---

## Quick Start
### Test the API
```bash
# Health check
curl https://transaction-risk-api.onrender.com/health

# Score a transaction
curl -X POST https://your-app.onrender.com/api/score \
  -H "Content-Type: application/json" \
  -d '{"userID":"user123","amount":15000,"newCustomer":true}'
```

### Run Locally
```bash
git clone https://github.com/samirasharma/transaction-risk-api
cd transaction-risk-api
npm install
npm start
# API runs on http://localhost:3000
```

---

## API Endpoints

**GET /health** - Health check  
**POST /api/score** - Score transaction risk

### Example Request/Response
```json
// POST /api/score
{
    "userID": "user_123",
    "amount": 150000,
    "newCustomer": true
}

// Response
{
  "transactionID": "txn_1770159187475_kbtwtwtfs",
  "userID": "user_123",
  "riskScore": 95,
  "decision": "REJECT"
}
```

**Decisions:**
- `APPROVED` - score < 45
- `REVIEW` - score 45-79  
- `REJECTED` - score ≥ 80

---

## Tech Stack

Node.js • Express • Joi • Winston

---

## Risk Scoring Logic

- Amount > $10k: +30 points
- Amount > $50k: +50 points  
- New customer: +15 points

---

## Author

Samira Sharma 