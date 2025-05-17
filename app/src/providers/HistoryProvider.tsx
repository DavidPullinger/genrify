import { createContext, useContext } from 'react';

export const HistoryContext = createContext({
    loggedIn: false,
    setLoggedIn: () => { },
});

export const useHistory = () => {
    const { loggedIn, setLoggedIn } = useContext(HistoryContext);
    return { loggedIn, setLoggedIn };
};
