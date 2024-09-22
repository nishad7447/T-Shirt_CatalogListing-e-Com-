  import { Search } from "lucide-react";
  import { useState } from "react";

  type SearchBarProps = {
    onSearch: (searchTerm: string) => void;
  };

  export default function SearchBar({ onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(searchTerm);
    };

    return (
      <form onSubmit={handleSubmit} className="mr-3 my-1 w-3/4">
        <div className="relative">
          {/* Search icon, now acts as a submit button on mobile */}
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-300 ease-in-out"
          >
            <Search />
          </button>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e)
              }
            }}
            placeholder="Search for t-shirts..."
            className="pl-10 pr-4 py-2 w-full rounded-3xl text-white font-bold placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm bg-gray-800 bg-opacity-80 focus:bg-gray-700 transition-all duration-300 ease-in-out border border-gray-600 focus:outline-none"
          />

          {/* Submit button for larger screens */}
          <button
            type="submit"
            className="md:text-lg font-semibold hidden py-[7px] sm:block bg-slate-500 text-white hover:bg-slate-600 transition-transform hover:scale-105 duration-300 ease-in-out rounded-full p-2 absolute right-0 top-1/2 transform -translate-y-1/2"
          >
            Search
          </button>
        </div>
      </form>
    );
  }
