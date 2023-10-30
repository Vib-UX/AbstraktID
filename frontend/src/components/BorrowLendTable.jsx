import { deserialize } from "wagmi";
import useGetLendOffers from "./hooks/useGetLendOffers";

const BorrowLendTable = ({ setIsOpen, setData, setIsVerified }) => {
  const { lendOffers } = useGetLendOffers();
  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="">
            <th className="py-2 px-4 border-b text-center">loanAmount</th>
            <th className="py-2 px-4 border-b text-center">Interest</th>
            <th className="py-2 px-4 border-b text-center">Duration</th>
            <th className="py-2 px-4 border-b text-center"></th>
          </tr>
        </thead>
        <tbody>
          {lendOffers
            .filter((d) => d[0] > 10000000)
            .map((t, index) => (
              <tr className="border-b" key={index}>
                <td className="py-4 px-4 border-b text-center">
                  {deserialize(t[0]) / 1e18}k USDC
                </td>
                <td className="py-4 px-4 border-b text-center">
                  {deserialize(t[1])}%
                </td>
                <td className="py-4 px-4 border-b text-center">
                  {deserialize(t[2])} days
                </td>
                <td className="py-4 px-4 border-b text-center">
                  <a
                    href="#_"
                    onClick={() => {
                      setIsVerified(true);
                      t.push(index);
                      setData(t);
                    }}
                    className="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block"
                  >
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white">
                      Borrow
                    </span>
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowLendTable;
