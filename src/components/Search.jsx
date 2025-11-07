import { useState } from "react";

function Search({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full p-4 rounded-xl bg-[#1A1D23] border border-[#2B2F36]
                 shadow-md transition-all duration-300 
                 hover:border-blue-500 hover:shadow-[0_0_12px_rgba(59,130,246,0.5)]"
    >

      {/* ✅ Left – Input */}
      <input
        type="text"
        placeholder="Enter IP address"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-5 py-3 bg-[#0F1115] text-white text-lg
                   placeholder:text-gray-500 border border-[#2B2F36]
                   rounded-l-xl rounded-r-none outline-none
                   focus:border-blue-500 focus:shadow-[0_0_8px_rgba(59,130,246,0.5)]
                   transition-all duration-200"
      />

      {/* ✅ Right – Blue Button */}
      <button
        type="submit"
        className="px-6 py-3 bg-blue-500 text-white font-bold text-lg
                   rounded-r-xl rounded-l-none
                   hover:bg-blue-400 active:bg-blue-600
                   transition-all duration-150"
      >
        Search IP Address
      </button>
    </form>
  );
}

export default Search;
