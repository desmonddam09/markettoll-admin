import React from "react";
import { CiSearch } from "react-icons/ci";

const CustomerFilter = ({setFilterData}) => {
  const [filter, setFilter] = useState("")
  const [InputVal, setInputVal] = useState("")

  const FilterUsers = (val) => {
    setFilterData(val)
  }

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6 ">
      <h2 className="text-stone-700 text-xl font-bold">Apply filters</h2>
      <p className="mt-1 text-sm">Use filters to further refine search</p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-2">
        <div className="flex flex-col">
          <label className="text-sm mb-2 block">Search</label>
          <div className="relative flex items-center">
            <input
              name="email"
              type="text"
              autoComplete="off"
              value={InputVal}
              onChange={(e) => {
                setInputVal(e.target.value)
                FilterUsers(e.target.value)
              }}
              className="w-full text-sm border border-gray-200 px-8 py-2 rounded-md shadow-sm outline-none focus:border-[#0085FF] focus:ring focus:ring-[#0098EA] focus:ring-opacity-50 text-sm"
              placeholder="Search Here"
            />
            <CiSearch className="w-[18px] h-[18px] absolute left-2" color="#0098EA" />
          </div>
        </div>
        <div className="mt-6 grid w-full grid-cols-2  space-x-4 md:flex">
          <button 
             onClick={()=>{
              setFilterData("");
              setInputVal("")     
            }}
          className="active:scale-95 rounded-md bg-gray-200 px-6 py-2 font-medium text-black outline-none focus:ring-gray-500 hover:opacity-90 text-sm">
            Reset
          </button>

        </div>
      </div>
    </div>
  );
};

export default CustomerFilter;
