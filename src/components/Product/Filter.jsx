import React, {
  useContext,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { CiSearch } from "react-icons/ci";
import { AuthContext } from "../../context/AuthContext";

export function ProductFilter({ setFilterData }) {
  const [filter, setFilter] = useState("");
  const [InputVal, setInputVal] = useState("");

  const FilterUsers = (val) => {
    setFilterData(val);
  };

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
                setInputVal(e.target.value);
                FilterUsers(e.target.value);
              }}
              className="w-full text-sm border border-gray-200 px-8 py-2 rounded-md shadow-sm outline-none focus:border-[#0085FF] focus:ring focus:ring-[#0098EA] focus:ring-opacity-50 text-sm"
              placeholder="Search Here..."
            />
            <CiSearch
              className="w-[18px] h-[18px] absolute left-2"
              color="#0098EA"
            />
          </div>
        </div>
        <div className="mt-6 grid w-full grid-cols-2  space-x-4 md:flex">
          <button
            onClick={() => {
              setFilterData("");
              setInputVal("");
            }}
            className="active:scale-95 rounded-md bg-gray-200 px-6 py-2 font-medium text-black outline-none focus:ring-gray-500 hover:opacity-90 text-sm"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export function FilterProductCategory({
  displayValue,
  setDisplayValue,
  setSubCategFill,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { Categories } = useContext(AuthContext);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent   px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {displayValue || "Category"}
          <svg
            className="-mr-1 size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 description-scroll   origin-top-right h-[250px] overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <a
              onClick={() => {
                setIsOpen(!isOpen);
                setSubCategFill("Sub Category");
                setDisplayValue("");
              }}
              className="block px-4 cursor-pointer py-2 text-sm text-gray-700"
              role="menuitem"
              id="menu-item-0"
            >
              All
            </a>
            {Categories.map((item, i) => (
              <a
                onClick={() => {
                  setIsOpen(!isOpen);
                  setSubCategFill("Sub Category");
                  setDisplayValue(item.name);
                }}
                key={i}
                className="block px-4 cursor-pointer py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function FilterProductSubCategory({
  displayValue,
  setSubCategFill,
  SubCategFill,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { Categories } = useContext(AuthContext);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() =>
            displayValue != "Category" &&
            displayValue != "" &&
            setIsOpen(!isOpen)
          }
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent   px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {SubCategFill || "Sub Category"}
          <svg
            className="-mr-1 size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 description-scroll   origin-top-right h-[250px] overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {Categories.filter((item) => item.name === displayValue).map(
              (item, i) => (
                <div key={i}>
                  {/* <a
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    className="block px-4 cursor-pointer py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                  >
                    {SubCategFill}
                  </a> */}
                  {item.subCategories && item.subCategories.length > 0 && (
                    <div className="subcategories">
                      <a
                        onClick={() => {
                          setSubCategFill("");
                          setIsOpen(!isOpen);
                        }}
                        className="block px-4 cursor-pointer py-2 text-sm text-gray-600"
                        role="menuitem"
                      >
                        All
                      </a>
                      {item.subCategories.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          onClick={() => {
                            setSubCategFill(subItem.name);
                            setIsOpen(!isOpen);
                          }}
                          className="block px-4 cursor-pointer py-2 text-sm text-gray-600"
                          role="menuitem"
                          tabIndex={-1}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function FilterProductStatus({ SetActive }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent   px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Status
          <svg
            className="-mr-1 size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 description-scroll   origin-top-right  overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <div>
              <div className="subcategories">
                <a
                  onClick={() => {
                    SetActive("products");
                    setIsOpen(!isOpen);
                  }}
                  className="block px-4 cursor-pointer py-2 text-sm text-gray-600"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Active
                </a>
                <a
                  onClick={() => {
                    SetActive("deactivated-products");
                    setIsOpen(!isOpen);
                  }}
                  className="block px-4 cursor-pointer py-2 text-sm text-gray-600"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Deactivated Products
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const MultiRangeSlider = ({
  min,
  max,
  setDataToDisplay,
  dataToDisplay,
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    const filteredProducts = dataToDisplay.filter(
      (product) => product.price >= minVal && product.price <= maxVal
    );

    setDataToDisplay(filteredProducts);
  }, [minVal, maxVal, setDataToDisplay]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent   px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Price
          <svg
            className="-mr-1 size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 description-scroll origin-top-right h-[150px]  overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <div className="subcategories px-3 py-3">
              <label htmlFor="">Price Range</label>
              <div className="container mt-3">
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={minVal}
                  onChange={(event) => {
                    const value = Math.min(
                      Number(event.target.value),
                      maxVal - 1
                    );
                    setMinVal(value);
                    minValRef.current = value;
                  }}
                  className="thumb thumb--left"
                  style={{ zIndex: minVal > max - 100 && "5" }}
                />
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={maxVal}
                  onChange={(event) => {
                    const value = Math.max(
                      Number(event.target.value),
                      minVal + 1
                    );
                    setMaxVal(value);
                    maxValRef.current = value;
                  }}
                  className="thumb thumb--right"
                />

                <div className="slider">
                  <div className="slider__track" />
                  <div ref={range} className="slider__range" />
                  <div className="slider__left-value">{minVal}</div>
                  <div className="slider__right-value">{maxVal}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
