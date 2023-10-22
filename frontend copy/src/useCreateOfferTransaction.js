import BigNumber from "bignumber.js";
import { Contract } from "ethers";

import { erc20ABI, useWalletClient } from "wagmi";
import LoanABI from "./abi/LoanContractABI.json";

const useCreateOfferTransaction = ({ amount, interest, duration }) => {
  let x = new BigNumber("100000000000000000000");
  const { data: signer } = useWalletClient();

  const createOffer = async () => {
    try {
      const token = new Contract(
        "0xf5bcb88eef2ede0d09d8329c3c94ebd2758356e2",
        erc20ABI,
        signer
      );
      await token.approve(
        "0xDAA0fDD4b4797Ceb97A6D58dd86b4f0F003CFCA2",
        x.toString()
      );
      const loanContract = new Contract(
        "0xDAA0fDD4b4797Ceb97A6D58dd86b4f0F003CFCA2",
        LoanABI,
        signer
      );
      await loanContract.createLendOffer(x.toString(), interest, duration);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    createOffer,
  };
};

export default useCreateOfferTransaction;
