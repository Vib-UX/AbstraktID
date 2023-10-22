const {
  AutoLoanVerificationCredentialV2,
} = require("../vcHelpers/AutoLoanVerificationCredentialV2")

// design your own customised authentication requirement here using Query Language
// https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/

const incomeReason = "Tesla Model 3 min income>=50k USD";

const credentialSubject = {
  income: {
    $gt: 50000,
  },
};

const incomeRequest = AutoLoanVerificationCredentialV2(credentialSubject);

module.exports = {
  incomeReason,
  incomeRequest,
};
