import { readContract } from "@wagmi/core";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { useNetwork, useWalletClient } from "wagmi";
import LoanABI from "../abi/LoanContractABI.json";
import { tokenAddress } from "./useBorrowTransaction";

const useGetLendOffers = () => {
  const [lendOffers, setLendOffers] = useState([]);
  const { data: signer } = useWalletClient();
  const { chain } = useNetwork();
  const fetchLendOffers = async () => {
    const offerId = await readContract({
      address: tokenAddress[chain.id][2],
      abi: LoanABI,
      functionName: "nextOfferId",
    });
    const convertedOfferId = new BigNumber(offerId);
    let txs = [];
    if (convertedOfferId) {
      for (let index = 0; index < parseInt(convertedOfferId); index++) {
        txs.push(
          readContract({
            address: tokenAddress[chain.id][2],
            abi: LoanABI,
            functionName: "lendOffers",
            args: [index + 1],
          })
        );
      }
    }
    const result = await Promise.all(txs);
    setLendOffers(result);
  };
  useEffect(() => {
    fetchLendOffers();
  }, [signer]);
  return {
    lendOffers,
  };
};

export default useGetLendOffers;
