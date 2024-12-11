import React from "react";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className={`mb-6 flex justify-center`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="p-2 border rounded-lg w-2/3"
      />
    </div>
  );
};

export default SearchBar;
