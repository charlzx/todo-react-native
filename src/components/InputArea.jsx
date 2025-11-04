import React, { useEffect, useRef, useState } from "react";
import Circle from "../images/circle.svg";

function InputArea({ handleSubmit, searchQuery, setSearchQuery, showSearch, setShowSearch }) {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const searchInputRef = useRef(null);

  const trimmedInput = input.trim();
  const showSearchIcon = !showDetails && trimmedInput.length === 0;

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const resetFormFields = () => {
    setInput("");
    setDescription("");
    setDueDate("");
    setShowDetails(false);
  };

  const collapseSearch = () => {
    if (showSearch) {
      setShowSearch(false);
    }
    if (searchQuery) {
      setSearchQuery("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e, input, description, dueDate);
    resetFormFields();
  };

  const handleSearchToggle = () => {
    if (showSearch) {
      setShowSearch(false);
      setSearchQuery("");
    } else {
      setShowSearch(true);
    }
  };

  return (
    <div className="w-full my-6 sm:my-12 space-y-4">
      <div
        className={`relative flex w-full px-6 text-lg leading-tight text-gray-700 align-middle bg-white shadow appearance-none dark:bg-input-dark focus:outline-none focus:shadow-outline ${
          showDetails ? "rounded-t" : "rounded"
        } ${showDetails ? "min-h-16" : "h-16"}`}
      >
        <div>
          <img src={Circle} alt="LogoCentang" className="mt-5 mr-6" />
        </div>

        <form className="flex-1" onSubmit={handleFormSubmit}>
          <input
            className={`w-full h-16 border-none input dark:bg-input-dark dark:text-gray-300 ${
              showSearchIcon ? "pr-12" : "pr-6"
            }`}
            type="text"
            value={input}
            onChange={(e) => {
              const value = e.target.value;
              setInput(value);
              if (value.trim().length > 0) {
                collapseSearch();
              }
            }}
            placeholder="Create a new todo..."
            onFocus={() => {
              setShowDetails(true);
              collapseSearch();
            }}
          />
        </form>

        {showSearchIcon && (
          <button
            type="button"
            onClick={handleSearchToggle}
            className={`absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors ${
              showSearch ? "text-blue-500" : ""
            }`}
            aria-label="Toggle search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        )}
      </div>

      {showSearch && (
        <div className="relative w-full animate-slideDown">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search todos..."
            className="w-full h-12 px-6 pr-10 text-base leading-tight text-gray-700 bg-white rounded shadow appearance-none dark:bg-input-dark dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {showDetails && (
        <div className="w-full px-6 py-4 bg-white rounded-b shadow dark:bg-input-dark space-y-3">
          <textarea
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-input-dark dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add description (optional)..."
          />
          <div className="flex items-center gap-3">
            <input
              type="date"
              className="w-32 sm:w-36 px-3 py-2 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-input-dark dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                resetFormFields();
                collapseSearch();
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleFormSubmit}
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputArea;
