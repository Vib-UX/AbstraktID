const {
  AutoLoanVerificationCredentialV2,
} = require("../vcHelpers/AutoLoanVerificationCredentialV2.js");

// design your own customised authentication requirement here using Query Language
// https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/

const creditScoreReason = "Credit Score Verification";

const credentialSubject = {
  creditScore: {
    $gt: 350,
  },
};

const creditScoreRequest = AutoLoanVerificationCredentialV2(credentialSubject);

module.exports = {
  creditScoreReason,
  creditScoreRequest,
};
