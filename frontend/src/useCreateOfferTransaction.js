import {
  erc20ABI,
  serialize,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import LoanABI from "./abi/LoanContractABI.json";
const useCreateOfferTransaction = ({ amount }) => {
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: "0xf5bcb88eef2ede0d09d8329c3c94ebd2758356e2",
    abi: erc20ABI,
    functionName: "approve",
    args: [address?.toString(), serialize(amount * Math.pow(10, 18))],
    enabled: Boolean(amount),
  });
  console.log(LoanABI);
  const { config: createLendOffer } = usePrepareContractWrite({
    address: "0xDAA0fDD4b4797Ceb97A6D58dd86b4f0F003CFCA2",
    abi: LoanABI,
    functionName: "createLendOffer",
    args: [serialize(10 * 1e18), serialize(10), serialize(20)],
  });

  console.log(createLendOffer);
  const { write: approveFunc, data } = useContractWrite(config);
  const { write } = useContractWrite(createLendOffer);

  const createOffer = async () => {
    try {
      const tx = await approveFunc();
      await write();
      write();
      // const { approveFunctionConfig } = await prepareWriteContract({
      //   address: "0xf5bcb88eef2ede0d09d8329c3c94ebd2758356e2",
      //   abi: erc20ABI,
      //   functionName: "approve",
      //   args: [address?.toString(), serialize(amount * Math.pow(10, 18))],
      // });
      // await writeContract(approveFunctionConfig);
      // const { request } = await prepareWriteContract({
      // address: "0xdaa0fdd4b4797ceb97a6d58dd86b4f0f003cfca2",
      // abi: LoanABI,
      // functionName: "createLendOffer",
      // args: [serialize(10 * 1e18), serialize(10), serialize(20)],
      // });
      // await writeContract(request);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    createOffer,
  };
};

export default useCreateOfferTransaction;
