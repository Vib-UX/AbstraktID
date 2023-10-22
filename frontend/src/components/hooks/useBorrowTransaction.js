import { Contract } from "ethers";
import { erc721ABI, useNetwork, useWalletClient } from "wagmi";
import LoanABI from "../abi/LoanContractABI.json";

export const tokenAddress = {
  80001: {
    1: "0x99Ddec1F2d94C1b453E18F057190493c16d43484",
    2: "0xDAA0fDD4b4797Ceb97A6D58dd86b4f0F003CFCA2",
    3: "0xf5bcb88eef2ede0d09d8329c3c94ebd2758356e2",
  },
  534351: {
    1: "0x7378f4E7b172786F9DB1aaA4b55520fbaA7895D9",
    2: "0x8fB873e697a106e7Dd819547587AcAEf0840E835",
    3: "0x0AbE7d88C0af51935DC254104151ea859DA06A2f",
  },
};

const useBorrowTransaction = () => {
  const { data: signer } = useWalletClient();
  const { chain } = useNetwork();
  const borrow = async (_offerId, _tokenId) => {
    try {
      if (!chain) return;
      const token = new Contract(tokenAddress[chain.id][1], erc721ABI, signer);
      await token.approve(tokenAddress[chain.id][2], _tokenId);
      const loanContract = new Contract(
        tokenAddress[chain][2],
        LoanABI,
        signer
      );
      await loanContract.borrow(_offerId.toString(), _tokenId.toString());
    } catch (error) {
      console.log(error);
    }
  };
  return {
    borrow,
  };
};

export default useBorrowTransaction;
