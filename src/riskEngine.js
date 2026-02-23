const constants = require('./constants');
class RiskEngine{
    evaluate(transaction){
        const amountRisk = this.calculateAmountRisk(transaction.amount);
        const customerRisk = this.calculateCustomerRisk(transaction.newCustomer);
        const methodRisk = this.calculateMethodRisk(transaction.paymentMethod);
        const merchantRisk = this.calculateMerchantRisk(transaction.merchantCategory);
        const geoRisk = this.calculateGeoRisk(transaction.country);

        const totalScore = amountRisk + customerRisk + methodRisk + merchantRisk + geoRisk;
        const decision = this.getDecision(totalScore);
        const reasons = this.generateReasons(transaction, { 
            amountRisk, 
            customerRisk, 
            methodRisk, 
            merchantRisk, 
            geoRisk 
    });
        return {
            riskScore: parseFloat(totalScore.toFixed(2)),
            decision,
            breakdown:{
                amountRisk: parseFloat(amountRisk.toFixed(2)),
                customerRisk: parseFloat(customerRisk.toFixed(2)),
                methodRisk:parseFloat(methodRisk.toFixed(2)),
                merchantRisk: parseFloat(merchantRisk.toFixed(2)),
                geoRisk: parseFloat(geoRisk.toFixed(2))
            },
            reasons
        };
}

calculateAmountRisk(amount){
    const { AMOUNT_THRESHOLDS, AMOUNT_RISK_SCORES } = constants;
    if (amount < AMOUNT_THRESHOLDS[0]) return AMOUNT_RISK_SCORES[0];
    if (amount < AMOUNT_THRESHOLDS[1]) return AMOUNT_RISK_SCORES[1];
    if (amount < AMOUNT_THRESHOLDS[2]) return AMOUNT_RISK_SCORES[2];
    if (amount < AMOUNT_THRESHOLDS[3]) return AMOUNT_RISK_SCORES[3];
    return AMOUNT_RISK_SCORES[4];
}

calculateCustomerRisk(isNewCustomer){
    return isNewCustomer ? constants.CUSTOMER_RISK.NEW : constants.CUSTOMER_RISK.EXISTING;
}

calculateMethodRisk(paymentMethod){
    
    return constants.PAYMENT_METHOD_RISK[paymentMethod] || 0.1;
}

calculateMerchantRisk(category) {
    const isHighRisk = constants.HIGH_RISK_MERCHANTS.includes(category);
    return isHighRisk ? constants.MERCHANT_RISK.HIGH : constants.MERCHANT_RISK.NORMAL;
  }
  
calculateGeoRisk(country) {
    const isHighRisk = constants.HIGH_RISK_COUNTRIES.includes(country);
    return isHighRisk ? constants.GEO_RISK.HIGH : constants.GEO_RISK.NORMAL;
  }

getDecision(totalScore) {
    if (totalScore >= constants.DECISION_THRESHOLDS.REVIEW) return "REVIEW";
    if (totalScore >= constants.DECISION_THRESHOLDS.REJECT) return "REJECT";
    return "APPROVE";
}
generateReasons(transaction, risks) {
    const reasons =[];
    if (risks.amountRisk >=0.25) reasons.push("High transaction amount");
    if (risks.customerRisk >0) reasons.push("New customer");
    if (risks.methodRisk >=0.1) reasons.push(`${transaction.paymentMethod} payment method`);
    if (risks.merchantRisk >= 0.3) reasons.push(`High-risk merchant category: ${transaction.merchantCategory}`);
    if (risks.geoRisk >= 0.25) reasons.push(`High-risk country: ${transaction.country}`);
    return reasons;

}
}
module.exports = new RiskEngine();