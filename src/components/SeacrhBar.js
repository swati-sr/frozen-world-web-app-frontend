import { IoIosSearch } from "@/utils/icon";

const SearchBar = ({ placeholderText }) => {
    return (
        <form>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder={placeholderText}
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
