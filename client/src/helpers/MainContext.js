import { createContext, useContext } from "react";
import { useState } from "react";

const MainContext = createContext("");

export default function MainProvider({ children }) {
  const [page, changePage] = useState({
    currentPage: 1,
    totalPages: [],
  });
  const [search, getSearch] = useState();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    authorization: "",
    status: false,
  });
  return (
    <MainContext.Provider
      value={{
        pages: { page, changePage },
        authentication: { authState, setAuthState },
        searchInput: { search, getSearch },
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(MainContext);
  const { authState, setAuthState } = context.authentication;
  return { authState, setAuthState };
};

export const usePageChange = () => {
  const context = useContext(MainContext);
  const { page, changePage } = context.pages;
  return { page, changePage };
};

export const useSearch = () => {
  const context = useContext(MainContext);
  const { search, getSearch } = context.searchInput;
  return { search, getSearch };
};
