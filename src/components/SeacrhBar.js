import { IoIosSearch } from "@/utils/icon";
import React, { useState } from "react";

const SearchBar = ({ placeholderText, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery); 
        setSearchQuery(""); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder={placeholderText}
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="border py-2 px-16 rounded-l-3xl text-darkText"
                />
                <button
                    type="submit"
                    className="bg-darkText hover:bg-black rounded-r-3xl px-4 py-2"
                    aria-label="Search"
                >
                    <IoIosSearch className="text-white" size={25} />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
