import BigNumber from "bignumber.js";
import { useAccount, useContractRead } from "wagmi";
import LoanNFTABI from "../abi/LoanNFTABI.json";
const useNftDetails = () => {
  const { address } = useAccount();
  const { data } = useContractRead({
    address: "0x99Ddec1F2d94C1b453E18F057190493c16d43484",
    abi: LoanNFTABI,
    functionName: "balanceOf",
    args: [address],
  });
  const { data: tokenUri } = useContractRead({
    address: "0x99Ddec1F2d94C1b453E18F057190493c16d43484",
    abi: LoanNFTABI,
    functionName: "tokenURI",
    args: [new BigNumber(data).toString()],
    enabled: !!data,
  });
  return {
    tokenId: new BigNumber(data).toString(),
    tokenUri,
  };
};

export default useNftDetails;
