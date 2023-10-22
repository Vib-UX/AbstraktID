import BigNumber from "bignumber.js";
import { Contract } from "ethers";

import { erc20ABI, useNetwork, useWalletClient } from "wagmi";
import LoanABI from "../abi/LoanContractABI.json";
import { tokenAddress } from "./useBorrowTransaction";

const useCreateOfferTransaction = ({ amount, interest, duration }) => {
  let x = new BigNumber(amount * 10 ** 18).toString();
  const { data: signer } = useWalletClient();
  const { chain } = useNetwork();
  const createOffer = async () => {
    try {
      const token = new Contract(tokenAddress[chain.id][3], erc20ABI, signer);
      await token.approve(tokenAddress[chain.id][2], x.toString());
      const loanContract = new Contract(
        tokenAddress[chain.id][2],
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
