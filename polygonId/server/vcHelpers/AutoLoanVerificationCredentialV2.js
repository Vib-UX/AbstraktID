module.exports = {
  // VC type: AutoLoanVerificationCredential
  // https://raw.githubusercontent.com/Vib-UX/AbstraktID/main/polygonId/schemas/jsonld/auto-loan-credential-v1.jsonld
  AutoLoanVerificationCredentialV2: (credentialSubject) => ({
    id: 1,
    circuitId: "credentialAtomicQuerySigV2",
    query: {
      allowedIssuers: ["*"],
      type: "AutoLoanVerificationCredentialV2",
      context:
        "https://raw.githubusercontent.com/Vib-UX/AbstraktID/main/polygonId/schemas/jsonld/auto-loan-credential-v2.jsonld",
      credentialSubject,
    },
  }),
  // See more off-chain examples
  // https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/#equals-operator-1
};
