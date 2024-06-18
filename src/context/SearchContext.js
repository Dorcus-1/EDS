import React, { useState, useEffect, createContext, useContext } from 'react';

// Create a context with default values for query and setQuery
const GlobalContext = createContext({
  query: "",
  setQuery: () => {}
});

// Provider component to wrap around the part of the app that needs access to the search context
export const SearchContextProvider = ({ children }) => {
  const [query, setQuery] = useState(""); // State to hold the search query

  return (
    <GlobalContext.Provider
      value={{
        query,
        setQuery
      }}
    >
      {children} {/* Render the children components within the provider */}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the search context
export const useSearchContext = () => useContext(GlobalContext); // Return the context value
