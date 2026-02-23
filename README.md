# Transaction Risk Scoring API

A fintech API that scores transaction risk in real-time using multi-category weighted algorithms with transaction storage.

**Live Demo:** https://transaction-risk-api.onrender.com  
**Status:** ✅ Deployed & Running

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




## What It Does

Evaluates financial transactions across 5 risk categories:
- Amount risk (transaction size)
- Customer risk (new vs existing)
- Payment method risk (bank/card/crypto)
- Merchant risk (industry category)
- Geographic risk (country-based)

Returns risk score (0-1), decision (APPROVE/REVIEW/REJECT), and detailed breakdown with explanations.

## Tech Stack

- Node.js + Express
- Joi (validation)
- Winston (logging)
- In-memory storage (swappable to PostgreSQL)
- Clean architecture: routes/models/storage/business logic separated

## API Endpoints

### Score Transaction
```bash
POST /api/transactions/score

{
  "userID": "user_123",
  "amount": 15000,
  "newCustomer": true,
  "paymentMethod": "credit_card",
  "merchantCategory": "retail",
  "country": "US"
}
```

**Response:**
```json
{
  "transactionID": "txn_1738543267_a8k2m9x",
  "riskScore": 0.5,
  "decision": "REVIEW",
  "breakdown": {
    "amountRisk": 0.25,
    "customerRisk": 0.15,
    "methodRisk": 0.1,
    "merchantRisk": 0.1,
    "geoRisk": 0.05
  },
  "reasons": ["High transaction amount", "New customer"]
}
```

### Get Transaction by ID
```bash
GET /api/transactions/:id
```

### Get User's Transactions
```bash
GET /api/transactions/user/:userID
```

### Health Check
```bash
GET /health
```

## Run Locally
```bash
git clone https://github.com/samirasharma/transaction-risk-api.git
cd transaction-risk-api
npm install
npm start
```

Test: `curl http://localhost:3000/health`

## Architecture
```
src/
├── routes/          # API endpoints
├── models/          # Data structures
├── storage/         # In-memory persistence
├── riskEngine.js    # Risk calculation logic
├── validation.js    # Joi schemas
└── constants.js     # Risk thresholds
```

**Design:** Separation of concerns, easy to test, database-agnostic storage layer.

## Risk Scoring

- **Decisions:** APPROVE (<0.45), REVIEW (0.45-0.79), REJECT (≥0.8)
- **Weights:** Amount (0.4), Customer (0.15), Method (0.15), Merchant (0.3), Geo (0.25)
- **High-risk:** Gambling/crypto merchants, NG/RU/CN countries, crypto payments