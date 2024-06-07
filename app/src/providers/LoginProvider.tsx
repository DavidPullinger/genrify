import { createContext, useContext } from 'react';

export const LoginContext = createContext<{
    loggedIn: boolean | null;
    setLoggedIn: (loggedIn: boolean | null) => void;
}>({
    loggedIn: false,
    setLoggedIn: () => {},
});

export const useLogin = () => {
    const { loggedIn, setLoggedIn } = useContext(LoginContext);
    return { loggedIn, setLoggedIn };
};
