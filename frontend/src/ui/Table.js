import React, { useState } from "react";
import useCreateOfferTransaction from "../useCreateOfferTransaction";

const Table = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const { createOffer } = useCreateOfferTransaction({ amount: 10 });
  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="">
            <th className="py-2 px-4 border-b text-center">ID</th>
            <th className="py-2 px-4 border-b text-center">Name</th>
            <th className="py-2 px-4 border-b text-center">Age</th>
            <th className="py-2 px-4 border-b text-center">Email</th>
            <th className="py-2 px-4 border-b text-center">Select All</th>
            <th className="py-2 px-4 border-b text-center">Checkbox</th>
            <th className="py-2 px-4 border-b text-center">Checkbox</th>
            <th className="py-2 px-4 border-b text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-4 px-4 border-b text-center">1</td>
            <td className="py-4 px-4 border-b text-center">John Doe</td>
            <td className="py-4 px-4 border-b text-center">30</td>
            <td className="py-4 px-4 border-b text-center">john@example.com</td>
            <td className="py-4 px-4 border-b text-center">
              <input
                type="checkbox"
                onChange={() => {
                  // Handle logic for the second checkbox in each row
                }}
                checked={true}
              />
            </td>
            <td className="py-4 px-4 border-b text-center">
              <input
                type="checkbox"
                onChange={() => {
                  // Handle logic for the second checkbox in each row
                }}
                checked={true}
              />
            </td>
            <td className="py-4 px-4 border-b text-center">
              <input
                type="checkbox"
                onChange={() => {
                  // Handle logic for the third checkbox in each row
                }}
                checked={true}
              />
            </td>
            <td
              className="py-4 px-4 border-b text-center"
              onClick={() => {
                createOffer && createOffer();
              }}
            >
              <a
                href="#_"
                class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block"
              >
                <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
                <span class="relative group-hover:text-white">
                  Create offer
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
