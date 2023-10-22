import React, { useState } from "react";
import useCreateOfferTransaction from "./hooks/useCreateOfferTransaction";

const Table = ({ setIsVerified }) => {
  const [inputValues, setInputValues] = useState({
    amount: "",
    interest: "",
    duration: "",
  });
  const { createOffer } = useCreateOfferTransaction({
    amount: inputValues.amount,
    interest: inputValues.interest,
    duration: inputValues.duration,
  });
  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="">
            <th className="py-2 px-4 border-b text-center"></th>
            <th className="py-2 px-4 border-b text-center">Amount</th>
            <th className="py-2 px-4 border-b text-center">Interest</th>
            <th className="py-2 px-4 border-b text-center">Duration</th>
            <th className="py-2 px-4 border-b text-center">Verify</th>
            <th className="py-2 px-4 border-b text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-4 px-4 border-b text-center">1</td>
            <td className="py-4 px-4 border-b text-center">
              <input
                className="bg-transparent text-white border border-white px-2 py-2 focus:outline-none"
                placeholder="Enter amount"
                type="number"
                value={inputValues.amount}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    amount: e.target.value,
                  })
                }
              />
            </td>
            <td className="py-4 px-4 border-b text-center">
              <input
                className="bg-transparent text-white border border-white px-2 py-2 focus:outline-none"
                placeholder="Enter interest"
                type="number"
                value={inputValues.interest}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    interest: e.target.value,
                  })
                }
              />
            </td>
            <td className="py-4 px-4 border-b text-center">
              <input
                className="bg-transparent text-white border border-white px-2 py-2 focus:outline-none"
                placeholder="Enter duration"
                type="number"
                value={inputValues.duration}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    duration: e.target.value,
                  })
                }
              />
            </td>
            {/* <td className="py-4 px-4 border-b text-center">
              <input
                type="checkbox"
                onChange={() => {
                  // Handle logic for the second checkbox in each row
                }}
                checked={true}
              />
            </td> */}
            {/* <td className="py-4 px-4 border-b text-center">
              <input
                type="checkbox"
                onChange={() => {
                  // Handle logic for the second checkbox in each row
                }}
                checked={true}
              />
            </td> */}
            {/* <td className="py-4 px-4 border-b text-center">
              <input
                type="checkbox"
                onChange={() => {
                  // Handle logic for the third checkbox in each row
                }}
                checked={true}
              />
            </td> */}
            <td
              className="py-4 px-4 border-b text-center min-w-[200px]"
              onClick={() => {
                createOffer && createOffer();
              }}
            >
              <a
                href="#_"
                className="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block"
              >
                <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
                <span className="relative group-hover:text-white">
                  Create Offer{" "}
                </span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
