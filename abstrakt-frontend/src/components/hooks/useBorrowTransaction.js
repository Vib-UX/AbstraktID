import { Contract } from "ethers";
import { erc721ABI, useWalletClient } from "wagmi";
import LoanABI from "../abi/LoanContractABI.json";

const useBorrowTransaction = () => {
  const { data: signer } = useWalletClient();

  const borrow = async (_offerId, _tokenId) => {
    debugger;
    try {
      const token = new Contract(
        "0x99Ddec1F2d94C1b453E18F057190493c16d43484",
        erc721ABI,
        signer
      );
      await token.approve(
        "0xDAA0fDD4b4797Ceb97A6D58dd86b4f0F003CFCA2",
        _tokenId
      );
      const loanContract = new Contract(
        "0xDAA0fDD4b4797Ceb97A6D58dd86b4f0F003CFCA2",
        LoanABI,
        signer
      );
      await loanContract.borrow(_offerId.toString(), _tokenId);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    borrow,
  };
};

export default useBorrowTransaction;
