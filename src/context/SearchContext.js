import React, { useState, useEffect, createContext, useContext } from 'react';

const GlobalContext = createContext({
  query: "",
  setQuery: () => {}
});

export const SearchContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  return (
    <GlobalContext.Provider
      value={{
        query,
        setQuery
      }}
    >
        {children}
    </GlobalContext.Provider>
  );
};

export const useSearchContext = () => useContext(GlobalContext);