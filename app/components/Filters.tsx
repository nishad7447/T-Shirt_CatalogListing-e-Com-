import { RefreshCcw } from "lucide-react";
import React, { useState, useEffect } from "react";

type FiltersProps = {
  onFilter: (filters: {
    gender?: string;
    color?: string;
    priceRange?: [number, number];
    type?: string;
  }) => void;
};

export default function Component({ onFilter }: FiltersProps) {
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [type, setType] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    onFilter({ gender, color, priceRange, type });
  }, [gender, color, priceRange, type]);

  const resetFilters = () => {
    setGender("");
    setColor("");
    setPriceRange([0, 1000]);
    setType("");
    onFilter({ gender: "", color: "", priceRange: [0, 1000], type: "" });
  };

  const colors = ["Red", "Blue", "Green", "Yellow", "Black", "White"];

  return (
    <div className="bg-black text-white border border-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out w-full max-w-md mx-auto md:max-w-full md:mt-16">
      <div className="bg-gray-900 p-3 sm:p-4 flex justify-between items-center cursor-pointer">
        <h2 className="text-lg sm:text-xl font-bold">Filters</h2>
        <div className="flex items-center">
          <RefreshCcw
            className="mr-2 w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
            onClick={resetFilters}
          />
          <svg
            className={`w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => setIsOpen(!isOpen)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <div className="flex flex-wrap gap-2">
              {["All", "Men", "Women"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g === "All" ? "" : g)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                    gender === (g === "All" ? "" : g)
                      ? "bg-white text-black"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  } transition-colors duration-200`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(color === c ? "" : c)}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 ${
                    c === "Black" ? "border-white" : ""
                  } ${
                    color === c ? "border-white" : "border-transparent"
                  } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black`}
                  style={{ backgroundColor: c.toLowerCase() }}
                  title={c}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Price Range
            </label>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm">₹{priceRange[0]}</span>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value);
                  setPriceRange([priceRange[0], newValue]);
                }}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs sm:text-sm">₹{priceRange[1]}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-xs sm:text-sm bg-gray-800 border-gray-700 focus:outline-none focus:ring-white focus:border-white rounded-md"
            >
              <option value="">All</option>
              <option value="Polo">Polo</option>
              <option value="Hoodie">Hoodie</option>
              <option value="Basic">Basic</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}