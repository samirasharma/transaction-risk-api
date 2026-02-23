module.exports = {
    AMOUNT_THRESHOLDS: [100, 1000, 5000, 10000],
    AMOUNT_RISK_SCORES: [0, 0.05, 0.15, 0.25, 0.4],
    
    PAYMENT_METHOD_RISK: {
      'bank_transfer': 0.05,
      'debit_card': 0.08,
      'credit_card': 0.1,
      'crypto': 0.15
    },
    
    HIGH_RISK_COUNTRIES: ['NG', 'RU', 'CN'],
    HIGH_RISK_MERCHANTS: ['gambling', 'crypto', 'adult'],
    
    CUSTOMER_RISK: {
      NEW: 0.15,
      EXISTING: 0
    },
    
    MERCHANT_RISK: {
      HIGH: 0.3,
      NORMAL: 0.1
    },
    
    GEO_RISK: {
      HIGH: 0.25,
      NORMAL: 0.05
    },
    
    DECISION_THRESHOLDS: {
      REVIEW: 0.45,
      REJECT: 0.8
    }
};